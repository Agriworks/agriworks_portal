<template>
  <v-container>
    <section>
      <b-jumbotron color="#F0F0F0" dark fluid>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h2 class="display-3" align="center">About AgriWorks</h2>

              <p
                class="subheading"
                align="center"
              >Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</p>
            </v-flex>
          </v-layout>
        </v-container>
      </b-jumbotron>

      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="headline">Transform the Agricultural Landscape with Data</h2>
            <span
              class="subheading"
            >Agriworks enables researchers, policymakers, and common citizens to explore and act on agricultural data in an effort to better their local communities.</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large color="#96D34A">mdi-magnify</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Researchers</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large color="#96D34A">mdi-scale-balance</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Policy Makers</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large color="#96D34A">mdi-account-group</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Citizens</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
    <b-jumbotron height="75" color="#F0F0F0" dark fluid>
      <v-layout align-center>
        <v-flex>
          <h5 class="display-3" align="center">Our Team</h5>

          <p
            class="subheading"
            align="center"
          >Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</p>
        </v-flex>
      </v-layout>
    </b-jumbotron>
    <div class="row mt-6">
      <div class="col-md-6" id="Founder1">
        <v-card class="rounded-card" :elevation="30">
          <img class="card-img center" src="../assets/smile.jpg" align="middle" id="founder1" />
          <v-card-title>Name</v-card-title>
          <v-card-subtitle>Co-Founder</v-card-subtitle>
          <v-card-text>rumor has it he and batman have never been in the same room</v-card-text>
          <div class="card-body"></div>
        </v-card>
      </div>
      <div class="col-md-6" id="Founder2">
        <v-card class="rounded-card" :elevation="30">
          <img class="card-img center" src="../assets/smile.jpg" align="middle" id="founder1" />
          <v-card-title>Name</v-card-title>
          <v-card-subtitle>Co-Founder of Agri-works</v-card-subtitle>
          <v-card-text>this founder has a great passion lalala studied at Boston university to get his phd in coolness</v-card-text>
          <div class="card-body"></div>
        </v-card>
      </div>
    </div>
    <div class="row mt-6">
      <div class="col-sm-4" id="Underling1">
        <v-card class="rounded-card" :elevation="30">
          <img class="card-img center" src="../assets/smile.jpg" align="middle" id="founder1" />
          <v-card-title>Mdesilva</v-card-title>
          <v-card-subtitle>SoftwareLead</v-card-subtitle>
          <v-card-text>Men want to be him, Women want to be with him. What more can we say?</v-card-text>
          <div class="card-body"></div>
        </v-card>
      </div>
      <div class="col-sm-4" id="Underling2">
        <v-card class="rounded-card" :elevation="30">
          <img class="card-img center" src="../assets/smile.jpg" align="middle" id="founder1" />
          <v-card-title>Name</v-card-title>
          <v-card-subtitle>Co-Founder of Agri-works</v-card-subtitle>
          <v-card-text>this founder has a great passion lalala studied at Boston university to get his phd in coolness</v-card-text>
          <div class="card-body"></div>
        </v-card>
      </div>
      <div class="col-sm-4" id="Underling3">
        <v-card class="rounded-card" :elevation="30">
          <img class="card-img center" src="../assets/smile.jpg" align="middle" id="founder1" />
          <v-card-title>Name</v-card-title>
          <v-card-subtitle>Co-Founder of Agri-works</v-card-subtitle>
          <v-card-text>this founder has a great passion lalala studied at Boston university to get his phd in coolness</v-card-text>
          <div class="card-body"></div>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
</script>
