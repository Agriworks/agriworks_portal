import Vue from "vue";
import Router from "vue-router";
import store from "./store"; // TODO: How do we import the store globally ?

Vue.use(Router);

const redirectIfLoggedIn = function(next) {
  if (store.getters.isLoggedIn) {
    next("dashboard");
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
      path: "/upload",
      name: "uploadscreen",
      component: () => import("./views/UploadScreen.vue"),
      meta: {
        requiresAuth: true
      }
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
    }
  ]
});

router.beforeEach((to, from, next) => {
  let auth = store.getters.isLoggedIn;
  let admin = false; //TODO: Set admin permission

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth) {
      if (to.matched.some(record => record.meta.is_admin)) {
        //check to see if admin
        if (admin) {
          next();
        } else {
          store.commit(
            "setErrorMessage",
            "User Does Not Have Admin Privileges"
          );
          store.commit("setShowError", true);
        }
      } else {
        store.commit("setErrorMessage", "User Does Not Have Admin Privileges");
        store.commit("setShowError", true);
        //authorize to dashboard if user is logged in but is not admin
        next();
      }
    } else {
      //redirect to login page if user is not authorized to view dashboard
      store.commit("setErrorMessage", "User Is Not Logged In");
      store.commit("setShowError", true);
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
