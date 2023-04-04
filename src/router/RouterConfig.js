export default [
  { path: '/issues', auth: false },
  { path: '/issues/:id', auth: false },
  { path: '/addIssue', auth: true },
  { path: '/books', auth: false },
  { path: '/books/:id', auth: false },
  { path: '/interviews', auth: false },
  { path: '/searchPage', auth: false },
  { path: '/personal', auth: true },
  { path: '/', auth: false },
]