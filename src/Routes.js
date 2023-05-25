import { Routes, Route } from 'react-router-dom';
import Pokemon from './pages/Pokemon';
import Moves from './pages/Moves';
import SideBar from './SideBar';

const MenuRoutes = () => {
    return(
        <Routes>
            <Route element={<SideBar />}>
                <Route path='/' element={<Pokemon />} />
                <Route path='moves' element={<Moves />} />
            </Route>
        </Routes>
    )
}

export default MenuRoutes;