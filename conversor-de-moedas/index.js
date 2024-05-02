const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log('Bem vindos ao Bot conversor 🤖💰');

async function robo() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const moedaBase = readlineSync.question('Informe uma moeda base: ') || 'dolar';
    const moedaFinal = readlineSync.question('Informe uma moeda desejada: ') || 'real';
    const qualquerUrl = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&oq=${moedaBase}+para+${moedaFinal}&gs_lcrp=EgZjaHJvbWUyEQgAEEUYChg5GIMBGLEDGIAEMgkIARAAGAoYgAQyCQgCEAAYChiABDIJCAMQABgKGIAEMgkIBBAAGAoYgAQyCQgFEAAYChiABDIJCAYQABgKGIAEMgkIBxAAGAoYgAQyCQgIEAAYChiABDIJCAkQABgKGIAE0gEIMzEzMmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8`;
    await page.goto(qualquerUrl);
    await page.screenshot({path: 'resultado.png'});

    const resultado = await page.evaluate(() => {
        return document.querySelector('#knowledge-currency__updatable-data-column > div.ePzRBb > div > div.MWvIVe.egcvbb > input').value;
    })

    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`)
    await browser.close();
    
}

robo();
