<template>
  <div class="loading">
    <span class="loader"></span>
    </div>
</template>

<script>
export default {
  name: "Loading",
}
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.7);
    z-index: 101;
    width: 100%;
    height: 100%;

    .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
  }
</style>