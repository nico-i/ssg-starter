// - Requires -
// - Imports -
import type { GatsbyConfig } from "gatsby";
import path from "path";

require(`@dotenvx/dotenvx`).config();
const i18n = require(`./src/helper/i18n/i18n`);

// - Variables -
if (process.env.SITE_URL === undefined) {
  console.error(`SITE_URL is not defined. Issues may occur.`);
}
const { defaultLocale, Locale } = i18n;
const locales = Object.values(Locale);
const siteMetadata = {
  title: `ssg starter`,
  description: `A starter for static site generation with Gatsby`,
  twitterUsername: `@username`,
  siteUrl: process.env.SITE_URL,
};

// - Plugins -
const devPlugins = [`gatsby-plugin-tsconfig-paths`, `gatsby-plugin-postcss`];
const i18nPlugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: path.resolve(__dirname, `locales`), // Path to the locales directory
      name: `locale`,
    },
  },
  {
    // Enable i18n support
    resolve: `gatsby-plugin-react-i18next`, // https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/
    options: {
      languages: locales,
      defaultLanguage: defaultLocale,
      siteUrl: siteMetadata.siteUrl,
      redirect: true,
      // generateDefaultLanguagePage: true, // Only generates a page for the default language but does not redirect
      i18nextOptions: {
        // debug: true,
        fallbackLng: defaultLocale,
        supportedLngs: locales,
        defaultNS: `common`,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        keySeparator: `.`,
        nsSeparator: `:`,
      },
    },
  },
];
const seoPlugins = [
  `gatsby-plugin-sitemap`,
  `gatsby-plugin-robots-txt`,
  {
    // Generate favicons and icons for the site
    resolve: `gatsby-plugin-manifest`, // https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
    options: {
      // TODO: Update this to match your site
      // name: "ssg starter",
      // short_name: "ssg starter",
      // start_url: "/",
      // background_color: "#ffffff",
      // theme_color: "#663399",
      // display: "standalone",
      icon: `assets/img/icon.png`, // necessary for develop to work
    },
  },
];
const analyticsPlugins = [
  {
    // Configures integration with Google Analytics
    resolve: `gatsby-plugin-google-gtag`, // https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
    options: {
      trackingIds: [`G-XXXXXXXXXX`], // TODO: Update this with your tracking ID
    },
  },
];

// - Config -
const config: GatsbyConfig = {
  siteMetadata,
  graphqlTypegen: true, // generates types for graphql queries
  pathPrefix: `/ssg-starter`, // TODO: Update this to match your site
  plugins: [...devPlugins, ...i18nPlugins, ...seoPlugins, ...analyticsPlugins],
};

export default config;
