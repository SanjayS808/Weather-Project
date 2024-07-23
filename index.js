let c = 0;

document.querySelector('#Unit').addEventListener('click', () => {
    if (c == 0){
        c = 1;
    }
    else{
        c = 0;
        
    }
    render(c);
    
});
let weatherInfro = new Map();

const main = async(input) => { 
    
    
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&include=current&key=GTBRV9HWVFLJBMPD8S7R2339X&contentType=json`, {mode: 'cors' })
        const data = await response.json()
        const day  = data.days[0];

        const date = new Date(day.datetime);
        const currentTemp = day.temp;
        const maxTemp = day.tempmax;
        const minTemp = day.tempmin;
        const description = day.conditions;
        
        const city = data.resolvedAddress;
        
        weatherInfro.set('city', city);
        weatherInfro.set('date', date);
        weatherInfro.set('currentTemp', currentTemp);
        weatherInfro.set('maxTemp', maxTemp);
        weatherInfro.set('minTemp', minTemp);
        weatherInfro.set('description', description);
        render(c);
        console.log("Got the weather info");
        
    }
    catch(err){
        console.error(err)
    

    }
    
    

}



const c2f = (celsius) => {
    return celsius * 9/5 + 32;
}

document.querySelector('#search').addEventListener('click', () => {
    const input = document.querySelector('#input').value;
    main(input);
});

const render =(c) => {
    if (weatherInfro.size === 0){
        alert('City not found');
    }
    
    if (c == 1){
        document.querySelector('#city').textContent = weatherInfro.get('city');
        document.querySelector('#date').textContent = weatherInfro.get('date');
        document.querySelector('#temperature').textContent = c2f(weatherInfro.get('currentTemp'));
        document.querySelector('#tempMax').textContent = c2f(weatherInfro.get('maxTemp'));
        document.querySelector('#tempMin').textContent = c2f(weatherInfro.get('minTemp'));
        document.querySelector('#description').textContent = weatherInfro.get('description');
        
    }
    else{
        document.querySelector('#city').textContent = weatherInfro.get('city');
        document.querySelector('#date').textContent = weatherInfro.get('date');
        document.querySelector('#temperature').textContent = weatherInfro.get('currentTemp');
        document.querySelector('#tempMax').textContent = weatherInfro.get('maxTemp');
        document.querySelector('#tempMin').textContent = weatherInfro.get('minTemp');
        document.querySelector('#description').textContent = weatherInfro.get('description');

    }

}   