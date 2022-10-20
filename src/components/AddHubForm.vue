<template>
  <v-alert type="success" v-if="successfullyCreatedHub" class="alert">
    Hub criado com sucesso</v-alert
  >
  <v-alert type="error" v-if="failedCreatingHub" class="alert">
    Falha ao criar o hub, verifique sua conexão e tente novamente mais
    tarde</v-alert
  >
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
  name: "AddHubForm",
  emits: ["closeDialog"],
  data() {
    return {
      valid: true,
      name: "",
      price: "",
      ports: "",
      successfullyCreatedHub: false,
      failedCreatingHub: false,
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

      try {
        const priceInCents = this.price * 100;

        console.log(
          `saving a new hub with ${this.name}, ${priceInCents}, ${this.ports}`
        );
        const tx = createHub(this.name, priceInCents, this.ports);
        if (tx) {
          this.successfullyCreatedHub = true;
        }

        console.log(getAllHubs());
      } catch (error) {
        this.failedCreatingHub = true;
      }
      this.$emit("closeDialog");
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },

  watch: {
    successfullyCreatedHub() {
      setTimeout(() => {
        this.successfullyCreatedHub = false;
      }, 5000);
    },
    failedCreatingHub() {
      setTimeout(() => {
        this.failedCreatingHub = false;
      }, 5000);
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

.alert {
  z-index: 99999999;
  width: fit-content;
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  animation: fadeinout 2s linear 1 forwards;
}
</style>
