const https = require("https");
const fs = require('fs');
const url = 'https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d841de64e26f8aca5f4157a102a15562';
const filestream = fs.createWriteStream('data.txt');

https.get(url, (response)=>
{
    response.pipe(filestream);
    response.on('error', (error)=>
    {
        console.error('ERROR during request :', error);
    });

    filestream.on('error', (error)=>
    {
        console.error('ERROR during File saving :', error);
    });

    response.on('end', ()=>
    {
        console.log('data retrived');
    })
    filestream.on('finish',()=>{
        console.log('file saved ')
    })
});


fs.readFile('./data.json', 'utf-8', (err,data)=>
{
    if(err)
    {
        console.log(err);
    }
    else if(data)
    {
        console.log(data);
    }
});
