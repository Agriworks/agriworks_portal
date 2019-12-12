<template>
    <div class="search-bar-container">
        <div>
            <b-navbar toggleable="lg" type="dark" variant="secondary">

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="m-auto">

                    <b-nav-form>
                    <b-form-input size="sm" class="mr-lg-2 searchBar" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown>
                    <template v-slot:button-content>
                        <em>Filters</em>
                    </template>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>More Filters</em>
                    </template>
                    <b-dropdown-item href="#">Filter-One</b-dropdown-item>
                    <b-dropdown-item href="#">Filter-Two</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
export default {
  name: 'SearchBar',
  props: {
    msg: String
  }
}
</script>

<style scoped>

.searchBar{
    width: 500px;
}

.search-bar-container {
    align-content: center;
    padding: 0px 20px 25px;
    width: 99%

}

</style>