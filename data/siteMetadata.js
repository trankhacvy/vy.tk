const siteMetadata = {
  title: "Vy's Realm",
  author: 'Khac Vy',
  description: 'My personal website and portfolio.',
  language: 'en-us',
  siteUrl: 'https://khacvy.com',
  siteRepo: 'https://github.com/trankhacvy/vy.tk',
  siteLogo: '/static/favicons/favicon-96x96.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'khacvy93@gmail.com',
  github: 'https://github.com/trankhacvy',
  twitter: 'https://twitter.com/trankhac_vy',
  facebook: '',
  youtube: '',
  linkedin: 'https://www.linkedin.com/in/trankhacvy/',
  locale: 'en-US',
  analytics: {
    googleAnalyticsId: process.env.GA_TRACKING_ID,
  },
  newsletter: {
    provider: 'buttondown',
  },
  comment: {
    provider: 'utterances',
    utterancesConfig: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
    },
  },
}

module.exports = siteMetadata
