import {useEffect} from 'react'
import {StatusBar} from '@capacitor/status-bar'
import {Navigate, Route, Routes} from 'react-router-dom'
import Atlas from "./pages/Atlas"
import AtlasDetail from "./pages/AtlasDetail"
import Profile from "./pages/Profile"
import Sleep from "./pages/Sleep"
import SleepData from "./pages/SleepData"
import Settings from "./pages/Settings.jsx";
import Home from "./pages/Home.jsx";
import Focus from "./pages/Focus.jsx";
import UiTest from "./pages/UiTest.jsx";

export default function App() {
    useEffect(() => {
        const setupStatusBar = async () => {
            await StatusBar.setBackgroundColor({color: '#FFFFFF'});
            // 让状态栏覆盖在 Webview 上（这样背景色可以统一）
            await StatusBar.setOverlaysWebView({overlay: false});
            // 设置文字颜色
            await StatusBar.setStyle('DARK');
        };
        setupStatusBar();
    }, []);
    return (
        <div className={"app-container"}>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/atlas" element={<Atlas/>}/>
                <Route path="/atlas/:code" element={<AtlasDetail/>}/>
                <Route path="/sleep" element={<Sleep/>}/>
                <Route path="/sleep/data" element={<SleepData/>}/>
                <Route path="/me" element={<Profile/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/focus" element={<Focus/>}/>
                <Route path="/ui-test" element={<UiTest/>}/>
            </Routes>
        </div>
    );
}
