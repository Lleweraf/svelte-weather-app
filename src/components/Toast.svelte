<script>
  import { fly } from 'svelte/transition'
  import { quintInOut } from 'svelte/easing'

  export let errMessage
  export let hasError
</script>

<div class="toast" class:error={hasError} transition:fly={{ easing: quintInOut, y: 50, duration: 1000 }}>
  <small>{errMessage}</small>
</div>

<style>
  .toast {
    padding: 8px 15px;
    width: 40%;
    margin: auto;
    margin-top: 20px;
    border-radius: 5px;
    position: absolute;
    left: 30%;
  }

  .error {
    background-color: #ff003b;
  }

  @media (max-width: 480px) {
    .toast {
      width: 50%;
      left: 25%;
      top: 420px;
    }
  }
</style>
