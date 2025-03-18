const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
    console.log("Clearing database...");

    console.log("Seeding database...");

    // Create Exchanges
    const exchanges = await prisma.exchange.createMany({
        data: Array.from({ length: 5 }, () => ({
            name: faker.company.name(),
        })),
    });

    // Create Coins
    const coins = await prisma.coin.createMany({
        data: [
            { name: "Bitcoin", symbol: "BTC", logoImg: faker.image.url() },
            { name: "Ethereum", symbol: "ETH", logoImg: faker.image.url() },
            { name: "Solana", symbol: "SOL", logoImg: faker.image.url() },
            { name: "Ripple", symbol: "XRP", logoImg: faker.image.url() },
            { name: "Dogecoin", symbol: "DOGE", logoImg: faker.image.url() },
            { name: "Cardano", symbol: "ADA", logoImg: faker.image.url() },
            { name: "Polkadot", symbol: "DOT", logoImg: faker.image.url() },
            { name: "Litecoin", symbol: "LTC", logoImg: faker.image.url() },
            { name: "Chainlink", symbol: "LINK", logoImg: faker.image.url() },
            { name: "Avalanche", symbol: "AVAX", logoImg: faker.image.url() },
            { name: "Shiba inu", symbol: "SHIB", logoImg: faker.image.url() },
        ],
    });

    // Create Fiat Currencies
    const fiatCurrencies = await prisma.fiatCurrency.createMany({
        data: [
            { name: "US Dollar", symbol: "USD", logoImg: faker.image.url() },
            { name: "Euro", symbol: "EUR", logoImg: faker.image.url() },
            { name: "British Pound", symbol: "GBP", logoImg: faker.image.url() },
            { name: "Japanese Yen", symbol: "JPY", logoImg: faker.image.url() },
            { name: "Czech Koruna", symbol: "CZK", logoImg: faker.image.url() },
        ],
    });

    // Create Transaction Statuses
    const transactionStatuses = await prisma.transactionStatus.createMany({
        data: [{ name: "Buy" }, { name: "Sell" }],
    });

    // Create Users
    const users = await prisma.user.createMany({
        data: Array.from({ length: 5 }, () => ({
            name: faker.person.fullName(),
            email: faker.internet.email(),
        })),
    });

    // Fetch created data
    const dbExchanges = await prisma.exchange.findMany();
    const dbCoins = await prisma.coin.findMany();
    const dbFiatCurrencies = await prisma.fiatCurrency.findMany();
    const dbTransactionStatuses = await prisma.transactionStatus.findMany();
    const dbUsers = await prisma.user.findMany();

    // Create Crypto Transactions
    for (let i = 0; i < 20; i++) {
        await prisma.cryptoTransaction.create({
            data: {
                exchangeId: faker.helpers.arrayElement(dbExchanges).id,
                coinId: faker.helpers.arrayElement(dbCoins).id,
                quantity: faker.number.float({ min: 0.01, max: 10, fractionDigits: 4 }),
                price: faker.number.float({ min: 100, max: 60000, fractionDigits: 4 }),
                transactionStatusId: faker.helpers.arrayElement(dbTransactionStatuses).id,
                fiatCurrencyId: faker.helpers.arrayElement(dbFiatCurrencies).id,
                date: faker.date.recent(),
                userId: faker.helpers.arrayElement(dbUsers).id,
            },
        });
    }

    console.log("Seeding complete!");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
