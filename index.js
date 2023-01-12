import fs from 'node:fs';
import client from 'node:https';
import * as cheerio from 'cheerio';
import request from 'request';

const origin = 'https://memegen-link-examples-upleveled.netlify.app/';

const linkArray = []; //  includes the first 10 img src´s from the origin website

const dir = './memes'; //  Variable of the folder that will be deleted and created

fs.rmdir(dir, () => {}); // this deletes the memes folder from the last time the program ran

//  function to fetch the whole html body if there is a connection to the website,
//  if there is a response
request(origin, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const htmlContent = cheerio.load(body);

    //  loops through every div > a > picks the src and places it in the linkArray
    htmlContent('div a img').each((i, element) => {
      if (i <= 9) {
        const link = htmlContent(element).attr('src');
        linkArray.push(link);
      }
    });
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      console.error(err);
    }
    //  Here should start the loop that downloads the imgs and puts it in a new file inside the meme folder
    for (let i = 0; i < linkArray.length; i++) {
      client.get(linkArray[i], (res) => {
        let dir2 = `./memes/0${i + 1}.jpg`;
        res.pipe(fs.createWriteStream(dir2));
      });
    }
  }
});
