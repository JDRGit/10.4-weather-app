import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState('Loading quote...');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random', { signal });
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch quote');
        }

        setQuote(data.content);
        setAuthor(data.author);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setQuote('An error occurred');
          setAuthor('');
          console.error(err);
        }
      }
    };

    fetchQuote();

    return () => {
      controller.abort();
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="quote-container">
      <div className="quote-card">
        <h2>Quote of the Day</h2>
        <p>{quote}</p>
        {author && <p>Author: {author}</p>}
      </div>
    </div>
  );
};

export default Quote;
