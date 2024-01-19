const cosmos = require('@azure/cosmos');
const baseCosmosContainerRepo = require('./base-cosmos-container-repo');

module.exports.create = async (dbConfig) => {
  const cosmosClient = new cosmos.CosmosClient(dbConfig.cosmos);
  const cosmosDb = cosmosClient.database(dbConfig.cosmos.dbId);

  await cosmosDb
    .containers
    .createIfNotExists({ id: 'Items', partitionKey: { kind: 'Hash', paths: ['/partitionKey'] } });

  return { people: baseCosmosContainerRepo.create(cosmosDb.container('Items'), 'partitionKey') };
};
