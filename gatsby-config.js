/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      // Put disable to false if you wan to analyse bundle size
      options: { disable: true },
    },
  ],
  pathPrefix: "/github-search",
}
