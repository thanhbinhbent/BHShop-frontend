import { Menu, Col } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import './Sidebar.css';
function Sidebar() {
    const items: MenuProps['items'] = [
        {
            label: (
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span> Thực phẩm cho trẻ</span>
                </a>
            ),
            key: 'food1',
        },
        {
            label: (
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Thực phẩm dinh dưỡng</span>
                </a>
            ),
            key: 'food2',
        },
        {
            label: (
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Nước uống tăng lực</span>
                </a>
            ),
            key: 'gift',
        },
        {
            label: (
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Bánh dinh dưỡng</span>
                </a>
            ),
            key: 'blog',
        },
    ];

    return (
        <Col className="sidebar-container">
            <h3 className="section-title">
                <img src=" /img/icon/icon-rank.png" alt="" />
                Danh mục thịnh hành
            </h3>
            <Menu
                className="sidebar__menu"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="vertical"
                items={items}
            />
        </Col>
    );
}

export default Sidebar;
