import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const PortfolioCard = () => {
    return (
        <Card hoverable cover={<img alt="example" className="w-[200px]" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    );
};

export default PortfolioCard;
