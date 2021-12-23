const puppeteer = require('puppeteer');        

const URL = 'https://stackoverflow.com/questions';           

const multiPageScraper = async (pages = 1) => {
console.log('Opening the browser...');   
const browser = await puppeteer.launch(); 
const page = await browser.newPage();   

console.log(`Navigating to ${URL}...`); 
await page.goto(URL, { waitUntil: 'load' }); 

const totalPages = pages;
let questions = [];

for (let initialPage = 1; initialPage <= totalPages; initialPage++) {
  console.log(`Collecting the questions of page ${initialPage}...`);
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

console.log('Closing the browser...');

await page.close();
await browser.close();

console.log('Job done!');
return questions;
};

multiPageScraper(2);   