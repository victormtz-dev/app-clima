window.addEventListener("load", () => {
  let lon;
  let lat;
  const temperaturaValor = document.getElementById("temperatura-valor");
  const temperaturaDes = document.getElementById("temperatura-descripcion");
  const ubicacion = document.getElementById("ubicacion");
  const iconoAnimado = document.getElementById("icono-animado");
  const velocidad = document.getElementById("viento-velocidad");
  const apiKey = "41c50f516aba05fea6d48bb919551ef7";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

      const apiFetch  = async ()=> {
          try {

            const urlapi = await fetch(apiURL);
            const data = await urlapi.json();

            let temp =  Math.round(data.main.temp);
            temperaturaValor.textContent = `${temp} °C`;
  
            let desc = data.weather[0].description;
            temperaturaDes.textContent = desc.toUpperCase();
  
            ubicacion.textContent = data.name;
  
            velocidad.textContent = `${data.wind.speed} m/s`;
          
  
            switch (data.weather[0].main) {
              case "Thunderstorm":
                iconoAnimado.src = "animated/thunder.svg";
                break;
              case "Drizzle":
                iconoAnimado.src = "animated/rainy-2.svg";
  
                break;
              case "Rain":
                iconoAnimado.src = "animated/rainy-7.svg";
  
                break;
              case "Snow":
                iconoAnimado.src = "animated/snowy-6.svg";
  
                break;
              case "Clear":
                iconoAnimado.src = "animated/day.svg";
  
                break;
              case "Atmosphere":
                iconoAnimado.src = "animated/weather.svg";
  
                break;
              case "Clouds":
                iconoAnimado.src = "animated/cloudy-day-1.svg";
  
                break;
              default:
                iconoAnimado.src = "animated/cloudy-day-1.svg";
            }        
          } catch (error) {
              console.log(error);
          }

      }
      apiFetch();
    });
  }
});
