import React, { useEffect, useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Loading from '../components/Loading';
import Navbar from '../pages/shared/Navbar';

function RootLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingComplete(true);

            // Remove loader after animation completes
            setTimeout(() => {
                setInitialLoading(false);
            }, 700);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (initialLoading) {
        return <Loading isComplete={loadingComplete} />;
    }

    return (
        <>
            {isLoading && <Loading isComplete={false} />}
            <div>
                <header>
                    <Navbar />
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default RootLayout