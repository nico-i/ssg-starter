import { Link } from "@components/Link";
import { SEO } from "@components/Seo";
import { Locale } from "@helper/i18n";
import { useSiteMeta } from "@hooks/useSiteMeta";
import { Route } from "@types";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as React from "react";

const IndexPage: React.FC<PageProps> = () => {
  const { t, i18n } = useTranslation();

  return (
    <main>
      <h1 className="text-2xl">{t("hello-world")}</h1>
      <div className="flex gap-4">
        {Object.values(Locale).map((locale) => {
          if (locale === i18n.language) {
            return null;
          }
          const lngName = new Intl.DisplayNames([locale], {
            type: "language",
          });
          return (
            <Link
              key={locale}
              to="/"
              locale={locale}
              dataTestId={`change-lng-to-${locale}`}
            >
              {lngName.of(locale)}
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export const Head: HeadFC = () => {
  const { title, description } = useSiteMeta();
  return <SEO title={title} description={description} route={Route.HOME} />;
};
