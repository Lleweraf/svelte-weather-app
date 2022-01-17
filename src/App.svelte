<script>
  import { APIKEY } from './APIKEY'
  import Toast from './components/Toast.svelte'
  import WeatherInfo from './components/WeatherInfo.svelte'
  import Spinner from './components/Spinner.svelte'

  let isLoading = false
  let hasError = false
  let errMessage = ''
  let inputCity = ''
  let weatherData

  $: APIString = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${APIKEY}`

  const getWeather = async () => {
    isLoading = true
    weatherData = null
    const res = await fetch(APIString)
    const jsonData = await res.json()
    //console.log(jsonData)

    if (res.ok) {
      isLoading = false
      hasError = false
      weatherData = jsonData
    } else {
      hasError = true
      isLoading = false
      errMessage = jsonData.message
    }
  }

  const loadingTrue = () => {
    isLoading = true
  }
</script>

<main>
  <div class="weather-container">
    <div class="weather-box" class:backdrop-blur={isLoading}>
      {#if isLoading}
        <div class="spinner-container">
          <Spinner />
        </div>
      {/if}

      {#if weatherData && !hasError && !isLoading}
        <WeatherInfo {weatherData} />
      {/if}
    </div>

    <div class="search-box">
      <form on:submit|preventDefault={getWeather}>
        <input type="text" placeholder="Enter your city" bind:value={inputCity} on:keydown={loadingTrue} />
      </form>
    </div>
  </div>

  {#if hasError && !isLoading}
    <Toast {errMessage} {hasError} />
  {/if}

  <div class="footer">
    <div class="left">
      <small><a href="https://github.com/Lleweraf/weather-app">Github Repo</a></small>
    </div>
    <div class="right">
      <small>Made with <a href="https://svelte.dev/">Svelte</a> </small>
    </div>
  </div>
</main>

<style>
  main {
    position: relative;
    text-align: center;
    margin: auto;
    max-width: 850px;
    height: 100%;
  }

  .weather-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #1b1d24;
    min-height: 300px;
    border-radius: 5px;
    overflow: hidden;
  }

  .weather-box {
    position: relative;
    flex-grow: 1;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .backdrop-blur::before {
    position: absolute;
    content: ' ';
    height: 100%;
    width: 100%;
    background-color: #000000a8;
    backdrop-filter: blur(2px);
  }

  .spinner-container {
    position: absolute;
  }

  .search-box form {
    display: flex;
  }

  input {
    width: 100%;
    margin: 0;
    border: none;
    padding: 10px 20px;
    color: #ababab;
    text-align: center;
  }

  input[type='text']:focus {
    outline: none;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .footer a {
    color: #ff3e00;
  }

  @media (max-width: 480px) {
    .weather-container {
      min-height: 550px;
    }
  }
</style>
