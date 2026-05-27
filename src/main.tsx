import {store} from "@/app/store/store";
import ReactDOM from 'react-dom/client';
import './index.css'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router";
import {App} from "./app/ui/App";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
