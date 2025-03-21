import axios from 'axios';
import { UrlShortener } from '../interface/urlShortenerInterface';
import env from '../config/env';

export const shortenerUrl = async (url: string): Promise<UrlShortener> => {
  const response = await axios.post<
    { original: string },
    { data: UrlShortener }
  >(`${env.server.api}/url`, {
    original: url,
  });
  return response.data;
};
