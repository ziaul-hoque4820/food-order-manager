import { Outlet, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../pages/shared/Navbar";
import Footer from "../pages/shared/Footer";
import Loading from "../components/Loading";

export default function CustomerLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingComplete(true);
            setTimeout(() => setInitialLoading(false), 700);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (initialLoading) {
        return <Loading isComplete={loadingComplete} />;
    }

    return (
        <>
            {isLoading && <Loading isComplete={false} />}
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
