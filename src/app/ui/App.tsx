import {useAppSelector} from "@/app/store";
import {Header} from "@/common/components";
import {Footer} from "@/common/components/Footer/Footer";
import {Routing} from "@/common/routing";
import {useEffect} from 'react';

export const App = () => {
    const {isDark} = useAppSelector((state) => state.theme);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Header/>
            <main style={{flex: 1}}>
                <Routing/>
            </main>
            <Footer/>
        </div>
    );
};