const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS;

const hashPassword = async plainText => {
  const hashedText = await bcrypt.hash(plainText, saltRounds);
  return hashedText;
};

module.exports = hashPassword;