<template>
    <div>
    
    </div>
</template>

<script>
export default {
    name: "CounterComponent",
    computed: {
        count() {
            return this.$store.state.count;
        }
    }
}
</script>