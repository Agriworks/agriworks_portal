<template>
    <sidebar-menu :menu="menu" :collapsed="collapsed" :width="width" @toggle-collapse="onToggleCollapse">
        <fa-icon slot="toggle-icon" icon="arrows-alt-h"></fa-icon>
    </sidebar-menu>
</template>

<script>

export default {
  name: "Sidebar",
  data() {
    return {
      menu: [
            {
                header: true,
                title: 'Main Navigation',
                hiddenOnCollapse: true
            },
            {
                href: { path: '/' },
                title: 'Dashboard',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'align-left',
                  }
                }
            },
            {
                href: { path: '/login' },
                title: 'Login',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'sign-in-alt'
                  }
                }
            },
            {
                href: { path: '/registration' },
                title: 'Registration',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'registered'
                  }
                }
            },
            {
                href: { path: '/admin' },
                title: 'Admin',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'user'
                  }
                }
            },
            {
                href: { path: '/account' },
                title: 'Account',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'user',
                  }
                }
            },
            {
                href: { path: '/browse' },
                title: 'Browse',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'search'
                  }
                }
            },
            {
                href: { path: '/charts' },
                title: 'Charts',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'chart-bar'
                  }
                }
            },
            {
                href: { path: '/table' },
                title: 'Table',
                icon: {
                  element: 'fa-icon',
                  attributes: {
                    icon: 'chart-bar'
                  }
                }
            },
        ],
      collapsed: true,
      width : "250px",
      selectedTheme: "white-theme"

    };
  },
  methods: {
      onToggleCollapse (collapsed) {
        this.$emit('collapsed', collapsed);
    }
  }
};
</script>
<style scoped>
.v-sidebar-menu >>> .vsm--link{
    font-size: 15px;
    text-align: left;
}
.v-sidebar-menu >>> .vsm--icon {
    margin-right: 10px;
}

.v-sidebar-menu >>> .vsm--header {
    font-size: 11px;
    text-align: left;
}

.v-sidebar-menu >>> .vsm--link.vsm--link_active {
    box-shadow: 3px 0px 0px 0px green inset;
}

</style>
