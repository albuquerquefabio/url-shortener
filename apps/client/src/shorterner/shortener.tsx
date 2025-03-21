import { useState } from 'react';
import { shortenerUrl } from '../services/urlShortenerService';

export function Shortener() {
  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');

  const handleShorten = async () => {
    try {
      console.log({ url });
      const data = await shortenerUrl(url);
      console.log(data);
      setShortUrl(data.short);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleShorten}>Shorten</button>
      <p>{shortUrl}</p>
    </div>
  );
}
