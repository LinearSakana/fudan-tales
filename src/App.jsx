import {useEffect} from 'react'
import {StatusBar} from '@capacitor/status-bar'
import {Navigate, Route, Routes} from 'react-router-dom'
import Atlas from "./pages/Atlas"
import AtlasDetail from "./pages/AtlasDetail"
import Profile from "./pages/Profile"
import SleepMonitor from "./pages/SleepMonitor"

export default function App() {
    useEffect(() => {
        const hideSystemNavBar = async () => {
            await StatusBar.setOverlaysWebView({overlay: true});
            await StatusBar.setStyle({style: 'DARK'});
        };

        hideSystemNavBar(); // 隐藏导航栏
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/atlas" replace/>}/>
            <Route path="/atlas" element={<Atlas/>}/>
            <Route path="/atlas/:code" element={<AtlasDetail/>}/>
            <Route path="/sleep" element={<SleepMonitor/>}/>
            <Route path="/me" element={<Profile/>}/>
        </Routes>
    );
}
