
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/crypto-qr-preview.png',
  url = 'https://cryptoqr.app',
  type = 'website',
  author,
  twitterCard = 'summary_large_image',
}) => {
  // Get site settings from context
  const { settings } = useSiteSettings();
  
  // Use provided props or fallback to site settings
  const finalTitle = title || settings.metaTitle;
  const finalDescription = description || settings.metaDescription;
  const finalKeywords = keywords || settings.metaKeywords;
  const finalAuthor = author || 'CryptoQR Team';
  
  const siteTitle = finalTitle.includes(settings.siteName) ? finalTitle : `${finalTitle} | ${settings.siteName}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={finalAuthor} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={settings.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional mobile metadata */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#9b87f5" />
    </Helmet>
  );
};

export default SEO;
