module.exports.create = (db, containerId) => {
    async function getPage(pageNumber, pageSize) {
        const { resources: results } = await db
            .container(containerId)
            .items
            .query({
                query: `SELECT * FROM root r
                    OFFSET ${(pageNumber - 1) * pageSize} LIMIT ${pageSize}`,
            })
            .fetchAll();
        return results;
    }

    async function get(id) {
        const { resources: result } = await db
            .container(containerId)
            .item(id)
            .read();
        return result;
    }

    async function create(fields) {
        const { item } = await db
            .container(containerId)
            .items
            .upsert(fields);            
        return item;
    }

    async function update(id, nonce, fields) {
        const { item } = await db
            .container(containerId)
            .item(id)
            .replace(fields);
        return item;
    }

    async function deleteEntity(id, nonce) {
        await db
            .container(containerId)
            .item(id)
            .delete();

            db.container(containerId)
            .item(id).update()
    }

    return {
        getPage,
        get,
        create,
        update,
        delete: deleteEntity,
    };
};
