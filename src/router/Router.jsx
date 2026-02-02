import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <div>Home Page</div>
            }
        ]
    }
])