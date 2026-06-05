import {store} from "@/app/store/store";
import ReactDOM from 'react-dom/client';
import './index.css'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {App} from "./app/ui/App";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
            <ToastContainer
                position="bottom-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Provider>
    </BrowserRouter>
);
