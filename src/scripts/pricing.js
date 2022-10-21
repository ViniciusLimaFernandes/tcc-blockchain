import axios from "axios";

const apiURL =
  "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=brl";

const getSolanaPriceInBRL = async () => {
  console.log("getting SOL price in BRL");

  let price = await axios.get(apiURL);

  return price;
};

export const totalCostInSol = async (kwhConsuption, kwhPrice) => {
  console.log("calculating total cost in SOL");

  const solanaInBRL = await getSolanaPriceInBRL().then((result) => {
    const price = result.data.solana.brl;
    console.log(`got price ${price}`);
    return price;
  });

  const totalConsuptionPrice = Number(kwhConsuption * kwhPrice);
  const totalCostInSOL = Number(totalConsuptionPrice / solanaInBRL).toFixed(2);

  console.log(
    `total cost in SOL: ${totalCostInSOL} 
    for ${kwhConsuption}KWh 
    at R$ ${kwhPrice}/KWh 
    with SOL at R$ ${solanaInBRL} 
    giving a total cost in R$ ${totalConsuptionPrice}`
  );
  return totalCostInSOL;
};
