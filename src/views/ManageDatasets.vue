<template>
    <div>
        <h1> Manage datasets </h1>
    </div>
</template>

<script>

import api from "../api";
export default {
    created() {
        api.fetchUserDatasets();
    }
}
</script>