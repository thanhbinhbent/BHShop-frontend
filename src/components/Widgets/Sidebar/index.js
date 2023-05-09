import { Menu, Col } from 'antd';
import { MenuProps } from 'antd/es/menu';
import './Sidebar.css';
function Sidebar() {
    const items = [
        {
            label: (
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Bánh mì</span>
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
                    <span>Nước giải khát</span>
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
                    <span>Trái cây và rau quả</span>
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
                    <span>Đồ ăn nhẹ</span>
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
