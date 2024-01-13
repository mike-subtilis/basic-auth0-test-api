const cosmos = require('@azure/cosmos');

module.exports.create = () => {
    const dbConnectionConfig = {
        endpoint: 'https://subtilis-cosmos-db-account.documents.azure.com:443/',
        key: 'ZmgSmX8FMZeIsfHuNDPV4mebcTpu7yv1XBw8W9Qfr9DCofja3eFavsr1umc9Vcph1lsjtd2YIzyEACDbeZ0oLQ==',
        userAgentSuffix: 'CosmosDBJavascriptQuickstart',
    };

    const dbConfig = {
        dbId: 'ToDoList',
        containerId: 'Items',
    };

    const client = new cosmos.CosmosClient(dbConnectionConfig);

    async function getPage(pageNumber, pageSize) {
        const { resources: results } = await client.database(dbConfig.dbId)
            .container(dbConfig.containerId)
            .items
            .query({
                query: 'SELECT * FROM root r',
            })
            .fetchAll();
        return results;
    }

    async function get(id) {
        const { resources: result } = await client.database(dbConfig.dbId)
            .container(dbConfig.containerId)
            .item(id)
            .read();
        return result;
    }

    return {
        getPage,
        get,
    };
};
