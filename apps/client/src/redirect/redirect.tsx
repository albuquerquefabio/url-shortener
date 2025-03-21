import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOriginalUrl } from '../services/urlShortenerService';
import { Spin, Result } from 'antd';

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [notFount, setNotFound] = useState<boolean>(false);
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUrl = async () => {
      try {
        const { data } = await getOriginalUrl(String(shortUrl));

        if (
          data.original.startsWith('http://') ||
          data.original.startsWith('https://')
        ) {
          window.location.href = data.original;
        } else {
          window.location.href = `https://${data.original}`;
        }
      } catch (error: Error | any) {
        const { status } = error;
        if (status === 404) {
          setNotFound(true);
          return;
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [shortUrl]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (notFount) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the URL you visited does not exist."
        extra={
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#1890ff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        }
      />
    );
  }

  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong. Please try again later."
        extra={
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#1890ff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        }
      />
    );
  }

  return null;
}
