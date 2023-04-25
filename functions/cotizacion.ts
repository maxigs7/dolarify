import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { DolaritoScrapper } from '../src/dolarito-scrapper';
import { fetchDolarito } from '../src/fetch';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // downloading the target web page
  // by performing an HTTP GET request in Axios
  const response = await fetchDolarito();
  const scrapper = new DolaritoScrapper(response);

  const items = scrapper.process();

  // your server-side functionality
  return {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: {
      'Access-Control-Allow-Origin': '*', // Allow from anywhere
    },
  };
};

export { handler };
