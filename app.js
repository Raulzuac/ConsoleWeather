const { readMenuOption, pause, readCity } = require("./helpers/menus");
require('colors');

const main = async () => {
    let opt = '';

    do {
        opt = await readMenuOption();
        switch (opt) {
            case '1':
                writeData(await readCity());
                break;
            case '2':
                console.log('option 2');
                break;
        }
        await pause();
    } while (opt !== '0')
}

const writeData = (weatherData) =>{
    console.log(`City:\t\t\t ${weatherData.name.blue}`);
    console.log(`${'Latitude:'.grey}\t\t ${`${weatherData.lat}`.cyan}`);
    console.log(`Longitude:\t\t ${`${weatherData.lon}`.blue}`);
    console.log(`${'Tempperature:'.grey}\t\t ${`${weatherData.temperature}`.cyan}`);
    console.log(`Minimum temperature:\t ${`${weatherData.min_temp}`.blue}`);
    console.log(`${'Maximum temperature:'.grey}\t ${`${weatherData.max_temp}`.cyan}`);
    console.log(`Weather:\t\t ${weatherData.clima.blue}`);
}

main()