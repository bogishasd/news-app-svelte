<div class="loader"></div>

<style scoped>
  .loader {
    animation: spin 1.5s ease infinite;
    border-top-color: #F9F9F9;
    border-left-color: #F9F9F9;
    border-right-color: #F9F9F9;
    border-bottom-color: #0095da;
    border-radius: 50%;
    border-style: solid;
    border-width: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 55px;
    width: 55px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
