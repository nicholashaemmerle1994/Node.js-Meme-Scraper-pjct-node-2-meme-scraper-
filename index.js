import fs from 'node:fs';
import client from 'node:https';
import * as cheerio from 'cheerio';
import cliProgress from 'cli-progress';
import request from 'request';

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
bar1.start(200, 0);
bar1.update(25);
const origin = 'https://memegen-link-examples-upleveled.netlify.app/';

const linkArray = []; //  includes the first 10 img src´s from the origin website

const dir = './memes'; //  Variable of the folder that will be deleted and created

fs.rmdir(dir, () => {}); // this deletes the memes folder from the last time the program ran
bar1.update(50);
//  function to fetch the whole html body if there is a connection to the website,
//  if there is a response
request(origin, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const htmlContent = cheerio.load(body);
    //  loops through every div > a > picks the src and places it in the linkArray
    bar1.update(100);
    htmlContent('div a img').each((i, element) => {
      if (i <= 9) {
        const link = htmlContent(element).attr('src');
        linkArray.push(link);
      }
    });
    bar1.update(135);
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      console.error(err);
    }
    //  Here should start the loop that downloads the imgs and puts it in a new file inside the meme folder
    for (let i = 0; i < linkArray.length; i++) {
      bar1.update(170);
      client.get(linkArray[i], (res) => {
        const dir2 = `./memes/0${i + 1}.jpg`;
        res.pipe(fs.createWriteStream(dir2));
      });
    }
  }
});
bar1.update(200);
bar1.stop();
