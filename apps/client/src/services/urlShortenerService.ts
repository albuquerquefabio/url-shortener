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

export const getOriginalUrl = async (
  shortUrl: string
): Promise<{ data: { original: string }; status: number }> => {
  const { data, status } = await axios.get<{ original: string }>(
    `${env.server.api}/url/${shortUrl}`
  );
  return { data, status };
};
