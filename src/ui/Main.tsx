import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import PopupWindow from "./components/PopupWindow.tsx";
import NormalWindow from "./components/NormalWindow.tsx";

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/popupwindow" element={<PopupWindow />} />
            <Route path="/normalwindow" element={<NormalWindow />} />
        </Routes>
    </HashRouter>
)
