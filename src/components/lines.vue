<template>
  <div class="lines">
    <span v-for="(item, index) in lines" :key="index" :class="item.name"></span>
  </div>
</template>

<script>
export default {
  name: "lines",
  data() {
    return {
      lines: [
        { name: "horizontal-top", x: "", y: "" },
        { name: "vertical-top", x: "", y: "" },
        { name: "horizontal-center", x: "", y: "" },
        { name: "vertical-center", x: "", y: "" },
        { name: "horizontal-bottom", x: "", y: "" },
        { name: "vertical-bottom", x: "", y: "" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.lines {
  span:nth-child(odd) {
    border: 1px solid rgba(0, 183, 255, 0.151);
    width: 100%;
    position: absolute;
  }
  span:nth-child(even) {
    border: 1px solid rgba(0, 183, 255, 0.151);
    height: 100%;
    position: absolute;
  }
}
</style>
