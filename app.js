const express = require("express");
const logger = require("morgan");
const app = express();
const cors = require("cors");

const songsRouter = require("./routes/api/songs");
const listsRouter = require("./routes/api/lists");


const formatsLogger = app.get('env') === "development" ? "dev" : " short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.use("/api/songs", songsRouter);
app.use("/api/lists", listsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found.' })
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    res.status(status).json({ message })
});


module.exports = app