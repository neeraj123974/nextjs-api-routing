import {createContext, useState, useEffect} from 'react';

const   NotificationContext   = createContext({
    notification: null, //{title, status, message}
    showNotification: function(notificationData){},
    hideNotification: function(){}
})

export function NotificationContextProvider(props){
    const [activeNotification, setActiveNotification] = useState();

    function showNotificationHandler(notificationData){
        setActiveNotification(notificationData);
    }

    function hideNotificationHanlder(){
        setActiveNotification(null);
    }

    useEffect(()=>{
        if( activeNotification && 
            (activeNotification.status === 'success' ||  
            activeNotification.status === 'error'))
        {
            const timer = setTimeout(()=>{
                setActiveNotification(null)
            },3000)

            return()=>{
                clearTimeout(timer);
            }
            
        }
    },[activeNotification])

    const context = {notification: activeNotification, showNotification: showNotificationHandler, hideNotification: hideNotificationHanlder}

    return(
        <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>
    )
} 
export default NotificationContext;                                 