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
    component: () => import('../pages/details/idea.vue')
  },
  {
    path: '/project/:id',
    component: () => import('../pages/details/project.vue')
  },
  {
    path: '/verify',
    component: () => import('../pages/global/verify.vue')
  },
  {
    path: '/verify-all',
    component: () => import('../pages/global/verifyAll.vue')
  },
  {
    path: '/about',
    component: () => import('../pages/mine/about.vue')
  },
  {
    path: '/my-like',
    component: () => import('../pages/mine/like.vue')
  },
  {
    path: '/user/:id',
    component: () => import('../pages/global/user.vue')
  }
]
