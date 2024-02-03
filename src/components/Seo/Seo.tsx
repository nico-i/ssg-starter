import { useSiteMeta } from "@hooks/useSiteMeta";
import { Route } from "@types";
import { useTranslation } from "gatsby-plugin-react-i18next";
import React from "react";

export interface SEOProps {
  title: string;
  description: string;
  route: Route;
  slug?: string;
  children?: React.ReactNode;
}

export const SEO = ({
  title,
  description,
  route,
  slug,
  children,
}: Readonly<SEOProps>) => {
  const { siteUrl, twitterUsername } = useSiteMeta();
  const { i18n } = useTranslation();
  const url = new URL(
    `${siteUrl}${route ? `/${route}` : ``}${slug ? `/${slug}` : ``}`,
  );

  const routeAsFileName = (
    route?.startsWith("/") ? route.slice(1) : route
  )?.replace(/\//g, "-");

  const ogImageUrl = new URL(
    `${siteUrl}/og-images/${routeAsFileName}${slug || ``}.jpeg`,
  );

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url.toString()} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl.toString()} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url.toString()} />
      <meta property="og:image" content={ogImageUrl.toString()} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content={i18n.language} />
      <meta property="og:type" content="website" />
      {children}
    </>
  );
};
