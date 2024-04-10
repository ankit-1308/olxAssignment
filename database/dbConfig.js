const mongoUri = process.env.MONGO_URL;

const configObj = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = { mongoUri, configObj };