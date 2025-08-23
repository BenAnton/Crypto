import {createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from "react";

type currency = "usd" | "gbp";

interface currencyContextType {
    currency: currency,
    setCurrency: (currency: currency) => void;
}

const CurrencyContext = createContext<currencyContextType | undefined>(undefined);

export const CurrencyProvider = ({children}: {children: ReactNode}) => {
    const [currency, setCurrency] = useState<currency>(() => {

        const saved = localStorage.getItem("currency");
        return (saved === "usd" || saved === "gbp") ? saved : "usd";  
    });

useEffect(() => {
    localStorage.setItem('currency', currency);
}, [currency]);

return (
    <CurrencyContext.Provider value={{currency, setCurrency}}>
        {children}
    </CurrencyContext.Provider>
);
};


export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};