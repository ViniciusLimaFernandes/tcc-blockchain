<template>
  <v-dialog v-model="dialog">
    <v-card width="110vh" height="50vh" style="overflow: hidden">
      <v-row>
        <v-col width="50vh">
          <img id="form-image" src="../assets/green-energy.jpg" />
        </v-col>

        <v-col class="form-inputs">
          <v-card-title class="text grey lighten-2">
            Adicione um novo hub
          </v-card-title>
          <v-divider />
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row style="margin-top: 3px">
              <v-col cols="1" sm="11">
                <v-text-field
                  variant="underlined"
                  label="Nome *"
                  hint="O nome do seu dispositivo"
                  counter="25"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" sm="11">
                <v-text-field
                  variant="underlined"
                  label="KWh em R$ *"
                  hint="Preço do KWh em R$"
                  v-model="price"
                  counter="4"
                  :rules="priceRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" sm="3">
                <v-text-field
                  variant="underlined"
                  type="number"
                  label="Portas *"
                  hint="A quantidade total de portas que seu dispositivo possui"
                  min="1"
                  max="4"
                  v-model="ports"
                  :rules="portRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <v-card-actions id="card-actions">
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog"> close </v-btn>
            <v-btn color="primary" :disabled="!valid" text @click="onSave">
              save
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { createHub, getAllHubs } from "../scripts/solana";
</script>

<script>
export default {
  name: "RegisterDevice",
  data() {
    return {
      valid: true,
      name: "",
      price: "",
      ports: "",
      nameRules: [
        (v) => !!v || "Campo obrigatorio",
        (v) => v.length <= 25 || "Esse campo deve ter menos que 25 caracteres",
      ],
      priceRules: [
        (v) => !!v || "Campo obrigatorio",
        (v) => v < 100 || "Use um preço adequado para a cobrança do KWh",
      ],
      portRules: [
        (v) => !!v || "Campo obrigatorio",
        (v) => (v > 0 && v <= 4) || "Seu dispositivo pode ter até 4 portas",
      ],
    };
  },
  props: {
    dialog: Boolean,
  },
  methods: {
    onSave() {
      this.$refs.form.validate();

      const priceInCents = this.price * 100;

      console.log(
        `saving a new hub with ${this.name}, ${priceInCents}, ${this.ports}`
      );
      createHub(this.name, priceInCents, this.ports);
      console.log(getAllHubs());
      this.$emit("closeDialog");
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped>
#form-image {
  width: 60vh;
  height: 50vh;
}

#card-actions {
  position: fixed;
  bottom: 0;
  right: 0;
}

.form-inputs {
  left: 350;
  width: 50vh;
}
</style>
