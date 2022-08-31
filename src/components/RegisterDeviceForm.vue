<template>
  <v-dialog v-model="dialog">
    <v-card width="700">
      <v-card-title class="text grey lighten-2">
        Create a new device
      </v-card-title>
      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Device name *"
              hint="Public name"
              counter="25"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Device code *"
              hint="Device UUID"
              counter="36"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="20">
            <v-text-field
              label="Another field *"
              hint="Device UUID"
              counter="36"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> save </v-btn>
        <v-btn color="primary" text @click="dialog = false"> close </v-btn>
      </v-card-actions>
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

<style scoped></style>
