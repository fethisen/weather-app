const form = document.querySelector('form'); // form tag
const detail = document.querySelector('.detail');
const card = document.querySelector('.card');

/* <img src="https://via.placeholder.com/400x300" class="time card-img-top"> */
const timePict = document.querySelector('img.time');

{/* <div class="icon bg-light mx-auto text-center">
                <img src="" alt="">
            </div> */}

const icon = document.querySelector('.icon img');

 const UpdateUI=(data)=>{
    //  const cityDetail=data.cityDetail;
    //  const weather=data.weather;

     const {cityDetail,weather} = data;

     detail.innerHTML=`
            <div class="text-muted text-uppercase text-center detail">
                <h5 class="my-3">${cityDetail.LocalizedName} </h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
            </div>
     `;
     const iconSrc=`/img/icons/${weather.WeatherIcon}.svg`;
     icon.setAttribute('src',iconSrc);

    //  let timeSrc = null;
    //  if(weather.IsDayTime){
    //      timeSrc='/img/day.svg';
    //  }else{
    //      timeSrc = '/img/night.svg';
    //  }

    let timeSrc = weather.IsDayTime?'/img/day.svg':'/img/night.svg';
     timePict.setAttribute('src',timeSrc);

     if(card.classList.contains('d-none')){
         card.classList.remove('d-none');
     }
 }

form.addEventListener('submit',(e)=>{
    e.preventDefault(); // stop default feature
    const city = form.city.value.trim();
    updateCity(city).then(data=>{
        UpdateUI(data);
    })

    form.reset();
    localStorage.setItem('city',city);
});

const updateCity= async (city)=>{
    const cityDetail=await bringCity(city);
    const weather = await bringWeather(cityDetail.Key);
    return {
        cityDetail:cityDetail,
        weather:weather
    }
};

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data=>{
        UpdateUI(data);
    });
}