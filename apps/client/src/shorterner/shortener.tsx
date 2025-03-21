import { useState } from 'react';
import { shortenerUrl } from '../services/urlShortenerService';
import { Button, Input, Space } from 'antd';

import styles from './shortener.module.scss';

export function Shortener() {
  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');

  const handleShorten = async () => {
    try {
      const data = await shortenerUrl(url);

      setShortUrl(data.short);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.centerContainer}>
      <div className={styles.card}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            inputMode="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '100%' }}
          />
          <Button type="primary" onClick={handleShorten}>
            Short
          </Button>
        </Space.Compact>
        <div>
          <p>{shortUrl}</p>
        </div>
      </div>
    </div>
  );
}
