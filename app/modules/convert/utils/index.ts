import {IConvertSchema} from "../schemas";
import path from "node:path";
import fs from "node:fs";
import puppeteer from "puppeteer";
import * as handlebars from "handlebars";
import {fullHost} from "../../../common/constants";

export const generatePDF = async (eventData: IConvertSchema) => {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--font-render-hinting=none',
            '--disable-web-security'
        ],
    });

    const page = await browser.newPage();
    await page.setContent(
        generateHTML({...eventData, host: fullHost}),
        { waitUntil: 'networkidle0' }
    );
    await page.addStyleTag({
        content: generateCSS(fullHost),
    });
    await page.waitForSelector('body', { visible: true });
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdf;
}


export const generateHTML = (eventData: IConvertSchema & { host?: string }) => {
    const templatePath = path.join(__dirname, '../templates', 'template.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    return template(eventData);
}

const generateCSS = (host: string) => {
    const templatePath = path.join(__dirname, '../templates', 'style.css.hbs');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    return template({ host });
}
