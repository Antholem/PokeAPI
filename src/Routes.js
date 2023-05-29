import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Pokedex from './pages/Pokedex';
import TeamBuilder from './pages/TeamBuilder';
import Favorites from './pages/Favorites';
import Comparator from './pages/Comparator';
import Types from './pages/Types';
import Abilities from './pages/Abilities';
import Items from './pages/Item';
import Moves from './pages/Moves';
import Settings from './pages/Settings';

const router = [
    { path: '/', element: <Pokedex /> },
    { path: '/team-builder', element: <TeamBuilder /> },
    { path: '/favorites', element: <Favorites /> },
    { path: '/comparator', element: <Comparator /> },
    { path: '/types', element: <Types /> },
    { path: '/abilities', element: <Abilities /> },
    { path: '/items', element: <Items /> },
    { path: '/moves', element: <Moves /> },
    { path: '/settings', element: <Settings /> },
]

const MenuRoutes = () => {
    return(
        <Routes>
            <Route element={<SideBar />}>
                {router.map((item) => (
                    <Route path={item.path} element={item.element} />
                ))}
            </Route>
        </Routes>
    )
}

export default MenuRoutes;