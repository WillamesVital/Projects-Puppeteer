require('dotenv').config();
const puppeteer = require('puppeteer');
const axios = require('axios');

console.log('Fazer login e efetuar uma postagem no Twitter');

async function roboTwitter() {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://twitter.com');

        await page.click('[href="/login"]');
        await page.waitForSelector('[aria-labelledby="modal-header"]');
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        await page.type('input[type="text"]', process.env.USUARIO);
        await page.click('div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-ywje51.r-usiww2.r-13qz1uu.r-2yi16.r-1qi8awa.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l');

        await page.waitForSelector('input[name="password"]');
        await page.type('input[name="password"]', process.env.SENHA);

        await page.click('div[data-testid="LoginForm_Login_Button"]');
        await page.waitForSelector('div[aria-label="Texto do post"]');

        const adviceText = await getAdvice();
        if (adviceText) {
            await page.type('div[aria-label="Texto do post"]', adviceText);
        } else {
            console.error('Não foi possível obter uma frase da API.');
        }

        await page.click('div[data-testid="tweetButtonInline"]');
        await page.setDefaultTimeout(5000);
        await page.screenshot({ path: 'resultado.png' });
        await browser.close();
    } catch (error) {
        console.error('Erro no robô do Twitter:', error.message);
    }
}

async function getAdvice() {
    try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        if (response.status === 200) {
            return response.data.slip.advice;
        } else {
            console.error('Erro na requisição Advice Slip:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Erro ao obter frase da API Advice Slip:', error.message);
        return null;
    }
}

roboTwitter();
