export enum DollarType {
  oficial = 'oficial',
  blue = 'blue',
  tarjeta = 'tarjeta',
  qatar = 'qatar',
  ahorro = 'ahorro',
  mep = 'mep',
  ccl = 'ccl',
  cripto = 'cripto',
  netflix = 'netflix',
  mayorista = 'mayorista',
}

export const Dollars: Record<DollarType, string> = {
  [DollarType.oficial]: 'dolar oficial',
  [DollarType.blue]: 'dolar blue',
  [DollarType.tarjeta]: 'dolar tarjeta',
  [DollarType.qatar]: 'dolar qatar',
  [DollarType.ahorro]: 'dolar ahorro',
  [DollarType.mep]: 'dolar mep',
  [DollarType.ccl]: 'dolar ccl',
  [DollarType.cripto]: 'dolar cripto',
  [DollarType.netflix]: 'dolar netflix',
  [DollarType.mayorista]: 'dolar mayorista',
};

export type DollarItem = {
  key: string;
  label: string;
  buy: number;
  sell: number;
  variation: number;
};
