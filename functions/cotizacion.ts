import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import axios from 'axios';
import cheerio from 'cheerio';
import { DollarItem, DollarType, Dollars } from '../src/models';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // downloading the target web page
  // by performing an HTTP GET request in Axios
  const axiosResponse = await axios.request({
    method: 'GET',
    url: 'https://www.dolarito.ar/dolar-hoy',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });

  const options = {
    dolar: event.queryStringParameters?.dolar || DollarType.blue,
  };

  // parsing the HTML source of the target web page with Cheerio
  const $ = cheerio.load(axiosResponse.data);

  const getPrice = (box: cheerio.Cheerio, type: string): string =>
    box
      .find(`p:contains("${type}")`)
      .closest('.chakra-skeleton')
      .parent()
      .find('.chakra-skeleton:nth-of-type(2)')
      .find('span:nth-of-type(2)')
      .text();

  const response: DollarItem[] = [];

  (Object.keys(Dollars) as (keyof typeof Dollars)[]).forEach((key: DollarType) => {
    const value = Dollars[key];
    const box = $(`.chakra-text:contains("${value}")`).closest('.chakra-skeleton').parent();
    const buy = getPrice(box, 'Compra');
    const sell = getPrice(box, 'Venta');
    response.push({ key, label: value, buy, sell });
  });

  // your server-side functionality
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow from anywhere
    },
  };
};

export { handler };
