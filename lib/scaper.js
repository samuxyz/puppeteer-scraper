const puppeteer = require('puppeteer');        

const url = 'https://stackoverflow.com/questions';           

const scrapWebsite = async (pages = 1) => {
const browser = await puppeteer.launch(); 
const page = await browser.newPage();   

await page.goto(url, { waitUntil: 'load' }); 

const totalPages = pages;
let questions = [];

for (let initialPage = 1; initialPage <= totalPages; initialPage++) {
  let pageQuestions = await page.evaluate(() => {
    return [...document.querySelectorAll('.question-summary')]
      .map((question) => { 
        return {
          question: question.querySelector('.question-hyperlink').innerText,
          excerpt: question.querySelector('.excerpt').innerText,
        }
      });
  });

  questions = questions.concat(pageQuestions);

  if (initialPage < totalPages) {
    await Promise.all([
      await page.click('.pager > a:last-child'),
      await page.waitForSelector('.question-summary'),
    ])
  }
}

await page.close();
await browser.close();

return questions;
};

module.exports = { 
  scrapWebsite,
};