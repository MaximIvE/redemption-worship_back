require('dotenv').config();
const app = require('./app');
const { initDrive } = require('./connect');



const { PORT = 4000 } = process.env;

function startServer(){
    initDrive();
    app.listen(PORT, console.log(`Server success running at the port ${PORT}`));
};

startServer();
