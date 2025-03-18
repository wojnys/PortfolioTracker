"use client";

import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { Coin } from "@/types/coinGeckoApiTypes";
import CustomTable from "@/components/table";
import SearchComponent from "@/components/search-component";
import debounce from "lodash.debounce";
import PortfolioCard from "@/components/portfolio-card";
import { CryptoTransactionWithRelationsType } from "@/types/prismaTypes";
import { GroupedTransactionsType } from "@/app/page";

const backupData: Coin[] = [];

interface MainPageProps {
    myCryptoPortfolio: Record<number, GroupedTransactionsType[]>;
}

const MainPage: React.FC<MainPageProps> = ({ myCryptoPortfolio }) => {
    // s possible to group data by coinId

    const [topCrypto, setTopCrypto] = React.useState<Coin[]>([]);

    useEffect(() => {
        const fetchDataByMarketCap = async () => {
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                    params: {
                        vs_currency: "usd",
                        order: "market_cap_desc",
                        per_page: 100, // Number of coins per request
                        page: 1,
                        sparkline: false,
                    },
                });
                const formattedCoins: Coin[] = response.data.map((coin: Coin, index: number) => ({
                    image: coin.image,
                    key: index + 1,
                    name: coin.name,
                    ath: coin.ath,
                    ath_date: coin.ath_date,
                    market_cap: coin.market_cap,
                    current_price: coin.current_price,
                    total_volume: coin.total_volume,
                    price_change_percentage_24h: coin.price_change_percentage_24h,
                    max_supply: coin.max_supply,
                    symbol: coin.symbol,
                }));

                setTopCrypto(formattedCoins);
                backupData.push(...formattedCoins);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDataByMarketCap();
    }, []);

    const handleSearch = useCallback(
        debounce((e: React.ChangeEvent<HTMLInputElement>, data: Coin[]) => {
            if (e.target.value === "") {
                setTopCrypto(backupData);
                return;
            }
            setTopCrypto(data);
        }, 300),
        []
    );

    return (
        <div className="h-[100vh] flex items-center justify-center mx-auto w-4/5">
            <div className="flex flex-col w-full mx-auto items-center h-[100vh] gap-5">
                <div className="flex justify-end flex-col items-center w-full h-1/2">
                    <div className="w-full grid grid-cols-3 gap-4">
                        <PortfolioCard />
                        <PortfolioCard />
                        <PortfolioCard />
                    </div>

                    <SearchComponent onChange={handleSearch} data={topCrypto} />
                </div>

                <div className="h-[2px] flex flex-col gap-4">
                    <CustomTable
                        coinData={topCrypto}
                        customColumns={["image", "name", "ath", "ath_date", "market_cap", "current_price"]}
                        actionColumnsArr={[{ key: "show-more-info", title: "Action" }]}
                    />
                </div>
            </div>
        </div>
    );
};
export default MainPage;
