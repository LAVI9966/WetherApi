const http = require('http');
const fs = require('fs');
const requests = require('requests');

const homeFile = fs.readFileSync('index.html','utf-8');
const cityname = fs.readFileSync('cityname.txt','utf8');
const kelvincoverter = (kal) =>{
    return Math.round(kal-273.15);
}

const replaceval =(tempval,orgval)=>{
    let temprature = tempval.replace('{%tempval%}',kelvincoverter(orgval.main.temp))     
    temprature = temprature.replace('{%tempmin%}',kelvincoverter(orgval.main.temp_min))     
    temprature = temprature.replace('{%tempmax%}',kelvincoverter(orgval.main.temp_min))     
    temprature = temprature.replace('{%templocation%}',orgval.name)     
    temprature = temprature.replace('{%country%}',orgval.sys.country)
    temprature = temprature.replace('{%country%}',orgval.sys.country)
    return temprature     
}

const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=ujjain&appid=e4c874d444d6b483930c61314c651319')
        .on('data',(chunk)=>{
            const objdata = JSON.parse(chunk);
            const arrdata = [objdata];
            // console.log(arrdata[0].main.temp);
            const realtimedata = arrdata.map((val)=> replaceval(homeFile,val)).join("")
            res.write(realtimedata);
        })
        .on('end',(err)=>{
            if(err) return console.log("Connection close due to errors",err)
            // console.log('end');
        res.end()
        })
    }
});

server.listen(3000,'127.0.0.1')


// [
//     {
//       coord: { lon: 75.8333, lat: 22.7179 },
//       weather: [ [Object] ],
//       base: 'stations',
//       main: {
//         temp: 290.25,
//         feels_like: 289.66,
//         temp_min: 290.25,
//         temp_max: 290.25,
//         pressure: 1018,
//         humidity: 63
//       },
//       visibility: 6000,
//       wind: { speed: 0, deg: 0 },
//       clouds: { all: 20 },
//       dt: 1705759446,
//       sys: {
//         type: 1,
//         id: 9067,
//         country: 'IN',
//         sunrise: 1705714738,
//         sunset: 1705754130
//       },
//       timezone: 19800,
//       id: 1269743,
//       name: 'Indore',
//       cod: 200
//     }
//   ]
//   out
  