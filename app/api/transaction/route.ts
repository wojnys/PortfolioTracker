import prisma from "@/lib/prisma";
import { Coin, FiatCurrency, TransactionStatus } from "@prisma/client";

interface AnycoinTransactionType {
    UID: string;
    DATE: string;
    SYMBOL: string;
    ACTION: string;
    QUANTY: string;
    PRICE: string;
    FEE: string;
    FEE_CURRENCY: string;
    REBATE: string;
    REBATE_CURRENCY: string;
    ADDRESS_FROM: string;
    ADDRESS_TO: string;
}

function parseCustomDateAnyCoin(dateStr: string): Date {
    const split = dateStr.split(" ");
    const day = split[0].split(".")[0].padStart(2, "0");
    const month = split[1].split(".")[0].padStart(2, "0");
    const year = split[2];
    return new Date(`${year}-${month}-${day}`);
}

export async function POST(request: Request) {
    const { data } = await request.json();

    const coins = await prisma.coin.findMany();
    const fiatCurrencies = await prisma.fiatCurrency.findMany();
    const statues = await prisma.transactionStatus.findMany();

    await prisma.cryptoTransaction.createMany({
        data: data.parsedJsonData.map((transaction: AnycoinTransactionType) => {
            const symbol = transaction.SYMBOL.split("/");
            const split = transaction.DATE.split(" ");
            const day = split[0].split(".")[0];
            const month = split[1].split(".")[1];
            const year = split[2];

            return {
                exchangeTransactionUid: transaction.UID,
                quantity: Number(transaction.QUANTY),
                price: Number(transaction.PRICE),
                date: parseCustomDateAnyCoin(transaction.DATE),
                exchangeId: data.exchangeId, // Directly use foreign keys instead of `connect`
                transactionStatusId: statues.find((item: TransactionStatus) => item.name.toLowerCase() === transaction.ACTION.toLowerCase())?.id,
                userId: data.userId,
                fiatCurrencyId: fiatCurrencies.find((item: FiatCurrency) => item.symbol.toLowerCase() === symbol[1]?.toLowerCase())?.id,
                coinId: coins.find((item: Coin) => item.symbol.toLowerCase() === symbol[0]?.toLowerCase())?.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        }),
    });

    return new Response(JSON.stringify({ message: "Success!" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}
