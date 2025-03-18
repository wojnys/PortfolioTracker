"use client";
import Papa from "papaparse";
import React, { useState } from "react";

interface CsvToJsonProps {
    parsedJsonData: (data: any[]) => void;
}

const CsvToJson: React.FC<CsvToJsonProps> = ({ parsedJsonData }) => {
    const [jsonData, setJsonData] = useState<any[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true, // Parses the first row as object keys
            skipEmptyLines: true,
            complete: (result) => {
                console.log("Parsed JSON:", result.data);
                setJsonData(result.data);
                parsedJsonData(result.data);
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
            },
        });
    };

    return (
        <div>
            <h2>Upload CSV and Convert to JSON</h2>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            {/* <pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
        </div>
    );
};

export default CsvToJson;
