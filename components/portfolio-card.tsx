"use client";
import React from "react";
import { Card } from "antd";
import { GroupedTransactionsType } from "@/app/page";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { calculateBuySellProfitOverall, investedMoneyAmount, soldCoinAmountOfMoney, sumBuyQuantity, sumSoldQuantity } from "@/types/utils";

interface PortfolioCardProps {
    allCoinTransactions: GroupedTransactionsType[];
    currentCoinPrice: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ allCoinTransactions, currentCoinPrice }) => {
    const { coinName, coinSymbol, coinImage, exchangeName }: { coinName: string; coinSymbol: string; coinImage: string; exchangeName: string } =
        allCoinTransactions[0];

    // console.log(coinName);
    // console.log(sumQuantity);
    // console.log(sum);
    // console.log(sumQuantity * 1800000);
    // if (sum < sumQuantity * 1800000) {
    //     // kdyz me portoflio je v +
    //     const profit = sumQuantity * 1800000 - sum;
    //     console.log("profit: " + profit + "KC");
    //     console.log("%");
    // }
    // if (sum >= sumQuantity * 1800000) {
    //     // kdyz meportfolio je v -
    //     console.log("me portoflio je v - ");
    //     console.log((sum / (sumQuantity * 1800000)) * 100);
    //     console.log("%");
    // }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{coinName}</CardTitle>

                <CardDescription>
                    <Badge className="bg-blue-500"> {exchangeName}</Badge>{" "}
                </CardDescription>
            </CardHeader>
            <CardContent>Investovana castka v CZK: {investedMoneyAmount(allCoinTransactions).toFixed(2)}</CardContent>
            <CardFooter>Mnozstvi nakoupenych minci: {sumBuyQuantity(allCoinTransactions).toFixed(3)}</CardFooter>
            <CardFooter>
                Profit: {(sumBuyQuantity(allCoinTransactions) * currentCoinPrice - investedMoneyAmount(allCoinTransactions)).toFixed(2)}
            </CardFooter>

            <CardFooter>Prodana castak v CZK: {soldCoinAmountOfMoney(allCoinTransactions).toFixed(2)}</CardFooter>
            <CardFooter>Mnozstvi prodanych minci: {sumSoldQuantity(allCoinTransactions).toFixed(4)}</CardFooter>
            <CardFooter>
                Finalni profit (buy - seel) :
                {calculateBuySellProfitOverall(
                    sumBuyQuantity(allCoinTransactions),
                    sumSoldQuantity(allCoinTransactions),
                    currentCoinPrice,
                    investedMoneyAmount(allCoinTransactions)
                ).toFixed(2)}
            </CardFooter>
        </Card>
    );
};

export default PortfolioCard;
