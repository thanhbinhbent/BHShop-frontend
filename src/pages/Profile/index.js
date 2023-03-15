import { Radio, Tabs } from 'antd';
import MyAccount from '@/components/Widgets/MyAccount';
import MyOrders from '@/components/Widgets/MyOrders';
import Addresses from '@/components/Widgets/Addresses';
import Wishlist from '@/components/Widgets/Wishlist';
import './Profile.css';
function Profile() {
    const tabs = [
        {
            label: 'Tài khoản',
            key: 'account',
            children: <MyAccount />,
        },
        {
            label: 'Đơn hàng',
            key: 'order',
            children: <MyOrders />,
        },
        {
            label: 'Địa chỉ',
            key: 'address',
            children: <Addresses />,
        },
        {
            label: 'Yêu thích',
            key: 'love',
            children: <Wishlist />,
        },
    ];
    return (
        <div className="profile-container container">
            <Tabs defaultActiveKey="account" type="card" size="large" items={tabs} />
        </div>
    );
}

export default Profile;
