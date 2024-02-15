/* HTML den aktarılanlar */

const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

/* btn' i izleme */
btn.addEventListener("click", () => {
  console.log(cityInput.value);

  getData(cityInput.value);
});

function getData(name) {
  // console.log(name)

  // apı key tanımlama
  const API = "b95da5aea27542aa5eeba0189b300a1b";
  // baseURL tanımlama
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr`;

  console.log(baseURL);

  // fetch ile promise döndür ve json a cevir

  fetch(baseURL)
    .then((res) => res.json()) // basarılı ise verileri getir
    .then((data) => {
      const {
        name,
        sys: { country },
        main: { temp, feels_like, humidity },
        wind: { speed },
        weather: [{ description }],
      } = data;
      //   console.log(name, country, temp °, feels_like, description, humidity %, speed km/s)

      // verileri js' cekme
      const city = document.querySelector("#sehir");
      const temperature = document.querySelector("#sicaklik");
      const weatherDesc = document.querySelector("#havaDurumu");
      const feel = document.querySelector("#hissedilen");
      const hum = document.querySelector("#humidity");
      const wind = document.querySelector("#wind");
      console.log(city, temperature, weatherDesc, feel, hum, wind);

      // js' e cekılen elemanları html elemanları yerine yerlestırme
      city.textContent = `${name}, ${country}`;
      temperature.innerText = `${temp.toFixed(1)} °`;
      hum.textContent = `Nem : %${humidity}`;
      wind.innerText = `Rüzgar : ${speed} km/s`;
      weatherDesc.innerHTML = `Hava Durumu : ${description}`;
      feel.innerHTML = `Hissedilen Sıcaklık : ${feels_like} °`;
    })
    .catch((err) => console.log(err)); // basarısız ise error ver

  cityInput.value = "";
  cityInput.focus();
}
