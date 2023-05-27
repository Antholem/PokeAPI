import { Routes, Route } from 'react-router-dom';
import Pokemon from './pages/Pokemon';
import Moves from './pages/Moves';
import SideBar from './SideBar';
import Test from './pages/Test';

const MenuRoutes = () => {
    return(
        <Routes>
            <Route element={<SideBar />}>
                <Route path='/' element={<Pokemon />} />
                <Route path='moves' element={<Moves />} />
                <Route path='test' element={<Test />} />
            </Route>
        </Routes>
    )
}

export default MenuRoutes;