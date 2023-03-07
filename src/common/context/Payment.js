import { createContext, useContext, useState } from 'react';

export const PaymentContext = createContext();
PaymentContext.displayName = 'PaymentContext';

export const PaymentProvider = ({ children }) => {
    const paymentTypes = [
        {
            name: "Boleto",
            fees: 1,
            id: 1
        },
        {
            name: "Cartão de Crédito",
            fees: 1.3,
            id: 2
        },
        {
            name: "Cartão de Débito",
            fees: 1.1,
            id: 3
        },
        {
            name: "Pix",
            fees: 1,
            id: 4
        },
        {
            name: "Transferência Bancária",
            fees: 1.2,
            id: 5
        },
        {
            name: "Dinheiro",
            fees: 1,
            id: 6
        },
        {
            name: "Cheque",
            fees: 1.1,
            id: 7
        },
        {
            name: "Crediário",
            fees: 1.7,
            id: 8
        }

    ]
    const [payment, setPayment] = useState(paymentTypes[0]);
    return (
        <PaymentContext.Provider value={{payment, setPayment, paymentTypes}}>
            {children}
        </PaymentContext.Provider>
    );
}

export const usePaymentContext = () => {
    const {paymentTypes, payment, setPayment} = useContext(PaymentContext);

    function handlePaymentChange(id) {
        const actualPayment = paymentTypes.find((paymentType) => paymentType.id === id);
        setPayment(actualPayment);
    }

    return {paymentTypes, payment, handlePaymentChange};
}