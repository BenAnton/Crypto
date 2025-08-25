import {createContext, useContext, useState, ReactNode} from 'react';

interface AlertData {
    title: string,
    message: string,
}

interface AlertContextType {
    alert: AlertData | null,
    isOpen: boolean,
    showAlert: (title: string, message: string) => void,
    closeAlert: () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({children}: {children: ReactNode}) => {
    const [alert, setAlert] = useState<AlertData | null>(null);
    const [isOpen, setIsOpen] = useState(false);


    const showAlert = (title: string, message: string) => {
        setAlert({title, message});
        setIsOpen(true);
    };

    const closeAlert = () => {
        setIsOpen(false);
    };

    return (
        <AlertContext.Provider value={{
            alert,
            isOpen,
            showAlert,
            closeAlert
        }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within a AlertProvider");
    }
    return context;
};