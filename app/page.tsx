import MainPage from "@/components/pages/main-page";
import prisma from "@/lib/prisma";
import { CryptoTransactionWithRelationsType } from "@/types/prismaTypes";

export interface GroupedTransactionsType {
    coinName: string;
    coinSymbol: string;
    coinImage: string;
    exchangeName: string;
    transactionDate: Date;
    fiatCurrencySymbol: string;
    price: number;
    quantity: number;
    transactionStatus: string;
}

const Page = async () => {
    const myCryptoPortfolio = await prisma.cryptoTransaction.findMany({
        include: {
            coin: true,
            exchange: true,
            user: true,
            transactionStatus: true,
            fiatCurrency: true,
        },
    });

    const groupByCoinId = (transactions: CryptoTransactionWithRelationsType[]) => {
        return transactions.reduce((acc, transaction) => {
            const { coinId } = transaction;

            if (!acc[coinId]) {
                acc[coinId] = [];
            }

            acc[coinId].push({
                coinName: transaction.coin.name,
                coinSymbol: transaction.coin.symbol,
                coinImage: transaction.coin.logoImg,
                exchangeName: transaction.exchange.name,
                transactionDate: transaction.date,
                fiatCurrencySymbol: transaction.fiatCurrency.symbol,
                price: transaction.price,
                quantity: transaction.quantity,
                transactionStatus: transaction.transactionStatus.name,
            });

            return acc;
        }, {} as Record<number, GroupedTransactionsType[]>);
    };

    const groupedTransactions = groupByCoinId(myCryptoPortfolio);

    console.log("page.tsx");
    console.log(groupedTransactions);

    return (
        <div>
            <MainPage myCryptoPortfolio={groupedTransactions} />
        </div>
    );
};
export default Page;
