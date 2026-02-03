import { Children, createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [intent, setIntent] = useState(null);
    const [cart, setCart] = useState([]);

    const value = {
        intent,
        setIntent,
        cart,
        setCart,
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export function useOrder() {
    return useContext(OrderContext);
};