export default () => ({
  APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,
  MONGO_DETAILS: {
    HOST: process.env.DATABASE_HOST,
    PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
  },
  BYCRYPT: {
    BYCRYPT_SALT_ROUNDS: parseInt(process.env.BYCRYPT_SALT_ROUNDS),
  },
  JWT_SECRET: process.env.JWT_SECRET,
  SORT_CODE: parseInt(process.env.SORT_CODE)
});