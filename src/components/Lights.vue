<template>
  <div class="lights">
    <div
      :class="'lights__light lights__light--red ' + getActiveClass('red')"
    ></div>
    <div
      :class="'lights__light lights__light--yellow ' + getActiveClass('yellow')"
    ></div>
    <div
      :class="'lights__light lights__light--green ' + getActiveClass('green')"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Lights",
  props: {
    activeLight: String,
    isFlashing: Boolean,
  },
  methods: {
    getActiveClass(color) {
      let className = this.activeLight == color ? "active" : "";
      if (className.length > 0) {
        className += this.isFlashing ? " flashing" : "";
      }
      return className;
    },
  },
};
</script>

<style scoped lang="scss">
.lights {
  background-color: #000;
  padding: 20px;
  border-radius: 18px;
  display: inline-block;
  &__light + &__light {
    margin-top: 20px;
  }
  &__light {
    border-radius: 100px;
    width: 100px;
    height: 100px;
    opacity: 0.3;
    &.active {
      opacity: 1;
    }
    &.flashing {
      animation-name: blinker;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(1, 0, 0, 1);
      animation-duration: 0.3s;
      -webkit-animation-name: blinker;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-timing-function: cubic-bezier(1, 0, 0, 1);
      -webkit-animation-duration: 0.3s;
    }
    @keyframes blinker {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    @-webkit-keyframes blinker {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    &--green {
      background-color: green;
    }
    &--yellow {
      background-color: yellow;
    }
    &--red {
      background-color: red;
    }
  }
}
</style>
