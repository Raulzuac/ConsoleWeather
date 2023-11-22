const inquirer = require('inquirer');
const { getCity } = require('../models/cities_provider');
const { getWeather } = require('../models/weather_provider');
require('colors')

const menuoptions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select action \\/ \\/ \\/ \\/ \\/ \\/',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Search the weather of a city`
            },
            {
                value: '2',
                name: `${'2.'.blue} Search history`
            },
            {
                value: '0',
                name: `${'0.'.blue} Exit`
            },
        ]
    }
];


const readMenuOption = async () => {

    console.clear();
    console.log('                  ██████                    '.blue);
    console.log('                ██      ██                  '.blue);
    console.log('              ██          ████              '.blue);
    console.log('            ██              ▒▒██            '.blue);
    console.log('        ████▒▒                ██            '.blue);
    console.log('  ██████      ▒▒            ▒▒▒▒████        '.blue);
    console.log('██▒▒            ▒▒        ▒▒      ▒▒██      '.blue);
    console.log('██▒▒▒▒        ▒▒▒▒▒▒▒▒▒▒▒▒          ▒▒██    '.blue);
    console.log('  ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██    '.blue);
    console.log('    ██████████████████████████████████      '.blue);
    console.log('           Z    W E A T H E R              ');
    console.log('========================================'.blue);
    console.log('            SELECT OPTION              ');
    console.log('========================================'.blue);

    const { option } = await inquirer.prompt(menuoptions);
    
    return option;
}

const selectCity = async (CityName) =>{
    let choices = []
    const cities=(await getCity(CityName)).splice(0,5);
    cities.forEach((element,index) => {
        choices.push(
            {
                value: element,
                name: `${`${index+1}.`.blue} ${element.name}`
            }
        )
    });

    const citiesOptions = {
        type:'list',
        name:'city',
        message: 'Select the city \\/ \\/ \\/ \\/ \\/ \\/',
        choices
    }

    const {city} = await inquirer.prompt(citiesOptions);

    return city;

}


const readCity = async () =>{
    const {city} = await inquirer.prompt([{
        type:'input',
        name:'city',
        message:`Insert the name of the ${'city'.cyan.underline}: `
    }])

    const selectedCity = await selectCity(city);
    return await getWeather(selectedCity.lon,selectedCity.lat);
}



const pause = async  () =>{
    
    await inquirer.prompt([{
        type:'input',
        name:'enter',
        message: `Press ${'ENTER'.cyan} to proceed.`
    }])

}


module.exports = {
    readMenuOption,
    pause,
    selectCity,
    readCity
}