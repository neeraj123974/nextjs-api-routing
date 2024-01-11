const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

module.exports = (phase) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
        return{
            env: {
                mongodb_username: 'neeraj-sisodiya_94',
                mongodb_password: 'Neeraj1611',
                mongodb_cluster: 'cluster0',
                mongodb_database: 'events-dev'
            }
        }
    }
    //for production
    return{
        env: {
            mongodb_username: 'neeraj-sisodiya_94',
            mongodb_password: 'Neeraj1611',
            mongodb_cluster: 'cluster0',
            mongodb_database: 'events'
        }
    }
}
