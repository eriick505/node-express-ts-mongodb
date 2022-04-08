const db_user = process.env.MONGODB_USER;
const db_name = process.env.MONGODB_NAME;
const db_password = process.env.MONGODB_PASSWORD;

export const url = `mongodb+srv://${db_user}:${db_password}@learning-mern.wjmxd.mongodb.net/${db_name}?retryWrites=true&w=majority`;
