import fs from 'node:fs';
import * as cheerio from 'cheerio';
import client from 'https';
import request from 'request';

//  Origin link for from the meme page we get the data from
const origin = 'https://memegen-link-examples-upleveled.netlify.app/';

//  The Array with the requested first 10 links to the imgs.
const linkArray = [];

//  Variable of the folder that will be deleted
const dir =
  '/Users/nicholashammerle/projects/node.js-meme-scraper-pjct-node-2-meme-scraper-/memes';

//  funtion to delete the folder from the last time the programm was started
fs.rmdir(dir, () => {
  console.log(`${dir} is deleted!`);
});

//  function to fetch the whole html body if there is a connection to the website,
//  if there is a response
request(origin, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const content = cheerio.load(body);
    //  loops through every div > a > picks the src and places it in the linkArray
    content('div a img').each((i, element) => {
      if (i <= 9) {
        const link = content(element).attr('src');
        linkArray.push(link);
      }
    });
    const folderName =
      '/Users/nicholashammerle/projects/node.js-meme-scraper-pjct-node-2-meme-scraper-/memes';
    try {
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
      }
    } catch (err) {
      console.error(err);
    }

    //  Here should start the loop that downloads the imgs and puts it in a new file inside the meme folder
  }
});
// let url =
//   "https://api.memegen.link/images/rollsafe/can't_get_fired/if_you_don't_have_a_job.jpg?width=300";
// let filepath =
//   '/Users/nicholashammerle/projects/node.js-meme-scraper-pjct-node-2-meme-scraper-/memes/01.jpeg';

// function downloadImage(url, filepath) {
//   client.get(url, (res) => {
//     res.pipe(fs.createWriteStream(filepath));
//   });
// }
// downloadImage(url, filepath);
