require('dotenv').config();
const app = require('./app');


const { PORT = 4000 } = process.env;

app.listen(PORT, console.log(`Server success running at the port ${PORT}`));