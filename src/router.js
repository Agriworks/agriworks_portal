import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/registration",
      name: "Registration",
      component: () => import("./views/Registration.vue")
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
      path: "/admin",
      name: "Admin",
      component: () => import("./views/Admin.vue"),
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: "/account",
      name: "Account",
      component: () =>import("./views/Account.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/browse",
      name: "Browse",
      component: () => import("./views/DatasetBrowserView.vue")
    },
    {
      path: "/table",
      name: "table",
      component: () => import("./views/Table.vue")
    },
    {
      path: "/charts",
      name: "Charts",
      component: () => import("./views/Charts.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  //hard code for now
  let auth = true;
  let admin = false;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth) {
      if (to.matched.some(record => record.meta.is_admin)) {
        //check to see if admin
        if (admin) {
          next();
        }
        // else{
        //   alert user does not have admin privileges
        // }
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
