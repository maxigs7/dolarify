const cheerio = require('cheerio');
const axios = require('axios');

async function performScraping() {
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

  // parsing the HTML source of the target web page with Cheerio
  const $ = cheerio.load(axiosResponse.data);
  const box = $('.chakra-text:contains("dolar blue")').closest('.chakra-skeleton').parent();
  const buy = box
    .find('p:contains("Compra")')
    .closest('.chakra-skeleton')
    .parent()
    .find('.chakra-skeleton:nth-of-type(2)')
    .find('span:nth-of-type(2)')
    .text();
  const sell = box
    .find('p:contains("Venta")')
    .closest('.chakra-skeleton')
    .parent()
    .find('.chakra-skeleton:nth-of-type(2)')
    .find('span:nth-of-type(2)')
    .text();
  // .text();
  // const sell = box.find('p:contains("Venta")').closest('.chakra-skeleton').parent();
  // .find('.chakra-skeleton:nth-of-type(2) span:nth-of-type(2)')
  // .text();

  console.log(buy, sell);
}

console.log('Hello, World!');
performScraping();
