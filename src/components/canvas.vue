<template>
  <div class="canvas" id="canvas">
    <!-- <move dataId="people1">
      <img src="@/assets/jpg/people.jpg" alt="" />
    </move>
    <move dataId="logo">
      <img src="@/assets/logo.png" alt="" />
    </move> -->
  </div>
</template>

<script>
import Vue from "vue";
import Bus from "@/utils/bus.js";
import move from "./move.vue";
import written from "./written.vue";
import store from "../store/index";
import { mapState, mapMutations } from "vuex";
export default {
  name: "HelloWorld",
  components: {
    move,
    written
  },
  mounted() {
    Bus.$on("setElement", e => {
      this.addElement(e);
      // var p = document.createElement("div");
      // var text = document.createTextNode("21");
      // p.appendChild(text);
      // document.getElementsByClassName(`people-${name}`)[0].appendChild(p);
    });
  },
  data() {
    return {
      templateData: [
        {
          id: 0,
          url: "@/asstes/jpg/people.jpg"
        },
        {
          id: 1,
          url: "@/asstes/jpg/people.jpg"
        },
        {
          id: 2,
          url: "@/asstes/logo.png"
        }
      ]
    };
  },
  methods: {
    addElement(e) {
      let MyComponent;
      const name = `${e.value.value}-${e.date}`;
      if (e.value.id === 0) {
        MyComponent = Vue.extend({ ...written, store });
        const component = new MyComponent({
          propsData: {
            dataId: name
          },
          methods: {
            ...mapMutations(["setPoints", "isSame"])
          }
        }).$mount();
        document.getElementById("canvas").appendChild(component.$el);
      } else if (e.value.id === 3) {
        document.getElementById("canvas").innerHTML = "";
        return;
      } else if (e.value.id == 1) {
        MyComponent = Vue.extend({ ...move, store });
        const component = new MyComponent({
          propsData: {
            dataId: name
          },
          methods: {
            ...mapMutations(["setPoints", "isSame"])
          }
        }).$mount();
        document.getElementById("canvas").appendChild(component.$el);
        let imgURL = require("@/assets/jpg/people.jpg");
        document.getElementsByClassName(
          `people-${name}`
        )[0].innerHTML = `<img src="${imgURL}"></img>`;
      } else if (e.value.id == 2) {
        MyComponent = Vue.extend({ ...move, store });
        const component = new MyComponent({
          propsData: {
            dataId: name
          },
          methods: {
            ...mapMutations(["setPoints", "isSame"])
          }
        }).$mount();
        document.getElementById("canvas").appendChild(component.$el);
        let imgURL = require("@/assets/logo.png");
        document.getElementsByClassName(
          `people-${name}`
        )[0].innerHTML = `<img src="${imgURL}"></img>`;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.canvas {
  width: 1200px;
  height: 840px;
  border: 1px solid #eee;
  transform: translateX(50%);
  margin-top: 20px;
  position: relative;
}
</style>
