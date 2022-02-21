<template>
  <div class="timer">
    Осталось секунд:
    <p class="timer__count">{{ seconds }}</p>
  </div>
</template>

<script>
export default {
  props: {
    seconds: Number,
  },
};
</script>

<style scoped lang="scss">
.timer {
  text-align: center;
  font-family: sans-serif;
}</style
>>
