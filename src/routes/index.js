import HomePage from '@/pages/Home';
import Profile from '@/pages/Profile';
import Page404 from '@/pages/Page404';
import Account from '@/pages/Account';
import Shop from '@/pages/Shop';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/profile', component: Profile },
    { path: '/account', component: Account },
    { path: '/shop', component: Shop },
    { path: '*', component: Page404 },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
