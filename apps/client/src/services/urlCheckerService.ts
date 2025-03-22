import axios from 'axios';

import env from '../config/env';

export const urlChecker = async (
  shortUrl: string
): Promise<{
  data: { has: boolean };
  status: number;
}> => {
  const { data, status } = await axios.get<{
    has: boolean;
  }>(`${env.server.api}/url/checker/${shortUrl}`);
  return { data, status };
};
