import React, { useState, useEffect } from "react";
import type { TableColumnsType, TableProps } from "antd";
import { Table } from "antd";
import { Coin } from "@/types/coinGeckoApiTypes";
import { actionColumn } from "@/types/table";

type OnChange = NonNullable<TableProps<Coin>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface CustomTableProps {
    coinData: Coin[];
    customColumns: string[];
    actionColumnsArr: actionColumn[];
}

const CustomTable: React.FC<CustomTableProps> = ({ coinData, customColumns, actionColumnsArr }) => {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    // Generate columns dynamically
    const generateColumns = (data: Coin[]): TableColumnsType<Coin> => {
        if (!data.length) return [];

        return Object.keys(data[0])
            .filter((key) => customColumns.includes(key))
            .map((key) => ({
                title: key.replace(/_/g, " ").toUpperCase(),
                dataIndex: key as keyof Coin,
                key,
                sorter: (a, b) => {
                    const valA = a[key as keyof Coin];
                    const valB = b[key as keyof Coin];

                    // Auto-detect numbers for sorting
                    if (typeof valA === "number" && typeof valB === "number") {
                        return valA - valB;
                    }

                    // Auto-detect dates
                    if (typeof valA === "string" && typeof valB === "string" && !isNaN(Date.parse(valA)) && !isNaN(Date.parse(valB))) {
                        return new Date(valA).getTime() - new Date(valB).getTime();
                    }

                    // Default to string comparison
                    return String(valA).localeCompare(String(valB));
                },
                sortOrder: sortedInfo.columnKey === key ? sortedInfo.order : null,
                ellipsis: true,
                render: (text) => (key === "image" ? <img src={text} alt="coin" width="32" height="32" /> : text),
                onCell: (record) => ({
                    onClick: () => console.log({ record, key }),
                }),
            }));
    };

    // Generate columns dynamically
    const generateActionColumns = (data: actionColumn[]): TableColumnsType<Coin> => {
        if (!coinData.length) return [];

        return data.map((column) => ({
            title: column.title,
            dataIndex: column.key,
            key: column.key,
            // fixed: "right",
            onCell: (record) => ({
                onClick: () => alert(`Show more info for ${record.name}`),
            }),
            width: 100,
            render: () => <a>detail</a>,
        }));
    };
    const [columns, setColumns] = useState<TableColumnsType<Coin>>([]);
    const [actionColumns, setActionColumns] = useState<TableColumnsType<Coin>>([]);

    useEffect(() => {
        setColumns(generateColumns(coinData));
        setActionColumns(generateActionColumns(actionColumnsArr));
    }, [coinData, sortedInfo]);

    return (
        <Table<Coin>
            columns={[columns, actionColumns].flat()}
            dataSource={coinData}
            onChange={handleChange}
            pagination={{
                defaultPageSize: 40,
                position: ["bottomCenter"],
            }}
        />
    );
};

export default CustomTable;
