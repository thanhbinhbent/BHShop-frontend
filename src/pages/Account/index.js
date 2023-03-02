import { Tabs } from 'antd';
import LoginForm from '@/components/Widgets/LoginForm';
import SignupForm from '@/components/Widgets/SignupForm';
import './Account.css';

function Account(props) {
    const tabs = [
        { key: 'login', label: 'Đăng nhập', children: <LoginForm /> },
        { key: 'signup', label: 'Đăng ký', children: <SignupForm /> },
    ];

    return (
        <div className="container">
            <div className="account-container">
                <Tabs items={tabs} type="card"></Tabs>
            </div>
        </div>
    );
}

export default Account;
