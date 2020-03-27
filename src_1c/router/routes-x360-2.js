export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '/home', name: 'home', component: () => import('pages/Home') },
      { path: '/signin', name: 'signin', component: () => import('pages/SignIn') },
      { path: '/register', name: 'register', component: () => import('pages/SignIn') },
      { path: '/lobby', name: 'lobby', component: () => import('pages/Lobby'), meta: { requiresAuth: true }, props: true },
      { path: '/profile', name: 'profile', component: () => import('pages/Profile'), meta: { requiresAuth: true }, props: true }
    ]
  },
  /*
  {
    path: '/user',
    component: () => import('layouts/User'),
    children: [
      { path: '/profile', name: 'profile', component: () => import('pages/Profile') },
      { path: '/ccard', name: 'ccard', component: () => import('pages/CCard') }
    ]
  },
  */
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
