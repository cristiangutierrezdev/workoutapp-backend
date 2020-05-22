require('dotenv').config()
const { server, PORT } = require('./server');
require('./database');

// Encedemos servidor
server.listen(PORT, () => console.log(`Listening on ${PORT}`));