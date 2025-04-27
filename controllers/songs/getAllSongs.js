
const getAll = async (req, res) => {
  const newData = {message: "api/songs"}
    console.log("api/songs")

    res.json(newData);
}

module.exports = getAll;