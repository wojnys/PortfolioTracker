import { Coin } from "@/types/coinGeckoApiTypes";
import { GetProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Fuse from "fuse.js";
import React, { useState } from "react";

interface SearchComponentProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>, data: Coin[]) => void;
    data: Coin[];
}

const { Search } = Input;

const suffix = (
    <SearchOutlined
        style={{
            fontSize: 23,
            color: "#1890ff",
            padding: "0 5px",
        }}
    />
);

const SearchComponent: React.FC<SearchComponentProps> = ({ data, onChange }) => {
    const [query, setQuery] = useState("");

    const fuse = new Fuse(data, {
        keys: ["name"], // Fields to search
        threshold: 0.3, // Lower means more strict matches
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        onChange(
            e,
            fuse.search(e.target.value).map((result) => result.item)
        );
    };

    return (
        <Input
            prefix={suffix}
            size="large"
            placeholder="Find crypto ..."
            allowClear
            type="text"
            value={query}
            onChange={handleSearch}
            style={{ width: "100%" }}
            className="w-full"
        />
    );
};

export default SearchComponent;
