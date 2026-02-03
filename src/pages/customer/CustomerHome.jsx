import React from 'react'
import { useOrder } from '../../context/OrderContext';
import IntentSelector from '../../components/intent/IntentSelector';
import MainMenu from '../../components/menu/MainMenu';

function CustomerHome() {
    const { intent } = useOrder();

    if (!intent) {
        return <IntentSelector />
    }

    return <MainMenu />
}

export default CustomerHome