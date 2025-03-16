"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { Input, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Exchange } from "@prisma/client";
import { set } from "lodash";

interface CryptoCsvTransactionFormProps {
    exchanges: Exchange[];
}

const CryptoCsvTransactionForm: React.FC<CryptoCsvTransactionFormProps> = ({ exchanges }) => {
    const [exchangesValue, setExchangesValue] = React.useState<{ value: string; label: string }[]>([]);
    React.useEffect(() => {
        // setExchangesValue(exchanges.map((exchange) => ({ value: exchange.id, label: exchange.name })));
        const res = exchanges.map((exchange) => {
            return { value: exchange.id, label: exchange.name };
        });
        setExchangesValue(res);
    }, [exchanges]);

    const form = useForm({
        defaultValues: {
            amount: 0,
            price: 0,
            exchange: { value: exchanges[0].id, label: exchanges[0].name },
        },
        onSubmit: ({ value }) => {
            console.log("Submitted values:");
            console.log(value);
            console.log(JSON.stringify(value, null, 2));
        },
    });

    return (
        <form
            className="w-3/4 mx-auto"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.Field
                validators={{
                    // We can choose between form-wide and field-specific validators
                    onChange: ({ value }) => {
                        if (value === 0) return "field is required";
                        if (value >= 2) return "lenght is greater then 2";
                    },
                }}
                name="amount"
                children={(field) => (
                    <>
                        <Input
                            type="number"
                            placeholder="Coin amount ..."
                            prefix={<UserOutlined />}
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                        {field.state.meta.errors.length ? <em>{field.state.meta.errors.join(",")}</em> : null}
                    </>
                )}
            />
            <form.Field
                validators={{
                    // We can choose between form-wide and field-specific validators
                    onChange: ({ value }) => {
                        if (value === 0) return "field is required";
                        if (value >= 2) return "lenght is greater then 2";
                    },
                }}
                name="price"
                children={(field) => (
                    <>
                        <Input
                            type="number"
                            placeholder="Coin price ..."
                            prefix={<UserOutlined />}
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                        {field.state.meta.errors.length ? <em>{field.state.meta.errors.join(",")}</em> : null}
                    </>
                )}
            />

            <form.Field
                name="exchange"
                children={(field) => (
                    <Select defaultValue={exchangesValue[0]} value={field.state.value} onChange={field.handleChange} options={exchangesValue} />
                )}
            />
            <button onClick={form.handleSubmit}>Submit</button>
        </form>
    );
};

export default CryptoCsvTransactionForm;
