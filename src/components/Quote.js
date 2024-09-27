import React, { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // Function to fetch a new quote
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      if (response.ok) {
        setQuote(data.content);
        setAuthor(data.author);
      } else {
        setQuote('An error occurred');
        setAuthor('');
        console.error(data);
      }
    } catch (error) {
      setQuote('An error occurred');
      setAuthor('');
      console.error(error);
    }
  };

  // Fetch a quote once when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <div className="quote-card">
        <h2>Quote of the Day</h2>
        <p>{quote}</p>
        <p>Author: {author}</p>
        <button onClick={fetchQuote}>Get New Quote</button>
      </div>
    </div>
  );
};

export default Quote;
