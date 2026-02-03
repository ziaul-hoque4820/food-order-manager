import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import CustomerHome from "../pages/customer/CustomerHome";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: CustomerHome,
            }
        ]
    }
])