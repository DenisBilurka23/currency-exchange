export const navItems = [
  { text: 'Home', link: '/' },
  { text: 'Modified Rates', link: '/modified' },
  { text: 'Search', link: '/search' },
  { text: 'Exchange', link: '/exchange' }
]

export const pageTitles = [
  {
    path: '/',
    title: 'Welcome to the Currency Dashboard',
    subtitle: 'Track and manage real-time exchange rates effortlessly'
  },
  {
    path: '/modified',
    title: 'Modified Rates',
    subtitle: 'View and manage your customized currency exchange rates'
  },
  {
    path: '/search',
    title: 'Search Historical Rates',
    subtitle: 'Find past exchange rates for any date or currency'
  },
  {
    path: '/exchange',
    title: 'Currency Converter',
    subtitle: 'Easily convert between currencies with real-time exchange rates'
  },
  {
    path: '/currency/:code',
    title: 'Currency Details',
    subtitle: 'View or modify rate for a specific currency'
  }
]

export const getFlag = (cc) => `https://flagcdn.com/w80/${cc.slice(0, 2).toLowerCase()}.png`
