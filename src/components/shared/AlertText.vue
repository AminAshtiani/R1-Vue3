<template>
  <div>
    <strong>{{ strongTitle }}</strong> {{ msg }}.
  </div>
</template>
<script>
export default {
  name: "AlertText",
  props: {
    strongTitle: String,
    msg: String,
  },
};
</script>
