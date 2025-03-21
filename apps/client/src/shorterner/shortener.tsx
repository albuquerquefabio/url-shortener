import { useState } from 'react';
import { shortenerUrl } from '../services/urlShortenerService';
import { Button, Input, Space, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons'; // Import copy icon

import styles from './shortener.module.scss';
import env from '../config/env';
import { isValidUrl } from '../utils/urlValidate';

export function Shortener() {
  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  const handleShorten = async () => {
    if (!isValidUrl(url)) {
      message.error('Please enter a valid URL.');
      return;
    }

    setLoading(true); // Set loading to true
    try {
      const data = await shortenerUrl(url);
      setShortUrl(data.short);
      setUrl(''); // Clear the input
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${env.app.url}/${shortUrl}`);
    message.success('Shortened URL copied to clipboard!');
  };

  return (
    <div className={styles.centerContainer}>
      <div className={styles.card}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            inputMode="url"
            placeholder="Enter URL https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '100%' }}
            disabled={loading} // Disable input while loading
          />
          <Button type="primary" onClick={handleShorten} loading={loading}>
            Short
          </Button>
        </Space.Compact>
        {shortUrl && (
          <div className={styles.resultContainer}>
            <a
              href={`${env.app.url}/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resultText}
            >
              {`${env.app.url}/${shortUrl}`}
            </a>
            <Button
              type="default"
              icon={<CopyOutlined />}
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
