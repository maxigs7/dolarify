import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { DollarItem, DollarType, Dollars } from './models';

export class DolaritoScrapper {
  private $;

  constructor(public response: AxiosResponse<any, any>) {
    this.$ = cheerio.load(response.data);
  }

  process(): DollarItem[] {
    const response: DollarItem[] = [];

    (Object.keys(Dollars) as (keyof typeof Dollars)[]).forEach((key: DollarType) => {
      const label = Dollars[key];
      const box = this.getBox(key);
      const variation = this.getVariation(box);
      const buy = this.getPrice(box, 'Compra');
      const sell = this.getPrice(box, 'Venta');
      response.push({ key, label, buy, sell, variation });
    });

    return response;
  }

  private getBox(key: DollarType) {
    const value = Dollars[key];
    return this.$(`.chakra-text:contains("${value}")`)
      .closest('.chakra-wrap__listitem ')
      .find('> div > div');
  }

  private getPrice(box: cheerio.Cheerio, type: string): number {
    const price = box
      .find(`p:contains("${type}")`)
      .closest('.chakra-skeleton')
      .parent()
      .find('.chakra-skeleton:nth-of-type(2)')
      .find('span:nth-of-type(2)')
      .text();
    return parseFloat(price.replace(',', '.'));
  }

  private getVariation(box: cheerio.Cheerio): number {
    const variation = box.find('> div:nth-of-type(1)').find('.chakra-text').text();
    const noSpecialChars = variation.replace(',', '.').replace(/[^0-9]/, '');
    console.log(noSpecialChars);
    return +(parseFloat(noSpecialChars) / 100).toFixed(2);
  }
}
