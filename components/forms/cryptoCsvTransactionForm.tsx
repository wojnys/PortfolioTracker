"use client";
import React from "react";
import { useForm } from "@tanstack/react-form";
import { Exchange } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomSelect from "./select";
import CsvToJson from "../csv-to-json";
import axios from "axios";

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
            parsedJsonData: [] as any[],
        },
        onSubmit: async ({ value }) => {
            console.log("Submitted values:");
            console.log(value);
            console.log(JSON.stringify(value, null, 2));

            // create call
            const formData = new FormData();
            formData.append("amount", value.amount.toString());
            formData.append("price", value.price.toString());
            formData.append("exchange", JSON.stringify(value.exchange.value));

            if (value.parsedJsonData.length > 0) {
                // const blob = new Blob([JSON.stringify(value.parsedJsonData)], { type: "application/json" });
                value.parsedJsonData.forEach((data) => {
                    console.log(data);
                });
                // formData.append("file", blob);
            }

            console.log(formData.get("amount"));

            try {
                const response = await axios.post("/api/transaction", {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    data: {
                        userId: 1,
                        amount: value.amount,
                        price: value.price,
                        exchangeId: value.exchange.value,
                        parsedJsonData: value.parsedJsonData,
                    },
                });
                const data = response.data;

                console.log(data);
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
    });

    const handleParsedData = (data: any[]) => {
        form.setFieldValue("parsedJsonData", data);
    };

    return (
        <form
            className="w-3/4 mx-auto p-4"
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
                            name={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                        {field.state.meta.errors.length ? <em>{field.state.meta.errors.join(",")}</em> : null}
                    </>
                )}
            />

            <form.Field name="exchange" children={(field) => <CustomSelect options={exchangesValue} label="Exchange" />} />

            <form.Field name="parsedJsonData" children={(field) => <CsvToJson parsedJsonData={handleParsedData} />} />
            <Button onClick={form.handleSubmit}>Submit</Button>
        </form>
    );
};

export default CryptoCsvTransactionForm;
