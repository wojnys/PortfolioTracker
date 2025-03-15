"use client";

import React, { useEffect } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import type { GetProps } from "antd";
import axios from "axios";

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
    const [topCrypto, setTopCrypto] = React.useState<string[]>([]);

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
                const data = response.data;
                console.log(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDataByMarketCap();
    }, []);

    console.log(topCrypto);

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <div className="flex justify-center w-2/3">
                <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: "100%" }} />
            </div>
        </div>
    );
}
