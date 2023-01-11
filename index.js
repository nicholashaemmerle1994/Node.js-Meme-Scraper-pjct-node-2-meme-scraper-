import * as cheerio from 'cheerio';
import request from 'request';

//  Origin link for from the meme page we get the data from
const origin = 'https://memegen-link-examples-upleveled.netlify.app/';

//  function to fetch the whole html body if there is a connection to the website,
//  if there is a response

const linkArray = [];

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
    console.log(linkArray);
  }
});
