import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const PortfolioCard = () => {
    return (
        <Card hoverable>
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    );
};

export default PortfolioCard;
