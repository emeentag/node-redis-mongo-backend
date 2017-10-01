export default class ServerConfig {
  static SERVER_HOST = (process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0');
  static SERVER_PORT = (process.env.PORT || '3030');
  static MONGO_DB = "jodel";
  static MONGO_DB_URL = "mongodb://0.0.0.0:27017/";
}