
// First of all we have select a class or id , with the help of qS
const wrapper = document.querySelector(".wrapper"),
    inputpart = wrapper.querySelector(".input-part"),
    infoTxt = inputpart.querySelector(".info-txt"),
    inputField = inputpart.querySelector("input"),
    locationBtn = inputpart.querySelector("button"),
    wIcon = document.querySelector(".weather-part img");
arrowBack = wrapper.querySelector("header i");
// create a variable api
let api;


// then aEL , on enter button  
inputField.addEventListener("keyup", e => {
    // if user pressend enter button and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        // console.log("Abhishek")
        requestApi(inputField.value);
    }
});

// add EL for a geolocation, if we click on allow we get onsuccess or click block then we get onerror, else we got an alert
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {   // if browser support geolocation api 
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else {
        alert("Your browser is not supported geolocation api");
    }
});

// if we allow then we get our current location 

function onSuccess(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords; // getting lat and long of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${`4e5a6e66cbf26891a86d47d196f72d9c`}`;
    fetchData();
}

// else we get an error message from app 
function onError(error) {
    // console.log(error);
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

// that is the link  and api key of our wether forcast, fetch the data 
function requestApi(city) {
    // console.log(city);
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${`4e5a6e66cbf26891a86d47d196f72d9c`}`;
    fetchData();
}
// fetching the data we have getting a bellow msg 
function fetchData() {
    infoTxt.innerText = "Getting Weather Details....";
    infoTxt.classList.add("pending");
    // getting api responce and returnig it with passing into js obj and in onther
    // then function calling weatherdeatails fuction with passing api result as an argument
    fetch(api).then(responce => responce.json()).then(result => weatherDetails(result));
}

// printing the details
function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.innerText = `${inputField.value}  isn't a valid city name`
        infoTxt.classList.replace("pending", "error");
    }
    else {
        // lets get required properties value from the info obj
        const city = info.name;
        const country = info.sys.country;
        var { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;

        if (id = 800) {
            wIcon.src = "Weather icons/clear.svg";
            //    wIcon.src = "clear.gif"
        }
        else if (id >= 200 && id <= 232) {
            // wIcon.src =  "Weather icons/storm.svg";
            wIcon.src = "storm.gif"
        }
        else if (id >= 600 && id <= 632) {
            // wIcon.src =  "Weather icons/snow.svg";
            wIcon.src = "snow.gif"
        }
        else if (id >= 701 && id <= 781) {
            // wIcon.src =  "Weather icons/haze.svg";
            wIcon.src = "haze.gif"
        }
        else if (id >= 801 && id <= 804) {
            // wIcon.src =  "Weather icons/cloud.svg";
            wIcon.src = "cloud.gif"
        }
        else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            // wIcon.src =  "Weather icons/rain.svg";
            wIcon.src = "rain.gif";
        }

        // lets pass this value in a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".Weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");

})