import {createContext, useContext, useState, useEffect} from 'react';
import {useCurrency} from "./currencyContext";
import type {ReactNode} from "react";

interface CoinListCoin {
    "id": string,
    "symbol": string,
    "name": string,
    "image": string,
    "current_price": number,
    "market_cap": number,
    "market_cap_rank": number,
    "fully_diluted_valuation": number | null,
    "total_volume": number,
    "high_24h": number,
    "low_24h": number,
    "price_change_24h": number,
    "price_change_percentage_24h": number,
    "market_cap_change_24h": number,
    "market_cap_change_percentage_24h": number,
    "circulating_supply": number,
    "total_supply": number | null,
    "max_supply": number | null,
    "ath": number,
    "ath_change_percentage": number,
    "ath_date": string,
    "atl": number,
    "atl_change_percentage": number,
    "atl_date": string,
    "roi": null,
    "last_updated": string
}

interface CoinsContextValue {
    coins: CoinListCoin[];
    loading: boolean;
    error: string | null;
}

const CoinsContext = createContext<CoinsContextValue | undefined>(undefined);

export const CoinsProvider = ({ children }: {children: ReactNode }) => {
    const [coins, setCoins] = useState<CoinListCoin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {currency} = useCurrency();
    
    
    useEffect(() => {
        fetch(`http://localhost:5050/coins/coingecko?currency=${currency}`)
            .then((res) => {
                if (!res.ok) throw new Error ("Failed to fetch data");
                return res.json();
            })
            .then((data: CoinListCoin[]) => {
                setCoins(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [currency]);
    
    return (
        <CoinsContext.Provider value={{coins, loading, error}}>{children}</CoinsContext.Provider>
    );
};
    
    export const useCoins  = () => {
        const context = useContext(CoinsContext);
        if (!context) {
            throw new Error("useCoins must be used within a CoinsProvider");
        }
        return context;
    };