
    var searchBtn=document.getElementById("search-button");
    console.log(searchBtn);
    searchBtn.addEventListener("click",weatherdata);
    async function weatherdata(){

        try{
            var APIkey="ad305fc6c972ffbb1974d9e18a6ef8a9";
        var city=document.getElementById("search-input").value;
        var response=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`);
        console.log(response);
        var data=await response.json();
        console.log(data);
        weatherDisplay(data);
        }
        catch (e){
            var weatherData=document.getElementById("weatherData");
            weatherData.innerHTML="";
            var x=`<p> Please search for another city</p>`
            weatherData.innerHTML+=x;
        };

    }
    function weatherDisplay(data)
    {
        var weatherData=document.getElementById("weatherData");
        weatherData.innerHTML="";
        var date=document.createElement("p");
        date.setAttribute("class","date");
        var datee = new Date();
        // console.log("Current date: " + datee);
        date.textContent=datee;
        weatherData.append(date);
        var x=`<h2 id="City-country">${data.city.name},${data.city.country}</h2>`
        weatherData.innerHTML+=x;
        var img=document.createElement("div");
        img.setAttribute("class","img-c");
        var y=`<i class="fa-solid fa-cloud-sun-rain img-rain"></i>
                <h1>${Math.floor((data.list[0].main.temp-273.15))}&deg;C</h1>`;
        img.innerHTML+=y;
        var x=document.getElementById("degreeC");
        x.textContent=Math.floor((data.list[0].main.temp-273.15));
        var y=document.getElementById("degreeF");
        y.textContent=Math.floor(((data.list[0].main.temp-273.15)*1.8)+32);
        weatherData.append(img);
        var z=`<h3>Feels like ${Math.floor((data.list[0].main.feels_like-273.15))}&deg;C. Scattered ${data.list[0].weather[0].main}. Like ${data.list[0].weather[0].description}. </h3>`;
        weatherData.innerHTML+=z;
        var mainDiv=document.createElement("div");
        mainDiv.setAttribute("class","div");
        var div1=document.createElement("div1");
        div1.setAttribute("class","div1");
        var x1=`<i class="fa-solid fa-location-arrow"></i>
                <p>${data.list[0].wind.speed}WNW</p>`;
        var x2=`<i class="fa-brands fa-wpressr"></i>
                <p>${data.list[0].main.pressure}Pa</p>`;
        div1.innerHTML+=x1+x2;
        var div2=document.createElement("div2");
        div2.setAttribute("class","div2");
        var x3=`<p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>UV:4</p>`
        div2.innerHTML+=x3;
        var div3=document.createElement("div3");
        div3.setAttribute("class","div3");
        var x4=`<p>Dew Point: 13&deg;C</p>
        <p>Visibility: ${data.list[0].visibility/1000}km</p>`
        div3.innerHTML+=x4;
        mainDiv.append(div1,div2,div3);
        weatherData.append(mainDiv);

        // //map
        var map=document.getElementById("map");
        // map.innerHTML="";
        var m1=`<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas"
             src="https://maps.google.com/maps?q=${data.city.name},${data.city.country}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.embedgooglemap.net/blog/divi-discount-code-elegant-themes-coupon/"></a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net">adding google map to wordpress</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>`
        map.innerHTML=m1;

        //forecast
        var forecast=document.getElementById("forecast");
        var day=datee.getDay();
        console.log(day);
        forecast.innerHTML="";
        for(var i=0;i<5;i++)
        {
            
            var div=document.createElement("div");
            if(i==0)
            {
                div.setAttribute("class","colorDiv");
            }
            var dayy=call((+day)+i);
            let x=`<p>${dayy}</p>`;
            let y=["fa-solid fa-cloud-showers-heavy","fa-solid fa-cloud-sun","fa-solid fa-cloud-rain","fa-solid fa-cloud","fa-solid fa-cloud-sun-rain"];
            let y1=`<i class="${y[i]}"></i>`;
            let z=`
            <p>${Math.floor((data.list[i*8].main.temp_min-273.15))}&deg;</p>
            <p>${Math.floor((data.list[i*8].main.temp_max-273.15))}&deg;</p>`
            div.innerHTML+=x+y1+z;
            forecast.appendChild(div);
        }
        forecast.style.backgroundColor="#1c1c1c";
        forecast.style.border="1px"
    }

    function call(day)
    {
        console.log(day);
        day=day%7;
        if (day==0 || day==7)
        {
            return "Sun";
        }
        else if(day==1) return "Mon";
        else if(day==2) return "Tue";
        else if(day==3) return "Wed";
        else if(day==4) return "Thu";
        else if(day==5) return "Fri";
        else if(day==6) return "Sat";
    }


    //Geo-Location
    const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
var crd;
function success(pos) {
  crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
window.addEventListener("load", (event) => {

    weatherGeo();
    async function weatherGeo(){

try{
    
    var APIkey="ad305fc6c972ffbb1974d9e18a6ef8a9";
var city=document.getElementById("search-input").value;
var response=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${crd.latitude}&lon=${crd.longitude}&appid=${APIkey}`);
console.log(response);
var data=await response.json();
console.log(data);
weatherDisplay(data);
}
catch (e){
    var weatherData=document.getElementById("weatherData");
    weatherData.innerHTML="";
    var x=`<p> Please search for another city</p>`
    weatherData.innerHTML+=x;
};

}

});


