import HomePage from '@/pages/Home';
import Profile from '@/pages/Profile';
import Page404 from '@/pages/Page404';
import Account from '@/pages/Account';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/profile', component: Profile },
    { path: '/account', component: Account },
    { path: '*', component: Page404 },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
