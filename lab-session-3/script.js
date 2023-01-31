const api = {
    key:"7e3f21edee540e6110af347b55eb1ab2",
    base:"https://api.openweathermap.org/data/2.5/"
}

var searchBox = document.getElementById("search-box");
searchBox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
    getResults(searchBox.value);
    }
}

function getResults(query){
    const url = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
    fetch(url)
    .then(weather => {
        return weather.json()
    }).then(response =>{
        console.log(response);
        displayResults(response);

    })
}
function displayResults(weather){
    
    //Display city and country
    let city = document.getElementById("city")
    city.innerText = `${weather.name},${weather.sys.country}`;
    //Display date and day
    let d = new Date();
    let date = document.getElementById("date");
    date.innerText = dateBuilder(d);
    //Display temp of each city
    let temp = document.getElementById("temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}°c`;
    //Display climate
    let climate = document.getElementById("climate");
    climate.innerText = weather.weather[0].main;
    // console.log(weather.weather[0].main)
    //Display max and min temp
    let maxmin = document.getElementById("max-min");
    maxmin.innerHTML = `${Math.round(weather.main.temp_max)}°c ${Math.round(weather.main.temp_min)}°c`; 
}

function dateBuilder(d){
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[d.getDay()];
let date = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear();
return `${day} ${date}  ${month} ${year}`;
}