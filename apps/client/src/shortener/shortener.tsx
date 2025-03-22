import { useState } from 'react';
import { shortenerUrl } from '../services/urlShortenerService';
import { createCustomShortenerUrl } from '../services/urlCustomService';
import { Button, Input, Space, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useUser } from '../context/UserContext';

import styles from './shortener.module.scss';
import env from '../config/env';
import { isValidUrl } from '../utils/urlValidate';

export function Shortener() {
  const { user } = useUser();
  const [url, setUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleShorten = async () => {
    if (!isValidUrl(url)) {
      message.error('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    try {
      const data = user
        ? await createCustomShortenerUrl(url)
        : await shortenerUrl(url);
      setShortUrl(data.short);
      setUrl('');
    } catch (error) {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${env.app.url}/${shortUrl}`);
    message.success('Shortened URL copied to clipboard!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleShorten();
  };

  return (
    <div className={styles.centerContainer}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          <h2>Enter the URL to shorten</h2>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              inputMode="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%' }}
              disabled={loading}
            />
            <Button type="primary" htmlType="submit" loading={loading}>
              Short
            </Button>
          </Space.Compact>
        </form>
        {shortUrl && (
          <>
            <span className={styles.successText}>
              Success! Here's your short URL:
            </span>
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
          </>
        )}
      </div>
    </div>
  );
}
