import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/muscle-learner-web">
            <App />
        </BrowserRouter>
    </StrictMode>,
);