import axios from 'axios';

import env from '../config/env';
import { UrlShortener } from '../interface/UrlShortenerInterface';

export const createCustomShortenerUrl = async (
  url: string,
  short?: string
): Promise<UrlShortener> => {
  const response = await axios.post<
    { original: string; short: string },
    { data: UrlShortener }
  >(`${env.server.api}/url-custom`, {
    original: url,
    short,
  });
  return response.data;
};

export const allCustomUrl = async (): Promise<{
  data: Array<UrlShortener>;
  status: number;
}> => {
  const { data, status } = await axios.get<Array<UrlShortener>>(
    `${env.server.api}/url-custom`
  );
  return { data, status };
};

export const updateCustomUrl = async (
  id: string,
  shortUrl: string
): Promise<{ data: { original: string; short: string }; status: number }> => {
  const { data, status } = await axios.put<{ original: string; short: string }>(
    `${env.server.api}/url-custom/${id}`,
    {
      short: shortUrl,
    }
  );
  return { data, status };
};

export const deleteCustomUrl = async (
  id: string
): Promise<{ message: string; status: number }> => {
  const { status } = await axios.delete<{
    original: string;
    short: string;
  }>(`${env.server.api}/url-custom/${id}`);
  return { message: 'deleted', status };
};
