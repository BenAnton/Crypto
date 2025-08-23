import {useEffect, useState} from "react";

interface ExchangeRates {
    usd: number;
    gbp: number;
}

const formatLargeNumber = (num: number): string => {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(1) + "T";
    }
    if (num >= 1e9){
        return (num / 1e9).toFixed(1) + "B";
    }
    if (num >= 1e6){
        return (num / 1e6).toFixed(1) + "M";
    }
    if (num >= 1e3){
        return (num / 1e3).toFixed(1) + "K";
    }
    return num.toFixed(1);
};

export const useCurrencyConvertor = () => {
    const [exchangeRate, setExchangeRate] = useState<ExchangeRates>({ usd: 1, gbp: 1 });
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
                const data = await response.json();

                setExchangeRate({
                    usd: 1,
                    gbp: data.rates.GBP
                });
                setLoading(false);
            } catch (error) {
                console.error("failed to fetch exchange rates", error);
                setExchangeRate({usd: 1, gbp: 0.8});
                setLoading(false);
            }
        };
        fetchExchangeRates();
        
        const interval = setInterval(fetchExchangeRates, 3600000);
        
        return () => clearInterval(interval); {}
        }, [] );
    
    const convertFromUSD = (usdAmount: number, toCurrency: "gbp" | "usd"): number => {
        if (toCurrency === "usd") {
            return usdAmount;
        }
        return usdAmount * exchangeRate.gbp;
}

    const getDisplayPrice = (usdPrice: number, currency: "usd" | "gbp") => {
        const convertedPrice = convertFromUSD(usdPrice, currency);
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase()
        }).format(convertedPrice);
    }
    
    const getDisplayLargeNumber = (usdAmount: number, currency: "usd" | "gbp") => {
        const convertedAmount = convertFromUSD(usdAmount, currency);;
        const symbol = currency === "usd" ? "$" : "£";
        return `${symbol}${formatLargeNumber(convertedAmount)}`;
    };
    
    const getDisplayPercentage = (percentage: number) => {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,   
        }).format(percentage) + "%";
    }

    return {
        convertFromUSD,
        exchangeRate,
        loading,
        getDisplayPrice,
        getDisplayLargeNumber,
        getDisplayPercentage,
    }}  