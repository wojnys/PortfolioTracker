import { GroupedTransactionsType } from "@/app/page";
import { all } from "axios";

export const investedMoneyAmount = (allCoinTransactions: GroupedTransactionsType[]) => {
    const sum = allCoinTransactions
        .filter(
            (coin) =>
                coin.transactionStatus.toLowerCase() === "buy" && coin.coinSymbol.toLowerCase() === allCoinTransactions[0].coinSymbol.toLowerCase()
        )
        .reduce((acc, coin) => {
            return acc + coin.price * coin.quantity;
        }, 0);

    return sum;
};

export const sumBuyQuantity = (allCoinTransactions: GroupedTransactionsType[]) => {
    const res = allCoinTransactions
        .filter(
            (coin) =>
                coin.transactionStatus.toLowerCase() === "buy" && coin.coinSymbol.toLowerCase() === allCoinTransactions[0].coinSymbol.toLowerCase()
        )
        .reduce((acc, coin) => {
            return acc + coin.quantity;
        }, 0);
    return res;
};

export const soldCoinAmountOfMoney = (allCoinTransactions: GroupedTransactionsType[]) => {
    const sum = allCoinTransactions
        .filter(
            (coin) =>
                coin.transactionStatus.toLowerCase() === "sell" && coin.coinSymbol.toLowerCase() === allCoinTransactions[0].coinSymbol.toLowerCase()
        )
        .reduce((acc, coin) => {
            return acc + coin.price * coin.quantity;
        }, 0);

    return sum;
};

export const sumSoldQuantity = (allCoinTransactions: GroupedTransactionsType[]) => {
    const res = allCoinTransactions
        .filter(
            (coin) =>
                coin.transactionStatus.toLowerCase() === "sell" && coin.coinSymbol.toLowerCase() === allCoinTransactions[0].coinSymbol.toLowerCase()
        )
        .reduce((acc, coin) => {
            return acc + coin.quantity;
        }, 0);
    return res;
};

export const calculateBuySellProfitOverall = (buyQuantity: number, soldQuantity: number, currencCoinPrice: number, investedAmounOfMoney: number) => {
    const profit = (buyQuantity - soldQuantity) * currencCoinPrice - investedAmounOfMoney;
    return profit;
};
