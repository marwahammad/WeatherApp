const displayWeatherBox = document.getElementById("weather-container");
const searchInput = document.getElementById("search-input");
const baseUrl = "https://api.weatherapi.com/v1";
const endPoint = "/forecast.json";
const key = "5ebe98550c4545fc9d5182434252904";
let numOfDays = 3;
const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "sunday",
];




/** input event */

searchInput.addEventListener("input", () => {
 let region = searchInput.value;
  displayData(region);
});

/*fetch data*/
const fetchApiData = async (baseUrl='',endPoint='',key='',inputValue='',days=0) => {
  try {
    const response = await fetch(
      `${baseUrl}${endPoint}?key=${key}&q=${inputValue}&days=${days}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
     console.log(error);
  }
};

/* display data */
const displayData = async (region) => {
  try {
    const apiData = await fetchApiData(baseUrl,endPoint,key,region,numOfDays);
    // console.log(apiData.forecast.forecastday);
    const days = apiData.forecast.forecastday;
    let dataBox = ``;
    let container = ``;
    days.forEach((day, index) => {
      const dateObj = new Date(day.date);
      const dayName = weekDays[dateObj.getDay()];
      if (index === 0) {
        dataBox = `<div class="part col-sm-12 col-md-4 p-5 part-bg-color">
              <div class="inner text-white">
                <div
                  class="forecast-header part-header-color p-3 d-flex justify-content-between"
                >
                  <span>${dayName}</span>
                  <span>${day.date}</span>
                </div>
                <div class="forecast-content p-3">
                  <div class="forecast-city">${apiData.location.name}</div>
                  <div
                    class="temp-degree d-flex justify-content-between align-items-center"
                  >
                    <span>${day.day.avgtemp_c} C</span>
                    <span><img src="${day.day.condition.icon}" alt="${day.day.condition.text}" /></span>
                  </div>
                  <div class="temp-status">${day.day.condition.text}</div>
                  <div class="temp-details d-flex gap-4">
                    <div class="percentage">
                      <img src="./assets/images/icon-umberella.png" alt="" />
                      <span>20%</span>
                    </div>
                    <div class="distance">
                      <img src="./assets/images/icon-compass.png" alt="" />
                      <span>18km/h</span>
                    </div>
                    <div class="direction">
                      <img src="./assets/images/icon-compass.png" alt="" />
                      <span>East</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
`;
      } else{
        dataBox = `
    
             <div class="part col-sm-12 col-md-4 p-5 part-second-bg-color">
              <div class="inner text-white text-center">
                <div
                  class="forecast-header part-second-header-color d-flex justify-content-center p-3"
                >
                  <span>${dayName}</span>
                </div>
                <div class="forecast-content p-3">
                  <div class="forecast-icon">
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
                  </div>
                  <div
                    class="temp-degree d-flex flex-column justify-content-center"
                  >
                    <span>${day.day.maxtemp_c} c</span>
                    <span>${day.day.mintemp_c} c</span>
                  </div>
                  <div class="temp-status">${day.day.condition.text}</div>
                </div>
              </div>
            </div>
    `;
      }
      container += dataBox;
    });
    displayWeatherBox.innerHTML = container;
  } catch (error) {
    console.log(error);
  }
};
