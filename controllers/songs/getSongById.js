
const getById = async (req, res) => {
    console.log("api/songs/id")
    const data = {message: "api/songs/id"}
    res.json(data)
};

module.exports = getById;