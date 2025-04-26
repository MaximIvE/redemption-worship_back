require('dotenv').config({ path: '.env.local' });
const app = require('./app');


const { PORT = 4000 } = process.env;

app.listen(PORT, console.log(`Server success running at the port ${PORT}`));