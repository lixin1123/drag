<template>
  <div class="list">
    <div
      class="optionslist"
      v-for="(item, index) in options"
      :key="index"
      @click="setElement(index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import Bus from "@/utils/bus";
export default {
  name: "list",
  data() {
    return {
      color: "",
      options: [
        { name: "文字", value: "characters", id: 0 },
        {
          name: "人物",
          imgLink: "@/assets/jpg/people.jpg",
          value: "people",
          id: 1
        },
        { name: "logo", imgLink: "@/assets/logo.png", value: "logo", id: 2 },
        { name: "清屏", value: "clear", id: 3 }
      ]
    };
  },
  methods: {
    setElement(index) {
      const date = new Date().getTime();
      Bus.$emit("setElement", { value: this.options[index], date });
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 300px;
  height: 700px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  .optionslist {
    width: 80%;
    height: 100px;
    margin-top: 20px;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
