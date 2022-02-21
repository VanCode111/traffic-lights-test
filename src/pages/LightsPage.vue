<template>
  <div class="lights-page">
    <Lights :activeLight="setActiveLight" :isFlashing="timer < 3" />
    <Timer :seconds="timer" />
  </div>
</template>

<script>
import Lights from "../components/Lights.vue";
import Timer from "../components/Timer.vue";
export default {
  components: { Lights, Timer },
  name: "LightsPage",
  mounted() {
    const lightName = this.$route.params.lightName;
    document.title = lightName;
    this.lights.forEach(({ light }, index) => {
      if (light == lightName) {
        this.activeLightIndex = index;
      }
    });
    console.log(localStorage.getItem('direction'));
    this.direction = +localStorage.getItem('direction') || 1;
    this.saveLight();
    this.startLights();
  },
  watch: {
    $route() {
      document.title = this.$route.params.lightName;
      this.startLights();
      this.saveLight();
    },
    timer() {
      if (this.timer > 0) {
        localStorage.setItem(
          "timer",
          JSON.stringify([this.timer, this.activeLightIndex])
        );
      }
    },
  },
  computed: {
    setActiveLight() {
      return this.$route.params.lightName;
    },
  },
  methods: {
    saveLight() {
      localStorage.setItem(
        "light",
        JSON.stringify(this.lights[this.activeLightIndex].light)
      );
    },
    async startLights() {
      const activeLight = this.lights[this.activeLightIndex];
      await this.activateLight(activeLight);
      if (this.activeLightIndex == this.lights.length - 1) {
        this.direction = -1;
      } else if (this.activeLightIndex == 0) {
        this.direction = 1;
      }
      this.saveToLocalStorage('direction', this.direction);
      this.activeLightIndex += this.direction;
      console.log(this.activeLightIndex);
      this.$router.push({
        path: `/${this.lights[this.activeLightIndex].light}`,
      });
    },
    saveToLocalStorage(name, value) {
      localStorage.setItem(
          name,
          value
        );
    },
    activateLight(light) {
      const { duration } = light;
      const promise = new Promise((resolve) => {
        const savedTime = JSON.parse(localStorage.getItem("timer"));
        if (savedTime && savedTime[1] == this.activeLightIndex) {
          this.timer = +savedTime[0];
        } else {
          this.timer = duration;
        }
        let interval = setInterval(() => {
          this.timer--;
          if (this.timer <= 0) {
            clearInterval(interval);
            resolve();
          }
        }, 1000);
      });
      return promise;
    },
  },
  data: () => {
    return {
      timer: 0,
      activeLightIndex: 0,
      direction: 1,
      lights: [
        {
          light: "red",
          duration: 10,
        },
        {
          light: "yellow",
          duration: 3,
        },
        {
          light: "green",
          duration: 15,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.lights-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
