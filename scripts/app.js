const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {

    //const cityDetail = data.cityDetail;
    //const weather = data.weather;

    //destructure properties
    const {cityDetail, weather} = data;

    //update 
    details.innerHTML = `
    <h5 class="my-3">${cityDetail.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;


    //update the day/night and icon image
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    /*
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else{
        timeSrc = 'img/night.svg'
    }
    */
    const timeSrc = weather.IsDayTime?  'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSrc);

    //remove d-none class
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };
};

const updateCity = async (city) => {
    
    const cityDetail = await getCity(city);
    const weather = await getWeather(cityDetail.Key);
    return {cityDetail, weather }
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with the new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
};

