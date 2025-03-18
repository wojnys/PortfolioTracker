import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

interface CustomSelectProps {
    options: { value: string; label: string }[];
    label: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, label }) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option: { value: string; label: string }) => {
                        return (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default CustomSelect;
