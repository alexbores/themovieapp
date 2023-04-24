<template>
    <div class="loaderHolder" v-if="loading === true">
      <div class="rotation">
        <svg class="loadSpinner" viewBox="0 0 50 50">
          <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="2"></circle>
        </svg>
      </div>
    </div>
</template>

<script>


export default {
  components: {
  },
  props:{
    loading: Boolean
  }
};
</script>


<style scoped>
.loaderHolder{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255,255,255,0.3);
  z-index: 99;
}
.rotation{
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  animation: rotate 2s linear infinite;
}
.loadSpinner{
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 120px;
  height: 120px;
}
.loadSpinner .path{
  stroke: var(--colorOk);
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

</style>