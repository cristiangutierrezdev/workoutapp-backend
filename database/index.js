const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Database connected'))
  .catch((err) =>
    console.log({ message: 'Error connecting to database...', err })
  );
