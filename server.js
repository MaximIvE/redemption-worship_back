const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_DB_HOST, PORT = 4000 } = process.env;

function startServer(){
    
    mongoose.connect(MONGO_DB_HOST)
        .then(() => {
            console.log("Database MongoDB connect success");
            app.listen(PORT, console.log(`Server success running at the port ${PORT}`));
        })
        .catch(error => {
            console.log(error.message);
            process.exit(1);
        });

};

startServer();
