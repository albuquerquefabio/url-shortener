export const isValidUrl = (value: string) => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    const urlRegex =
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+|localhost)(:\d+)?(\/[\w-]*)*$/i;
    return urlRegex.test(value);
  }
  return false;
};
