import { Radio, Tabs } from 'antd';
import MyAccount from '@/components/Widgets/MyAccount';
import MyOrders from '@/components/Widgets/MyOrders';
import Addresses from '@/components/Widgets/Addresses';
import Wishlist from '@/components/Widgets/Wishlist';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
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
    const handleTabClick = (key) => {
        navigate(`/profile/${key}`);
    };
    return (
        <div className="profile-container container">
            <Tabs
                items={tabs.map((tab) => {
                    return {
                        label: tab.label,
                        key: tab.key,
                        children: tab.children,
                    };
                })}
                type="card"
                onTabClick={handleTabClick}
            />
        </div>
    );
}

export default Profile;
