import HomePage from '@/pages/Home';
import Profile from '@/pages/Profile';
import Page404 from '@/pages/Page404';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/profile', component: Profile },
    { path: '*', component: Page404 },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
