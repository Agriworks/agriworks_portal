import Vue from "vue";
import Router from "vue-router";
import store from "./store"; // TODO: How do we import the store globally ?
import api from "./api";
import { sessionExists } from "./utilities/cookies";
import { deleteCookie } from "./js/authentication";
import notify from "./utilities/notify";
import { colors } from "./utilities/branding";

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
      path: "/resend-confirmation-email/:email",
      name: "resend-confirmation-email",
      component: () => import("./views/ResendConfirmationEmail.vue"),
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
      path: "/confirm-user/:id",
      name: "confirm-user",
      component: () => import("./views/ConfirmUser.vue"),
      beforeEnter: (to, from, next) => redirectFromPublicRouteIfSignedIn(next)
    },
    {
      path: "/create-template",
      name: "create-template",
      component: () => import("./views/CreateTemplate.vue"),
    }
  ]
});

const verifyLoginAndRedirect = async (redirect, next) => {
  let isLoggedIn = store.getters.isLoggedIn;
  if (isLoggedIn == "unset") {
    if (!sessionExists()) {
      redirect();
    } else {
      const {isValidSession, error} = await api.verifyLogin();
      if (!isValidSession) {
        deleteCookie("SID");
        store.commit("setLoggedInFalse");
        redirect();
        notify(error, colors.red);
      } else {
        store.commit("setLoggedInTrue");
        next();
      }
    }
  } else if (isLoggedIn == true) {
    next();
  } else {
    redirect();
  }
}

/*
If the user is signed in and attempts to access a public view, such as the homepage or login, redirect them to browse/.
Else, send them to their destination
*/
const redirectFromPublicRouteIfSignedIn = function(next) {
  const redirectToBrowse = () => next("browse");
  if (store.getters.isLoggedIn == true) {
    redirectToBrowse();
  } else if (store.getters.isLoggedIn == "unset") {
    verifyLoginAndRedirect(next, redirectToBrowse);
  } else {
    next();
  }
};

router.beforeEach(async (to, from, next) => {
  const redirectToLogin = () => next({path: "/login", query: {redirect: to.fullPath}});
  if (to.matched.some(record => record.meta.requiresAuth)) {
    verifyLoginAndRedirect(redirectToLogin, next);
  } else {
    next();
  }
});

export default router;
