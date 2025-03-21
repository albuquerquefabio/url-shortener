export const isValidUrl = (value: string) => {
  const urlRegex =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+|localhost)(:\d+)?(\/[\w-]*)*$/i;
  return urlRegex.test(value);
};
