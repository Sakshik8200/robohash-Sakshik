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
//async-wait
function writeFilePromise(fileLocation, result) {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileLocation, result, (err) => {
            if (err) {
                reject('not able to write to the file')
            }
            resolve()
        })
    })
}
async function getRobopic() {
    try {
        const res = await superagent.get(`https://robohash.org/${generateString(8)}`)
        const res2 = await superagent.get(`https://robohash.org/${generateString(8)}`)
      const res3 = await superagent.get(`https://robohash.org/${generateString(8)}`)
        //console.log('Random image is ', res.request.url)
        const all = await Promise.all([res,res2,res3]) //to show all imgs details
        const images = all.map((img)=>img.request.url) // map holds key values
        console.log(images)
        await writeFilePromise('./robotImage.txt',images.join("\n")) // join for concatenating all elements in an array 
        console.log('sucessfully written the file')
    } catch (err) {
        throw err
    }
    console.log('2. complete')
}
console.log('1. start')
    ; (async () => {
        try {
            await getRobopic()
            console.log('3. end')
        } catch (err) {
            console.log('3. error')
        }
    })()

// async function getRobopic(){
//     try{
//         const res = await superagent.get(
//             `https://robohash.org/${generateString(8)}`
//             )
//         console.log('roboimg:',res.request.url);
//         await writeFilePromise('/robotImage.txt',res.request.url)
//         console.log('successfully added img')
//         }catch(err){
//             throw err
//         }
//         console.log('2.complete')

// }
// console.log('1.start')
// ;(async()=>{
//     try{
//         await getRobopic()
//         console.log('3. saved')

//     }catch(err){
//         console.log('3. error')
//     }
// })()
// promise
// function writeFilePromise(fileLocation, result) {
//        return new Promise((resolve, reject) => {
//             fs.writeFile(fileLocation, result, (err) => {
//                 if (err) {
//                    reject('not able to write to the file')
//                  }
//                  resolve()
//              })
//         })
//     }
//     superagent.get(`https://robohash.org/${generateString(8)}`)
//         .end((err, res) => {
//             console.log(res.request.url);
//             return writeFilePromise('./robotImage.txt', res.request.url)
//         .then(() => {
//             console.log('random image is saved in file')
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     })
// callback

// superagent
//     .get(`https://robohash.org/${generateString(8)}`)
//     .end((err,res)=>{
//         console.log(res.request.url);
//         fs.writeFile('./robotImage.txt', res.request.url, (err) => {
//         if(err){
//             console.log("not able to save the file",err);
//             return;
//         }
//         console.log(`random img successfully savved in file.`)
//       });
//     });


