export const shortId = (max = 6): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let short = '';
  for (let i = 0; i < max; i++) {
    short += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return short;
};
