var fs = require('fs');
const superagent=require('superagent');
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
console.log(generateString(8));
//callback

superagent
    .get(`https://robohash.org/${generateString(8)}`)
    .end((err,res)=>{
        console.log(res.request.url);
        fs.writeFile('./robotImage.txt', res.request.url, (err) => {
        if(err){
            console.log("not able to save the file",err);
            return;
        }
        console.log(`random img successfully savved in file.`)
      });
    });

