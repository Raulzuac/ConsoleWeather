const { mapKey } = require("../assets/keys");

const getCity = async (cityName) =>{
        return fetch(`https://api.maptiler.com/geocoding/${cityName}.json?key=${mapKey}`)
        .then(response => response.json())
        .then(data => {
            let citiesData = [];
            data.features.forEach(element => {
                if(element.place_type!='region'){
                citiesData.push({
                    'name':element.place_name,
                    'lat':element.geometry.coordinates[0],
                    'lon':element.geometry.coordinates[1]
                })
            }
            });
            return citiesData;
        })
        .catch(err => err);
}

module.exports = {
    getCity,
}