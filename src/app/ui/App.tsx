import {Footer} from "@/common/components/Footer/Footer";
import { useState, useEffect } from 'react';
import { Header } from "@/common/components";
import { Routing } from "@/common/routing";

export const App = () => {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <>
            <Header isDark={isDark} setIsDark={setIsDark} />
            <Routing />
            <Footer />
        </>
    );
};