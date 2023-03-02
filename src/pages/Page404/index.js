import { Button } from 'antd';
import { DoubleLeftOutlined, WarningOutlined } from '@ant-design/icons';
import './Page404.css';
function Page404() {
    return (
        <div className="page404-container">
            <h1 className="page404-title">
                <WarningOutlined className="page404-warning" />
                Lỗi 404 - Không tìm thấy trang được yêu cầu
            </h1>
            <p class="zoom-area">
                Bạn vui lòng kiểm tra lại <b>đường dẫn!</b>
            </p>
            <section class="error-container">
                <span>4</span>
                <span>
                    <span class="screen-reader-text">0</span>
                </span>
                <span>4</span>
            </section>
            <div class="link-container">
                <a href="/" class="more-link">
                    <Button type="primary" ghost>
                        <DoubleLeftOutlined /> Về trang chủ
                    </Button>
                </a>
            </div>
        </div>
    );
}

export default Page404;
