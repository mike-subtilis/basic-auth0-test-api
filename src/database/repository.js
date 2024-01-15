const cosmos = require('@azure/cosmos');
const baseCosmosContainerRepo = require('./base-cosmos-container-repo.js');

module.exports.create = (dbConfig) => {
    const cosmosClient = new cosmos.CosmosClient(dbConfig.cosmos);
    const cosmosDb = cosmosClient.database(dbConfig.cosmos.dbId);

    return { people: baseCosmosContainerRepo.create(cosmosDb, 'Items') };
};
