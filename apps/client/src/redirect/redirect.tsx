import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getOriginalUrl } from '../services/urlShortenerService';

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [notFount, setNotFound] = useState<boolean>(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUrl = async () => {
      try {
        const { data, status } = await getOriginalUrl(String(shortUrl));

        // Check if the URL starts with http or https
        if (
          data.original.startsWith('http://') ||
          data.original.startsWith('https://')
        ) {
          window.location.href = data.original;
        } else {
          window.location.href = `https://${data.original}`;
        }
      } catch (error: Error | any) {
        console.error(error);
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
    return <Loading />;
  }

  if (notFount) {
    return <NotFound />;
  }

  if (error) {
    return <Error />;
  }

  return null;
}

function Loading() {
  return <div>Loading...</div>;
}

function NotFound() {
  return <div>URL not found.</div>;
}

function Error() {
  return <div>Something went wrong. Please try again later.</div>;
}
