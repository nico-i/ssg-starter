import { graphql, useStaticQuery } from "gatsby";

export const useSiteMeta = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitterUsername
          siteUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
