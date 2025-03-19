import { create } from "zustand";

interface CoinState {
    coinName: string;
    coinSymbol: string;
    coinImage: string;
    exchangeName: string;
    initializeCoin: (coin: { name: string; symbol: string; image: string; exchangeName: string }) => void;
}

const useCoinStore = create<CoinState>((set) => ({
    coinName: "",
    coinSymbol: "",
    coinImage: "",
    exchangeName: "",
    initializeCoin: (coin) => set({ coinName: coin.name, coinSymbol: coin.symbol, coinImage: coin.image, exchangeName: coin.exchangeName }),
}));

export default useCoinStore;
