// - Requires -
// - Imports -
require("@dotenvx/dotenvx").config();
const i18n = require("./src/helper/i18n/i18n");

// - Variables -
if (process.env.SITE_URL === undefined) {
  console.error("SITE_URL is not defined. Issues may occur.");
}
const { defaultLocale, Locale } = i18n;
const locales = Object.values(Locale);
const siteMetadata = {
  title: "ssg starter",
  description: "A starter for static site generation with Gatsby",
  twitterUsername: "@username",
  siteUrl: process.env.SITE_URL,
};

// - Plugins -
const devPlugins = ["gatsby-plugin-tsconfig-paths", "gatsby-plugin-postcss"];
const i18nPlugins = [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/locales`,
      name: "locale",
    },
  },
  {
    // Enable i18n support
    // https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/
    resolve: "gatsby-plugin-react-i18next",
    options: {
      languages: locales,
      defaultLanguage: defaultLocale,
      siteUrl: siteMetadata.siteUrl,
      redirect: true,
      // Only generates a page for the default language but does not redirect
      // generateDefaultLanguagePage: true,
      i18nextOptions: {
        // debug: true,
        fallbackLng: defaultLocale,
        supportedLngs: locales,
        defaultNS: "common",
        interpolation: {
          // not needed for react as it escapes by default
          escapeValue: false,
        },
        keySeparator: ".",
        nsSeparator: ":",
      },
    },
  },
];
const seoPlugins = [
  "gatsby-plugin-sitemap",
  "gatsby-plugin-robots-txt",
  {
    // Generate favicons and icons for the site
    // https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
    resolve: "gatsby-plugin-manifest",
    options: {
      // TODO: Update this to match your site
      // name: "ssg starter",
      // short_name: "ssg starter",
      // start_url: "/",
      // background_color: "#ffffff",
      // theme_color: "#663399",
      // display: "standalone",
      icon: "assets/img/icon.png", // necessary for develop to work
    },
  },
];
const analyticsPlugins = [
  {
    // Configures integration with Google Analytics
    // https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
    resolve: "gatsby-plugin-google-gtag",
    options: {
      trackingIds: ["G-XXXXXXXXXX"], // TODO: Update this with your tracking ID
    },
  },
];

// - Config -
const config = {
  siteMetadata,
  // TODO: Update / disable this if you are using a custom domain
  pathPrefix: "/ssg-starter",
  graphqlTypegen: true, // generates types for graphql queries
  plugins: [...devPlugins, ...i18nPlugins, ...seoPlugins, ...analyticsPlugins],
};

export default config;
