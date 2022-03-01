const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.log("bem vindo ao conversor");


async function bot(){
    const coin_base = readlineSync.question('informe a moeda base: ');
    const coin_final = readlineSync.question('informe a moeda secundária: ');
    const btc = `https://www.google.com/search?q=${coin_base}+para+${coin_final}&oq=${coin_base}+para+${coin_final}&aqs=chrome..69i57.4062j0j1&sourceid=chrome&ie=UTF-8`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(btc);
    //screenshot
    await page.screenshot({ path: 'default.png'});

    const valor_final = await page.evaluate(function(){
        var crypto = document.querySelector('.cilsF.a61j6');
        if(crypto != null){
            crypto = crypto.value
            return crypto;
        }else{
            crypto = document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
            return crypto;
        }
    });
    console.log(`O valor de ${coin_base} em ${coin_final} hoje é: ${valor_final}`);

    await browser.close();
}

bot();