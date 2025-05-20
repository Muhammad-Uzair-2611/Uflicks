import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "UFlicks - Your Ultimate Movie Discovery Platform",
  description = "Discover and explore movies and TV shows with UFlicks. Get detailed information, ratings, and recommendations for your favorite entertainment.",
  keywords = "movies, TV shows, entertainment, streaming, movie discovery, UFlicks, Muhammad Uzair",
  image = "/Logo.png",
  url = "https://uflicks.netlify.app"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Muhammad Uzair" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 