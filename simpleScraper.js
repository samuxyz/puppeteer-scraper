const puppeteer = require('puppeteer');        

const URL = 'https://www.bigpdfconverter.com/pdf-tools';           

const simpleScraper = async () => {
console.log('Opening the browser...');   
const browser = await puppeteer.launch(); 
const page = await browser.newPage();   

console.log(`Navigating to ${URL}...`); 
await page.goto(URL, { waitUntil: 'load' }); 

console.log(`Collecting the tools...`);
let tools = await page.evaluate(() => {
  return [...document.querySelectorAll('.card-body > div:last-child')]
    .map((item) => {
      return {
        title: item.querySelector('.card-title').innerText,
        description: item.querySelector('.card-subtitle').innerText,
      };
    });
});

console.log('Closing the browser...');

await page.close();
await browser.close();

console.log('Job done!');
return tools;
};

simpleScraper();   