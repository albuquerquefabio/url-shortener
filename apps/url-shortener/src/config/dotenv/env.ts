const MODE = process.env.NODE_ENV || 'development';

const DBNAME =
  MODE === 'production' ? process.env.MONGODB_DB_NAME : 'url-shortener-dev';

export default {
  server: {
    mode: MODE,
    port: +(process.env.PORT || 3000),
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/url-shortener',
    dbName: DBNAME || 'url-shortener',
  },
  url: {
    shortNumber: +(process.env.URL_SHORT_NUMBER || 6),
  },
};
