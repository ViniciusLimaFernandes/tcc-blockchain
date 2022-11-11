<template>
  <v-alert type="success" v-if="successfullyUsedHub" class="alert">
    Tudo pronto! Utilize o dispositivo na porta escolhida</v-alert
  >
  <v-alert type="error" v-if="failedUsingHub" class="alert">
    Falha ao utilizar o hub, verifique sua conexão e tente novamente mais
    tarde</v-alert
  >
  <v-dialog v-model="useHubDialog">
    <v-card width="110vh" height="50vh" style="overflow: hidden">
      <v-row>
        <v-col width="50vh">
          <img id="form-image" src="../assets/working-3d.png" />
        </v-col>

        <v-col class="form-inputs">
          <v-card-title class="text grey lighten-2"
            >Falta pouco! Conte-nos sobre o seu consumo...
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row style="margin-top: 3px">
              <v-col cols="1" sm="11">
                <v-text-field
                  variant="underlined"
                  label="KWh a ser consumido *"
                  hint="Digite a quantidade de KWh que deseja consumir"
                  oninput="if(this.value < 0) this.value = 1;"
                  v-model="KWh"
                  :rules="kwhRules"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <v-card-actions id="card-actions">
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog"> cancel </v-btn>
            <v-btn color="primary" :disabled="!valid" text @click="onContinue">
              continue
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useHub } from "../scripts/solana";
import { createAdhesion, Adhesion } from "../scripts/mongo";
import { publishAdhesion } from "../scripts/pubsub";
</script>

<script>
export default {
  name: "UseHubForm",
  emits: ["closeUseHubDialog", "updateHubs"],
  data() {
    return {
      valid: true,
      KWh: 0,
      successfullyUsedHub: false,
      failedUsingHub: false,
      kwhRules: [(v) => !!v || "Campo obrigatorio"],
    };
  },
  props: {
    pubKey: Object,
    kwhPrice: Number,
    useHubDialog: Boolean,
    hubID: String,
    hubOwner: String,
    port: Number,
  },
  methods: {
    onContinue() {
      console.log(`use hub called... `);
      this.$refs.form.validate();

      try {
        const priceInCents = this.kwhPrice * 100;

        console.log(
          `using hub with pubkey:${this.pubKey}, kwhPrice:${priceInCents}, kwh:${this.KWh}`
        );

        useHub(this.KWh, this.kwhPrice, this.pubKey).then((tx) => {
          const adhesion = new Adhesion(
            this.hubID,
            this.hubOwner,
            this.port,
            0,
            this.KWh,
            true
          );

          createAdhesion(adhesion);
          publishAdhesion(adhesion);
          this.$emit("updateHubs");
          this.successfullyUsedHub = true;
        });
      } catch (error) {
        console.log(error);
        this.failedUsingHub = true;
      }
      this.$emit("closeUseHubDialog");
    },
    closeDialog() {
      this.$emit("closeUseHubDialog");
    },
  },

  watch: {
    successfullyUsedHub() {
      setTimeout(() => {
        this.successfullyUsedHub = false;
      }, 5000);
    },
    failedUsingHub() {
      setTimeout(() => {
        this.failedUsingHub = false;
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
