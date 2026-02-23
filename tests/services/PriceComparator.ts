export interface PriceResult {
  site: string;
  price: number;
}

export function findLowestPrice(results: PriceResult[]): PriceResult {
  return results.reduce((min, curr) =>
    curr.price < min.price ? curr : min
  );
}