
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
  url = 'https://wallet2qr.com',
  type = 'website',
  author = 'Wallet2QR Team',
  twitterCard = 'summary_large_image',
}) => {
  const { settings } = useSiteSettings();
  
  const finalTitle = title || settings.metaTitle;
  const finalDescription = description || settings.metaDescription;
  const finalKeywords = keywords || settings.metaKeywords;
  
  const siteTitle = finalTitle.includes(settings.siteName) ? finalTitle : `${finalTitle} | ${settings.siteName}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />

      {/* Schema.org markup for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": settings.siteName,
          "description": finalDescription,
          "url": url,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser"
        })}
      </script>

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

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
