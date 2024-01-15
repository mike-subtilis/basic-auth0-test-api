module.exports = {
    authentication: {
        auth0: {
            domain: process.env.AUTH0_DOMAIN,
            clientId: process.env.AUTH0_CLIENTID,
            audience: process.env.AUTH0_AUDIENCE,
        },
        appOrigin: process.env.APP_ORIGIN || `http://localhost:3000`,    
    },
    database: {
        cosmos: {
            endpoint: process.env.COSMOS_ENDPOINT || 'https://subtilis-cosmos-db-account.documents.azure.com:443/',
            key: process.env.COSMOS_KEY || 'ZmgSmX8FMZeIsfHuNDPV4mebcTpu7yv1XBw8W9Qfr9DCofja3eFavsr1umc9Vcph1lsjtd2YIzyEACDbeZ0oLQ==',
            userAgentSuffix: process.env.COSMOS_USER_AGENT_SUFFIX || 'CosmosDBJavascriptQuickstart',
            dbId: process.env.COSMOS_DB_ID || 'ToDoList',
        },
    },
};
