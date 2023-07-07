const fs = require("fs");

//const data = fs.readFileSync("./photo.jpeg","utf-8");

fs.writeFile("./tobewrit.txt", "Hello , I am working", function(err){
    if(err)
    {
        console.log(err)
    }
})
fs.readdir(".", function(err,files)
{
    for(let i=0; i<files.length; i++)
    {
        fs.lstat("./"+files[i], function(err, stat)
        {
            if(err)
            {
                console.log(err);
            }
            else if(stat.isDirectory())
            {
                console.log(files[i]+"directory");
            }
            else if(stat.isFile())
            {
                console.log(files[i]+ "file");
            }
        })
    }
})


