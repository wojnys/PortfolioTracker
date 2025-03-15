"use client";

import React, { useEffect } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import type { GetProps } from "antd";
import axios from "axios";
import { Coin } from "@/types/coinGeckoApiTypes";
import CustomTable from "@/components/table";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: "#1677ff",
        }}
    />
);

const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);
export default function Home() {
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
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDataByMarketCap();
    }, []);

    console.log(topCrypto);

    return (
        <div className="h-[100vh] flex items-center justify-center mx-auto w-4/5">
            <div className="flex flex-col w-full mx-auto items-center h-[100vh] gap-5">
                <div className="flex justify-end flex-col items-center w-full h-1/2">
                    <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: "100%" }} />
                </div>
                <div className="h-[2px] flex flex-col gap-4">
                    <CustomTable
                        data={topCrypto}
                        customColumns={["image", "name", "ath", "ath_date", "market_cap", "current_price"]}
                        actionColumnsArr={[{ key: "show-more-info", title: "Action" }]}
                    />
                </div>
            </div>
        </div>
    );
}
