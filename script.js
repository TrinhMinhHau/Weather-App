const searchEl = document.querySelector(".search");
const cityEl = document.querySelector(".city");
const countryEl = document.querySelector(".country");
const ValueTemparatureEl = document.querySelector(".value");
const shortDesEl = document.querySelector(".short-des");
const eyeEl = document.querySelector(".eye");
const windEl = document.querySelector(".wind");
const sunEl = document.querySelector(".sun");
const timeEl = document.querySelector(".time");
const contentEl = document.querySelector(".content");
const bodyEl = document.querySelector("body");
const weatherAppEl = document.querySelector(".weather-app");
contentEl.classList.add("hide");
async function changeWatherUi() {
  try {
    contentEl.classList.remove("hide");
    const cityName = searchEl.value.trim();
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4900ad4f8b3ee50f41c02faa5bdaee33`;
    let data = await fetch(Url).then((response) => response.json());
    cityEl.innerHTML = data.name;
    countryEl.innerHTML = data.sys.country;

    setInterval(() => {
      let time = new Date();
      timeEl.innerHTML = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()},${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
    }, 1000);
    const valueTemparature = (Number(data.main.temp) - 273.2).toFixed(0);
    ValueTemparatureEl.innerHTML =
      (Number(data.main.temp) - 273.2).toFixed(0) + `<sup>o</sup>C`;
    shortDesEl.innerHTML = data.weather[0] ? data.weather[0].main : "";
    windEl.innerHTML = data.wind.speed + `m/s`;
    eyeEl.innerHTML = data.visibility + `m`;
    sunEl.innerHTML = data.main.humidity + `%`;
    console.log(data.weather[0].main);
    console.log(valueTemparature);
    if (valueTemparature <= 20) {
      bodyEl.style.background =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(cold.png)";
      bodyEl.style.backgroundSize = "cover";
      weatherAppEl.style.background = "url(cold.png) center/cover";
    } else if (valueTemparature > 20 && valueTemparature <= 25) {
      bodyEl.style.background =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(spring.png)";
      bodyEl.style.backgroundSize = "cover";
      weatherAppEl.style.background = "url(spring.png) center/cover";
    } else if (valueTemparature > 25 && valueTemparature <= 30) {
      bodyEl.style.background =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(autumn.png)";
      bodyEl.style.backgroundSize = "cover";
      weatherAppEl.style.background = "url(autumn.png) center/cover";
    } else {
      bodyEl.style.background =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(summer.png)";
      bodyEl.style.backgroundSize = "cover";
      weatherAppEl.style.background = "url(summer.png) center/cover";
    }
  } catch (error) {
    searchEl.value = "An error occurred, please try again";
    contentEl.classList.add("hide");
    // alert("Error: " + error.message);
  }
}
searchEl.addEventListener("change", changeWatherUi);
