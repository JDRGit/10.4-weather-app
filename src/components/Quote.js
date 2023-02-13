import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState({});

  useEffect(() => {
    fetch('https://api.goprogram.ai/inspiration')
      .then(response => response.json())
      .then(data => setQuote(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="quote-container">
      <div className="quote-card">
        <h2>Quote of the Day</h2>
      <p>{quote.quote}</p>
      <p>Author: {quote.author}</p>
      </div>
    </div>
  );
};

export default Quote;