import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from "react-router-dom";
import './css/index.css'
import App from './App.tsx'
import Test from "./components/Test.tsx";

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/popupwindow" element={<Test />} />
        </Routes>
    </HashRouter>
)
