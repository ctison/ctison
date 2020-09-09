module.exports = {
  title: "ctison's website",
  url: 'https://ctison.dev',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  onDuplicateRoutes: 'throw',
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    // TODO: https://v2.docusaurus.io/docs/theme-classic#meta-image
    // image: 'img/logo.png'
    navbar: {
      title: 'ctison',
      logo: {
        alt: 'ctison avatar',
        src: 'https://avatars3.githubusercontent.com/u/17789536?v=4',
      },
      items: [
        {
          to: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          blogDescription: 'Blog about software engineering and security',
          feedOptions: {
            type: 'all',
            language: 'en',
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
