const WeatherInfoContainer= document.querySelector(".Weather-info-container");
const form= document.getElementById("f1");
const MessageDisplay= document.querySelector(".Message");
const inputData= document.getElementById("input_city_name");

const API_KEY="9ed77c49ebaad449085c02fb3b0979eb";
const API_url=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;



const cityNameID=document.getElementById("cityName");
const CurrentTimeID=document.getElementById("CurrentTime");

const TempreatureID=document.getElementById("Tempreature");
const DescriptionID=document.getElementById("Description");

const windID=document.getElementById("wind");
const humidityID=document.getElementById("humidity");


const weather_iconID=document.getElementById("weather-icon");



let inputValue=""

async function display(){

   inputValue=inputData.value.trim();

        if(!inputValue){
                MessageDisplay.innerHTML=`
                        <p>you can't left blank Please try again with Valid City name.</p>
                `
                 MessageDisplay.style.display="flex"
                return

            }


  
   try{

        const response= await fetch(API_url + inputValue + `&appid=${API_KEY}`);
        const data= await response.json();




 console.log(data);

    cityNameID.innerHTML=data.name;
  

    TempreatureID.innerHTML=Math.round(data.main.temp) + "°C";
    DescriptionID.innerHTML= data.weather[0].description;

    windID.innerHTML= data.wind.speed + "km"
    humidityID.innerHTML= data.main.humidity +"%"


   switch(data.weather[0].main){
    case "Clouds":
               weather_iconID.src="images/clouds.png";
               break;
        case "Drizzle":
                weather_iconID.src="images/drizzle.png";
                break; 
        case "Rain":
                weather_iconID.src="images/rainy-day.png";
                break; 
        case "Mist":
                weather_iconID.src="images/cloudy.png";
                break; 
        case "Snow":
                weather_iconID.src="images/snow.png";
                break; 
    case "Clear":
                weather_iconID.src="images/sunny.png";
                break;
   }

   WeatherInfoContainer.style.display="flex";
      MessageDisplay.style.display="none"
}
   catch (error) {
        console.error("Error fetching Data:", error);
        WeatherInfoContainer.style.display="none";
        MessageDisplay.style.display="flex"
    }

}



form.addEventListener("submit", (event)=>{
    event.preventDefault();
    display();
  
});


function currenTime(){
    const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

CurrentTimeID.innerHTML=`${hours}:${minutes}`
}
//call by default
currenTime();

