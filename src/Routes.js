import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Pokedex from './pages/Pokedex';
import Abilities from './pages/Abilities';
import Items from './pages/Item';
import Moves from './pages/Moves';
import Settings from './pages/Settings';

// Define an array of routes with their respective paths and elements
const router = [
    { path: '/', element: <Pokedex /> },
    { path: '/abilities', element: <Abilities /> },
    { path: '/items', element: <Items /> },
    { path: '/moves', element: <Moves /> },
    { path: '/settings', element: <Settings /> },
]

const MenuRoutes = () => {
    return (
        <Routes>
            <Route element={<SideBar />}>
                {/* Iterate over the router array and create a Route for each item */}
                {router.map((item) => (
                    <Route path={item.path} element={item.element} />
                ))}
            </Route>
        </Routes>
    )
}

export default MenuRoutes;
