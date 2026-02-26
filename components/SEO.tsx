import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

const SEO = ({ title, description, image, article }: SEOProps) => {
  const { asPath } = useRouter();
  const siteName = 'Velorm';
  const defaultDescription = 'Velorm — Premium perfumes and luxury attars for the modern individual. Discover our curated collection of artisanal scents.';
  const twitterHandle = '@velorm_official';
  const domain = 'https://velorm.com'; // Replace with actual domain when available
  const url = `${domain}${asPath}`;

  const seo = {
    title: title ? `${title} | ${siteName}` : `${siteName} | Premium Perfumes & Luxury Attars`,
    description: description || defaultDescription,
    image: image || `${domain}/og-image.jpg`, // Ensure this exists
    url: url,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && (
        <meta name="twitter:creator" content={twitterHandle} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEO;
