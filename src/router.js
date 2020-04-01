import Vue from "vue";
import Router from "vue-router";
import store from "./store"; // TODO: How do we import the store globally ?
import api from "./api";

Vue.use(Router);

const redirectIfLoggedIn = function(next) {
  if (store.getters.isLoggedIn == true) {
    next("browse");
  } else if (store.getters.isLoggedIn == "unset") {
    api.verifyLogin();
  } else {
    next();
  }
};

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Landing.vue"),
      beforeEnter: (to, from, next) => redirectIfLoggedIn(next)
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
      path: "/browse",
      name: "browseDefault",
      component: () => import("./views/DatasetBrowserView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("./views/ForgotPassword.vue")
    },
    {
      path: "/reset-password/:id",
      name: "reset-password",
      component: () => import("./views/ResetPassword.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      beforeEnter: (to, from, next) => redirectIfLoggedIn(next)
    },
    {
      path: "/registration",
      name: "registration",
      component: () => import("./views/Registration.vue"),
      beforeEnter: (to, from, next) => redirectIfLoggedIn(next)
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
      path: "/dataset/:id",
      name: "dataset",
      component: () => import("./views/Dataset.vue"),
      meta: {
        requiresAuth: false
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
      path: "/table",
      name: "Datatable",
      component: () => import("./components/DataTable.vue")
    },
    {
      path: "/charts",
      name: "Charts",
      component: () => import("./views/Charts.vue")
    },
    {
      path: "/waitforupload",
      name: "WaitForUpload",
      component: () => import("./views/UploadWaitView.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  let authorized = store.getters.isLoggedIn;
  let admin = false; //TODO: Set admin permission

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (authorized == "unset") {
      api.verifyLogin();
    } else if (authorized == true) {
      if (to.matched.some(record => record.meta.is_admin)) {
        //check to see if admin
        if (admin) {
          next();
        } else {
          console.log("no admin")
        }
      } else {
        //authorize to dashboard if user is logged in but is not admin
        next();
      }
    } else {
      //redirect to login page if user is not authorized to view dashboard
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
export default router;
