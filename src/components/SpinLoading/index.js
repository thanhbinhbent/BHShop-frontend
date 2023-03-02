import { Spin } from 'antd';
import './SpinLoading.css';
function SpinLoading() {
    return (
        <div className="spinner-container">
            <Spin size="large" />
        </div>
    );
}

export default SpinLoading;
