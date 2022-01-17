const key = "hhgT32G1PAL4PqbGJXuRnkiyGyenVBeT";

const bringWeather = async(id)=>{
    const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;
    const res = await fetch(baseUrl+query);
    const data = await res.json();
    return data[0];
}

const bringCity = async(location)=>{
    const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${location}`;
    const res = await fetch(baseUrl+query);
    const data = await res.json();
    return data[0];
}


// bringCity('istanbul').then(data=>{
//     return bringWeather(data.Key);
// }).then(d=>{
//     console.log(d);
// })
// .catch(err=>{
//     console.log(err);
// });