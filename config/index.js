const { NODE_ENV, MONGO_USER, MONGO_PASSWORD } = process.env;

const config = {
  production: {
    MONGO_URI: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-vufbo.mongodb.net/workoutapp-prod?retryWrites=true&w=majority`,
  },
  staging: {
    MONGO_URI: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-vufbo.mongodb.net/workoutapp-staging?retryWrites=true&w=majority`,
  },
};

module.exports = config[NODE_ENV];
