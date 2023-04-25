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
      const value = Dollars[key];
      const box = this.$(`.chakra-text:contains("${value}")`).closest('.chakra-skeleton').parent();
      const buy = this.getPrice(box, 'Compra');
      const sell = this.getPrice(box, 'Venta');
      response.push({ key, label: value, buy, sell });
    });

    return response;
  }

  private getBox(key: DollarType) {
    const value = Dollars[key];
    return this.$(`.chakra-text:contains("${value}")`).closest('.chakra-skeleton').parent();
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
}
