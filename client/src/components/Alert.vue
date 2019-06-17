<template>
  <v-alert type="error" dismissible @input="onClose" :value="true">
    <h4>{{text}}</h4>
  </v-alert>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>