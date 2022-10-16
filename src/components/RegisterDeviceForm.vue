<template>
  <v-dialog v-model="dialog">
    <v-card width="110vh" height="50vh" style="overflow: hidden">
      <v-row>
        <v-col width="50vh">
          <img id="form-image" src="../assets/green-energy.jpg" />
        </v-col>

        <v-col class="form-inputs">
          <v-card-title class="text grey lighten-2">
            Device information
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="1" sm="12">
                <v-text-field variant="underlined" label="Name *" hint="Display name" counter="25"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" sm="12">
                <v-text-field variant="underlined" label="KWh price *" hint="Your desired KWh price to be charged"
                  counter="25"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" sm="12">
                <v-text-field variant="underlined" label="Total ports *" hint="Total ports that your device have"
                  counter="36" required></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

 

          <v-card-actions id="card-actions">
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> close </v-btn>
            <v-btn color="primary" text @click="dialog = false"> save </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterDevice",
  props: {
    dialog: Boolean,
  },
};
</script>

<style scoped>



#form-image {
  width: 60vh;
  height: 50vh;
}

#card-actions{
  position: fixed;
  bottom: 0;
  right: 0;
}

.form-inputs {
  left: 350;
  width: 50vh;
}
</style>
