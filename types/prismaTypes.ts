import { Coin, Exchange, FiatCurrency, TransactionStatus, User } from "@prisma/client";
export interface CryptoTransactionWithRelationsType {
    id: string;
    exchangeTransactionUid: string;
    quantity: number;
    price: number;
    date: Date;
    exchangeId: string;
    coinId: number;
    fiatCurrencyId: number;
    transactionStatusId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;

    coin: Coin;
    exchange: Exchange;
    fiatCurrency: FiatCurrency;
    transactionStatus: TransactionStatus;
    user: User;
}
