import { connectDatabase, insertDocument, getAllDocument } from "../../../helpers/db-util";

async function handler(req, res){
    const eventId = req.query.eventId;
    let client;
    try{
        client = await connectDatabase();
    }catch(error){
        res.status(500).json({message: 'connecting with database failed'});
        return;
    }

    if(req.method === 'POST'){
        const {email, name, text} = req.body;
        if(
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim === ''
         ){
            res.status(422).json({message: 'Invalid input'})
            client.close();
            return;
         }
         const newComment = {
             name, 
             text,
             email,
             eventId
          }
          try{
              const result = await insertDocument(client , 'comments', newComment)
              client.close();
              res.status(201).json({message: 'Added comment', comment: newComment})
          }catch(error){
            res.status(500).json({message: 'Failed to insert comment'});
            return;
          }
    }
    if(req.method === 'GET'){
        try{
            const documents =  await getAllDocument(client, 'comments', {_id: -1}, {eventId:eventId})
            client.close();
            res.status(200).json({comments: documents})
        }catch(error){
            res.status(500).json({message: 'Failed to get comment'});
            return;
        }
    }
}

export default handler;