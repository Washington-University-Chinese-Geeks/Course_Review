// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WUCG 课程评价 / WUCG Course Review',
  tagline: 'WashU 课程一手评价与经验分享 · First-hand course reviews from WashU students',
  favicon: 'img/favicon.ico',

  url: 'https://wucg.github.io',
  baseUrl: '/Course_Review/',

  organizationName: 'WUCG',
  projectName: 'Course_Review',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl:
            'https://github.com/WUCG/Course_Review/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      navbar: {
        title: 'WUCG Course Review',
        logo: {
          alt: 'WUCG Logo',
          src: 'img/favicon.ico',
          className: 'navbar-logo',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'csSidebar',
            position: 'left',
            label: 'CS',
          },
          {
            type: 'docSidebar',
            sidebarId: 'mathSidebar',
            position: 'left',
            label: 'Math',
          },
          {
            type: 'docSidebar',
            sidebarId: 'econSidebar',
            position: 'left',
            label: 'Econ',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/WUCG/Course_Review',
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
              {label: 'CS Courses', to: '/cs/'},
              {label: 'Math Courses', to: '/math/'},
              {label: 'Econ Courses', to: '/econ/'},
            ],
          },
          {
            title: 'Contribute',
            items: [
              {label: 'Contributor Guide', to: '/contributing'},
              {
                label: 'Open a PR',
                href: 'https://github.com/WUCG/Course_Review/pulls',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/WUCG/Course_Review',
              },
              {
                label: 'WashU Bulletin',
                href: 'https://bulletin.wustl.edu/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WUCG. Built with Docusaurus. Content licensed CC BY-SA 4.0.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
