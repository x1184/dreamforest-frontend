import Home from '../App.vue'
import Form from '../pages/form.vue'
import Footer from '../layouts/DfFooter.vue'

export default [
  {
    path: '/',
    component: Home,
    redirect: '/explore',
    children: [{
      path: 'explore',
      components: {
        default: () => import('../pages/home.vue'),
        footer: Footer
      }
    }, {
      path: 'star',
      components: {
        default: () => import('../pages/home.vue'),
        footer: Footer
      }
    }, {
      path: 'mine',
      components: {
        default: () => import('../pages/personal.vue'),
        footer: Footer
      }
    }]
  },
  {
    path: '/login',
    component: () => import('../pages/global/login.vue')
  },
  {
    path: '/register',
    component: () => import('../pages/global/register.vue')
  },
  {
    path: '/form/:type',
    component: Form
  },
  {
    path: '/detail/:id',
    component: () => import('../pages/details.vue')
  }
]
