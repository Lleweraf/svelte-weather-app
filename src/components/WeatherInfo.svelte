<script>
  import { fly } from 'svelte/transition'
  import { quintInOut } from 'svelte/easing'
  import { getCityDate } from './DateFormatter'
  import { getTime } from './TimeFormatter'

  export let weatherData
  let weatherIcon
  let weather

  $: cityDate = getCityDate(weatherData.timezone)

  $: {
    weatherData.weather.forEach((element) => {
      weather = element.main
    })

    switch (weather) {
      case 'Clear':
        weatherIcon = 'sunny'
        break
      case 'Clouds':
        weatherIcon = 'cloudy'
        break
      case 'Snow':
        weatherIcon = 'snow'
        break
      case 'Fog':
        weatherIcon = 'fog'
        break
      case 'Rain':
        weatherIcon = 'sprinkle'
        break
      case 'Drizzle':
        weatherIcon = 'showers'
        break
      case 'Thunderstorm':
        weatherIcon = 'storm-showers'
        break
      default:
        weatherIcon = 'sunny'
        break
    }
  }
</script>

<div class="infos">
  <h1 transition:fly={{ easing: quintInOut, y: 20, duration: 900 }}>{Math.floor(weatherData.main.temp)}°</h1>
  <div class="city-info" transition:fly={{ easing: quintInOut, y: 20, duration: 900, delay: 200 }}>
    <h2 class="city-name">{weatherData.name}</h2>
    <small>
      {getTime(weatherData.timezone)} - {cityDate.day}, {cityDate.date}
      {cityDate.month} '{cityDate.year}
    </small>
  </div>

  <div class="weather" transition:fly={{ easing: quintInOut, y: 20, duration: 900, delay: 400 }}>
    <i class="wi wi-day-{weatherIcon}" />
    <small>{weather}</small>
  </div>
</div>

<style>
  .infos {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .city-info {
    margin: 0 50px;
  }

  h2.city-name {
    font-size: 50px;
    line-height: 1.3;
  }

  h1 {
    font-weight: 100;
    font-size: 100px;
  }

  .weather i {
    font-size: 60px;
    display: block;
    margin-bottom: 7px;
  }

  @media (max-width: 480px) {
    .infos {
      flex-direction: column;
      margin: 30px 0;
    }

    .city-info {
      margin: 20px 0 40px 0;
    }

    h1 {
      line-height: 1;
    }
  }
</style>
