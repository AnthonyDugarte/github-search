/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      // Put disable to false if you wan to analyse bundle size
      options: { disable: true },
    },
  ],
  pathPrefix: "/github-search",

  siteMetadata: {
    title: "GitHub search",
    titleTemplate: "GitHub search · %s",
    siteUrl: `https://anthonydugarte.github.io/github-search`,
    url: "https://anthonydugarte.github.io/github-search",
    description: "Search for  GitHub users",
    image: "",
    twitterUsername: "@AnthonyDugarte8",
  },
}
