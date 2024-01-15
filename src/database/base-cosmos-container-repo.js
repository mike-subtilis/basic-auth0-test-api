module.exports.create = (db, containerId) => {
    async function getPage(pageNumber, pageSize) {
        const { resources: results } = await db
            .container(containerId)
            .items
            .query({
                query: 'SELECT * FROM root r',
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

    return {
        getPage,
        get,
    };
};
