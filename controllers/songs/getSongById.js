const { RequestError } = require("../../helpers");
const lists = require("../../public/lists.json");

const getById = async (req, res) => {
    const {id} = req.params;
    const data = lists.find(item => item.id === id);
    if(!data) throw RequestError(404, "Not found");
    res.json(data)
};

module.exports = getById;