function groupStocks() {
  let returnArr = [];
  let hash = {};
  let a = [...this.props.stocks];
  for (let i = 0; i < a.length; i++) {
    let stock = a[i];
    let { quantity, totalValue, ticker, openPrice, latestPrice } = stock;

    if (!hash[ticker]) {
      hash[ticker] = [quantity, Number(totalValue), openPrice, latestPrice];
    } else {
      let currentQuantity = hash[ticker][0];
      let currentTotalValue = hash[ticker][1];
      let newQuantity = currentQuantity + quantity;
      let newTotalValue = Number(currentTotalValue) + Number(totalValue);

      hash[ticker][0] = newQuantity;
      hash[ticker][1] = newTotalValue;
    }
  }
  for (let stock in hash) {
    returnArr.push({
      ticker: stock,

      quantity: hash[stock][0],
      totalValue: hash[stock][1],
      openPrice: hash[stock][2],
      latestPrice: hash[stock][3]
    });
  }
  return returnArr;
}

export default groupStocks;
