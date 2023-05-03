import HomePage from '@/pages/Home';
import Profile from '@/pages/Profile';
import Page404 from '@/pages/Page404';
import Account from '@/pages/Account';
import Shop from '@/pages/Shop';
import Tracking from '@/pages/Tracking';
import MyAccount from '@/components/Widgets/MyAccount';
import MyOrders from '@/components/Widgets/MyOrders';
import Addresses from '@/components/Widgets/Addresses';
import Wishlist from '@/components/Widgets/Wishlist';
import Cart from '@/pages/Cart';
import CheckOut from '@/pages/CheckOut';
import OrderReceive from '@/pages/OrderReceive';
import ProductItemDetail from '@/components/ProductItemDetail';
const publicRoutes = [
    { path: '/', component: HomePage},
    { path: '/products/*', component: ProductItemDetail,},
    { path: '/products/:product_id', component: ProductItemDetail},
    {
        
        path: '/profile/*',
        component: Profile,
        children: [
            { path: '', element: <MyAccount /> },
            { path: 'account', element: <MyAccount /> },
            { path: 'address', element: <Addresses /> },
            { path: 'order', element: <MyOrders /> },
            { path: 'love', element: <Wishlist /> },
        ],
    },
    { path: '/account', component: Account },
    { path: '/shop', component: Shop },
    { path: '/cart', component: Cart },
    { path: '/checkout/*', component: CheckOut },
    { path: '/order-received', component: OrderReceive },
    { path: '/item-detail', component: ProductItemDetail },
    { path: '*', component: Page404 },
    {
        path: '/tracking',
        component: Tracking,
    },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
