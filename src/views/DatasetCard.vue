<template>
    <v-card class="datasetCard"> 
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4 datasetType"> {{ dataset.type }} </div>
                <v-list-item-title> {{ dataset.name }} </v-list-item-title>
                <v-list-item-subtitle> By {{ dataset.author }} </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="80" tile>
                <v-img src="https://cdn4.iconfinder.com/data/icons/business-app-enjoy/74/2-512.png"/>
            </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
            <v-btn text> Open </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "DatasetCard",
  props: ["dataset"]
};
</script>

<style scoped>
.datasetCard {
    width: 300px;
    margin: 1rem;
    border: 2px solid darkblue;
    border-radius: 10px;
}

.datasetType {
    font-weight: bold;
    color:#017afd;
}
</style>