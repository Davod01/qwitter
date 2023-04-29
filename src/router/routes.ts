import { RouteRecordRaw } from 'vue-router';
// import router from '.';

const routes: RouteRecordRaw[] = [
  
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue'), name: 'Home' },

      { path: 'about', component: () => import('pages/AboutPage.vue'), name: 'About' }
      
    ],
    meta: {
      requiresAuth: true,
    }
  },

  {
    path: '/auth/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue'), name: 'Login' },
      { path: 'register', component: () => import('pages/auth/RegisterPage.vue'), name: 'Register' },
      { 
        path: 'email-confirmation',
        name: 'email-confirmation',
        component: () => import('pages/auth/EmailConfirmationPage.vue')
      },
      { 
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('pages/auth/ForgetPassPage.vue') 
      },
      { 
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('pages/auth/ResetPassPage.vue') 
      }
    ],
    meta: {
      requiresAuth: false,
    }
  },

  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
