import HomePage from '@/pages/Home';
import Profile from '@/pages/Profile';
import Page404 from '@/pages/Page404';
import Account from '@/pages/Account';
import Tracking from '@/pages/Tracking';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/profile', component: Profile },
    { path: '/account', component: Account },
    { path: '*', component: Page404 },
    {
        path: '/tracking',
        component: Tracking,
    },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
