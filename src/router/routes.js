import LoginPage from '../pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/index', component: () => import('pages/IndexPage.vue') },
      { path: '/about', component: () => import('pages/AboutPage.vue') },
      { path: '/contact', component: () => import('pages/ContactPage.vue') },
      {
        path: '/login',
        name: 'login',
        component: LoginPage
      }
    ]
  }
]

export default routes
