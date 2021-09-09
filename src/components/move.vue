<template>
  <div class="move">
    <div :class="people" @mousedown="templateDown"></div>
    <div class="lines">
      <span
        v-for="(item, index) in lines"
        :key="index"
        :class="item.name"
      ></span
      ><!--
        :style="{ visibility: item.isShow }"
        -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "move",
  props: ["dataId"],
  data() {
    return {
      imgX: "",
      imgY: "",
      mouseX: "",
      mouseY: "",
      currentX: "",
      isDown: false,
      linesPoint: [{ left: "" }, { top: "" }, { width: "" }, { height: "" }],
      lines: [
        { name: "horizontal-top", x: "", y: "", isShow: false, id: "ht" },
        { name: "vertical-top", x: "", y: "", isShow: false, id: "ht" },
        { name: "horizontal-center", x: "", y: "", isShow: false, id: "ht" },
        { name: "vertical-center", x: "", y: "", isShow: false, id: "ht" },
        { name: "horizontal-bottom", x: "", y: "", isShow: false, id: "ht" },
        { name: "vertical-bottom", x: "", y: "", isShow: false, id: "ht" }
      ],
      currentMousePosition: {
        x: "",
        y: ""
      }
    };
  },
  computed: {
    ...mapState({
      isHorizontalTopSame: state => state.isHorizontalTopSame,
      isHorizontalBottomSame: state => state.isHorizontalBottomSame,
      isHorizontalCenterSame: state => state.isHorizontalCenterSame,
      isVerticalTopSame: state => state.isVerticalTopSame,
      isVerticalBottomSame: state => state.isVerticalBottomSame,
      isVerticalCenterSame: state => state.isVerticalCenterSame,
      isHorizontalNear: state => state.isHorizontalNear,
      nearleft: state => state.left
    }),
    people() {
      return "people-" + this.dataId;
    }
  },
  methods: {
    ...mapMutations(["setPoints", "isSame"]),
    templateDown(e) {
      e.preventDefault();
      const div = document.getElementsByClassName(`${this.people}`)[0];
      div.classList.add("active");
      this.imgX = div.offsetLeft;
      this.imgY = div.offsetTop;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isDown = true;
      this.linesPoint[0].left = e.target.x;
      this.linesPoint[0].top = e.target.y;
      this.linesPoint[0].width = div.clientWidth;
      this.linesPoint[0].height = div.clientHeight;
      this.currentMousePosition = {
        x: this.mouseX,
        y: this.mouseY
      };
      window.addEventListener("mousemove", this.templateMove);
      console.log("鼠标按下", e, div.offsetTop, this.imgY);
    },
    templateMove(e) {
      if (this.isDown) {
        const div = document.getElementsByClassName(`${this.people}`)[0];
        let direction = {
          horizontal: "",
          vertical: ""
        };
        if (this.currentMousePosition.x - e.clientX > 0) {
          direction.horizontal = "left";
        } else if (this.currentMousePosition.x - e.clientX < 0) {
          direction.horizontal = "right";
        }
        if (this.currentMousePosition.y - e.clientY > 0) {
          direction.vertical = "top";
        } else {
          direction.vertical = "bottom";
        }
        const ht = document.getElementsByClassName("horizontal-top")[0];
        const hc = document.getElementsByClassName("horizontal-center")[0];
        const hb = document.getElementsByClassName("horizontal-bottom")[0];
        const vt = document.getElementsByClassName("vertical-top")[0];
        const vc = document.getElementsByClassName("vertical-center")[0];
        const vb = document.getElementsByClassName("vertical-bottom")[0];
        const leftLength = e.clientX + this.imgX - this.mouseX;
        const topLength = e.clientY + this.imgY - this.mouseY;
        div.style.left = leftLength + "px";
        div.style.top = topLength + "px";
        ht.style.top = topLength + "px";
        hc.style.top = topLength + div.clientHeight / 2 + "px";
        hb.style.top = topLength + div.clientHeight + "px";
        vt.style.left = leftLength + "px";
        vc.style.left = leftLength + div.clientWidth / 2 + "px";
        vb.style.left = leftLength + div.clientWidth + "px";
        const value = {
          direction,
          leftLength,
          topLength,
          width: div.clientWidth,
          height: div.clientHeight,
          id: this.people
        }
        this.isSame(value);

        if (
          this.isHorizontalCenterSame &&
          this.isHorizontalTopSame &&
          this.isHorizontalBottomSame
        ) {
          ht.style.visibility = "visible";
          hb.style.visibility = "visible";
        } else {
          if (this.isHorizontalTopSame) {
            ht.style.visibility = "visible";
          } else {
            ht.style.visibility = "hidden";
          }
          if (this.isHorizontalBottomSame) {
            hb.style.visibility = "visible";
          } else {
            hb.style.visibility = "hidden";
          }
          if (this.isHorizontalCenterSame) {
            hc.style.visibility = "visible";
          } else {
            hc.style.visibility = "hidden";
          }
        }

        if (
          this.isVerticalTopSame &&
          this.isVerticalCenterSame &&
          this.isVerticalBottomSame
        ) {
          vt.style.visibility = "visible";
          vb.style.visibility = "visible";
        } else {
          if (this.isVerticalTopSame) {
            vt.style.visibility = "visible";
          } else {
            vt.style.visibility = "hidden";
          }
          if (this.isVerticalBottomSame) {
            vb.style.visibility = "visible";
          } else {
            vb.style.visibility = "hidden";
          }
          if (this.isVerticalCenterSame) {
            vc.style.visibility = "visible";
          } else {
            vc.style.visibility = "hidden";
          }
        }
        this.currentMousePosition = {
          x: e.clientX,
          y: e.clientY
        };
        // this.$parent.isSho12w = true;
        window.addEventListener("mouseup", this.templateUp);
      }
    },
    templateUp(e) {
      this.isDown = false;
      window.removeEventListener("mousemove", this.templateMove);
      window.removeEventListener("mouseup", this.templateUp);
      const div = document.getElementsByClassName(`${this.people}`)[0];
      if (this.isHorizontalNear) {
        div.style.left = this.nearleft + "px";
      }
      const pointValue = {
        left: parseInt(div.style.left),
        top: parseInt(div.style.top),
        width: parseInt(div.clientWidth),
        height: parseInt(div.clientHeight),
        id: this.people
      };
      this.setPoints(pointValue);
      console.log("鼠标松开");
    }
  }
};
</script>

<style lang="scss" scoped>
.move {
  // position: relative;
  // width: 100%;
  // height: 100%;
  [class^="people-"] {
    position: absolute;
    width: auto;
    height: auto;
    border: 1px dashed transparent;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      border: 1px dashed;
    }
  }
  .active {
    border: 1px dashed !important;
  }
  .lines {
    visibility: hidden;
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
}
</style>
