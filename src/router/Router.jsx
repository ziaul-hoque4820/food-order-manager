import { createBrowserRouter } from "react-router-dom";
import CustomerLayout from "../layout/CustomerLayout";
import CustomerHome from "../pages/customer/CustomerHome";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: CustomerLayout,
        children: [
            {
                index: true,
                Component: CustomerHome,
            }
        ]
    }
])