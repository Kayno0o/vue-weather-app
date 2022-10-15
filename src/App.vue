<template>
  <div v-for="city in cities" :key="city.id">
    <WeatherWidget :city="city" @delete="deleteCity" />
  </div>
  <!-- add button with city name input -->
  <form class="card add-city">
    <input type="text" placeholder="City name" v-model="cityName" />
    <button type="submit" @click.prevent="addCity">Add</button>
  </form>
</template>

<script>
import WeatherWidget from "./components/WeatherWidget.vue";

export default {
  name: "App",
  components: {
    WeatherWidget,
  },
  data() {
    return {
      cities: [
        {
          id: 1,
          name: "London",
        },
        {
          id: 2,
          name: "Paris",
        },
        {
          id: 3,
          name: "Berlin",
        },
      ],
      cityName: "",
    };
  },
  methods: {
    addCity() {
      this.cities.push({
        id: this.cities.length + 1,
        name: this.cityName,
      });
      this.cityName = "";
    },
    deleteCity(id) {
      this.cities = this.cities.filter((city) => city.id !== id);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.card {
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.4);
}

.add-city {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: fit-content;
}

input,
button {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: transparent;
  transition: background 0.2s ease-in-out;
}

:is(input, button):hover,
:is(input, button):focus {
  background: #eef;
  outline: none;
}
</style>
