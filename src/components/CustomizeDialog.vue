<template>
    <div class="dialog">
          
          <v-dialog v-model="dialog"
            max-width="800px">
         

            <v-card>
              <v-card-title>
                Choropleth Map Configuration
              </v-card-title>
              
              <v-card-text>
                <v-container>
                  <v-stepper v-model="stepIndex">
                    <v-stepper-header>
                      <v-stepper-step
                        :complete="stepIndex > 1"
                        step="1"
                        color="success"
                      >
                        Select Location Column 
                      </v-stepper-step>
                
                      <v-divider></v-divider>
                
                      <v-stepper-step
                        :complete="stepIndex > 2"
                        step="2"
                        color="success"
                      >
                        Select Data Column(s)
                      </v-stepper-step>
                
                      <v-divider></v-divider>
                
                    </v-stepper-header>
                
                    <v-stepper-items>
                      <!-- Location Stepper -->
                      <v-stepper-content step="1"> 
                        <v-select
                          v-model="locationCol"
                          :items="this.locationLabels"
                          label="Location Column"
                        ></v-select>


                        <v-divider></v-divider>
                        
                        
                        <v-btn
                          color="success"
                          @click="stepIndex = 2"
                        >
                          Continue
                        </v-btn>
                
                        <v-btn text style="float:right" @click="closeDialog">
                          Cancel
                        </v-btn>
                      </v-stepper-content>
                
                       <!-- Data Stepper -->
                      <v-stepper-content step="2">
                         <v-card-text>
                           You can either select one or two columns that will be displayed as the data on the choropleth map. If You
                           select two data columns, the data will be the data in the first column per the data in the second column.
                         </v-card-text>

                         <v-divider></v-divider>

                        <v-select
                          v-model="dataCol1"
                          :items="this.dataLabels"
                          label="Data Col 1"
                        ></v-select>
                        <v-select
                          v-model="dataCol2"
                          :items="this.dataLabels.concat(['N/A'])"
                          label="Data Col 2"
                        ></v-select>


                        <v-divider></v-divider>

                        <v-btn
                          text
                          @click="stepIndex -= 1"
                        >
                          Back 
                        </v-btn>
                        <v-btn
                          color="success"
                          @click="custimizeMap"
                        >
                          Customize Map
                        </v-btn>
                
                        <v-btn text style="float:right" @click="closeDialog">
                          Cancel
                        </v-btn>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'CustomizeDialog',  
    props: ['columnLabels', 'dialog'],

    data () {
      return{
        locationCol: "",
        dataCol1: -1,
        dataCol2: -1,
        stepIndex: 1,
      }
    },
    
    computed: {
      locationLabels: function (){
        var ret = [];
        for (var label in this.columnLabels){
          var value = this.columnLabels[label]
          if (value == 'loc_district' || value == 'loc_state' || value == 'loc_village' || value == 'loc_country'){
            ret.push(label)
          }
        }
        return ret;
      },
      dataLabels: function (){
        var ret = [];
        for(var label in this.columnLabels){
          var value = this.columnLabels[label]
          if(value == 'data_num'){
            ret.push(label);
          }
        }
        return ret;
      }
    },
    
    methods: {
      closeDialog() {
        this.dialog = false;
        this.stepIndex = 1;
      },
      custimizeMap(){
        console.log("Called custimize Map")
        this.dialog = false;
        if(this.dataCol2 == 'N/A'){
          this.dataCol2 = -1;
        }
        this.$emit('updateMap', this.locationCol, this.dataCol1, this.dataCol2);
        this.stepIndex = 1;
      }
    }
}
</script>

<style>

</style>