const key = 'M8TzDt4HyMlgkvW6ve37siYM8zcXge54';

//get weather information
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

   const respone = await fetch(base + query);
   const data = await respone.json();
    
    return data[0];
};

//get city infomation
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const respone = await fetch(base + query);
    const data = await respone.json();

    return data[0];
};







