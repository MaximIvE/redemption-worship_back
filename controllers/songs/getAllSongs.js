const lists = require("../../public/lists.json");

const getAll = async (req, res) => {
    res.json(lists) ;
}

module.exports = getAll;