import {IConvertSchema} from "../schemas";
import path from "node:path";
import fs from "node:fs";
import puppeteer from "puppeteer";
import * as handlebars from "handlebars";

/*
    Открывает браузер и генерирует pdf
    но при этом открывает его в about:blank и по этому не видит подключенные css
    ибо их нужно принять с сервера в папке public
    на подумать
 */
export const generatePDF = async (eventData: IConvertSchema, isPdf = true) => {
    const templatePath = path.join(__dirname, '../templates', 'template.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    let html = template(eventData);

    if (!isPdf) {
        return html;
    }

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null,
        slowMo: 100,
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.waitForSelector('body', { visible: true });
    //await browser.close();

    return await page.pdf({ format: 'A4' });
}
