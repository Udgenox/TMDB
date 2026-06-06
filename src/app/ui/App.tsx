import {useAppSelector} from "@/app/store";
import {Header} from "@/common/components";
import {Footer} from "@/common/components/Footer/Footer";
import {LinearProgress} from "@/common/components/LinearProgress/LinearProgress";
import {useGlobalLoading} from "@/common/hooks/useGlobalLoading";
import {Routing} from "@/common/routing";
import {useEffect} from 'react';

export const App = () => {
    const {isDark} = useAppSelector((state) => state.theme);
    const isGlobalLoading = useGlobalLoading();

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
            {isGlobalLoading && <LinearProgress height={4} />}
            <Header/>
            <main style={{flex: 1}}>
                <Routing/>
            </main>
            <Footer/>
        </div>
    );
};