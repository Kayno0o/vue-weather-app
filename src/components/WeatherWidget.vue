<template>
  <div class="card weather-widget">
    <h2>{{ weather.name }}, {{ weather.country }}</h2>
    <p>
      Feels like <b>{{ weather.feelsLike }}°C</b>
    </p>
    <div class="temp-circle">{{ weather.temp }}°C</div>
    <p>{{ weather.description }}</p>
    <div class="info">
      <div>
        <p>
          <font-awesome-icon icon="fa-solid fa-droplet" />
          {{ weather.humidity }}%
        </p>
      </div>
      <div>
        <p>
          <font-awesome-icon icon="fa-solid fa-wind" /> {{ weather.wind }} km/h
        </p>
      </div>
    </div>
    <div class="delete">
      <font-awesome-icon icon="fa-solid fa-trash" @click="deleteCity" />
    </div>
    <div class="update">
      <font-awesome-icon icon="fa-solid fa-sync" @click="updateCity" />
    </div>
  </div>
</template>

<script>
import { firstUpperCase, nbAfterComma } from "./utils.js";

export default {
  name: "WeatherWidget",
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      weather: {
        name: "",
        country: "",
        temp: 0,
        description: "",
        feelsLike: 0,
        humidity: 0,
        wind: 0,
      },
    };
  },
  created() {
    this.fetchWeather();
  },
  methods: {
    fetchWeather() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city.name}&appid=${process.env.VUE_APP_OPENWEATHERAPI_TOKEN}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          this.weather.name = data.name;
          this.weather.country = data.sys.country;
          this.weather.temp = nbAfterComma(data.main.temp, 1);
          this.weather.description = firstUpperCase(
            data.weather[0].description
          );
          this.weather.feelsLike = nbAfterComma(data.main.feels_like, 1);
          this.weather.humidity = data.main.humidity;
          this.weather.wind = nbAfterComma(data.wind.speed, 1);
        });
    },
    deleteCity() {
      this.$emit("delete", this.city.id);
    },
    updateCity() {
      this.fetchWeather();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color: #486a8d;
}

p,
h2 {
  margin: 0;
}

.weather-widget {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.temp-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.4);
  color: #486a8d;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
}

.delete,
.update {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #486a8d;
  transition: color 0.2s ease-in-out;
}

.delete:hover {
  color: rgb(177, 42, 60);
}

.update {
  left: 10px;
  right: unset;
}

.update:hover {
  color: rgb(42, 177, 60);
}
</style>
