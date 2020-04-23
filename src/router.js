import Vue from "vue";
import Router from "vue-router";
import store from "./store"; // TODO: How do we import the store globally ?
import api from "./api";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Landing.vue"),
      beforeEnter: (to, from, next) => redirectFromPublicRouteIfSignedIn(next)
    },
    {
      path: "/browse",
      name: "browseDefault",
      component: () => import("./views/DatasetBrowserView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/browse/:component",
      name: "browse",
      component: () => import("./views/DatasetBrowserView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/dataset/:id",
      name: "dataset",
      component: () => import("./views/Dataset.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("./views/Dashboard.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account",
      name: "Account",
      component: () => import("./views/Account.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      beforeEnter: (to, from, next) => redirectFromPublicRouteIfSignedIn(next)
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("./views/Registration.vue"),
      beforeEnter: (to, from, next) => redirectFromPublicRouteIfSignedIn(next)
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("./views/ForgotPassword.vue"),
      beforeEnter: (to, from, next) => redirectFromPublicRouteIfSignedIn(next)
    },
    {
      path: "/reset-password/:id",
      name: "reset-password",
      component: () => import("./views/ResetPassword.vue"),
      beforeEnter: (to, from, next) => redirectFromPublicRouteIfSignedIn(next)
    },
    {
      path: "/waitforupload",
      name: "WaitForUpload",
      component: () => import("./views/UploadWaitView.vue")
    },
    {
      path: "/aboutus",
      name: "AboutUs",
      component: () => import("./views/StaticContent.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let authorized = store.getters.isLoggedIn;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authorized == "unset") {
      api.verifyLogin(to.path);
    } else if (authorized == true) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

/*
If the user is signed in and attempts to access a public view, such as the homepage or login, redirect them to browse/.
Else, send them to their destination
*/
const redirectFromPublicRouteIfSignedIn = function (next) {
  if (store.getters.isLoggedIn == true) {
    next("browse");
  } else if (store.getters.isLoggedIn == "unset") {
    api.verifyLogin("/browse");
  } else {
    next();
  }
};

export default router;
