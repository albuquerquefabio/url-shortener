import { url } from 'inspector';

const MODE = process.env.NODE_ENV || 'development';

const DOMAIN = 'localhost';

export default {
  server: {
    domain: DOMAIN,
    mode: MODE,
    api: `http://${DOMAIN}:3000/api`,
  },
  app: {
    url: `http://${DOMAIN}:4200`,
  },
};
