import { Menu, Col } from 'antd';
import { MenuProps } from 'antd/es/menu';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate = useNavigate();
    const items = [
        {
            label: (
                <a
                    onClick={() => navigate('/shop', { state: { name: 'Bánh mì' } })}
                    target="_self"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Bánh mì</span>
                </a>
            ),
            key: 'Bánh mì',
        },
        {
            label: (
                <a
                    onClick={() =>
                        navigate('/shop', {
                            state: { name: 'Nước giải khát' },
                        })
                    }
                    target="_self"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Nước giải khát</span>
                </a>
            ),
            key: 'Nước giải khát',
        },
        {
            label: (
                <a
                    onClick={() =>
                        navigate('/shop', {
                            state: { name: 'Trái cây và rau quả' },
                        })
                    }
                    target="_self"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Trái cây và rau quả</span>
                </a>
            ),
            key: 'Trái cây và rau quả',
        },
        {
            label: (
                <a
                    onClick={() =>
                        navigate('/shop', {
                            state: { name: 'Đồ ăn nhẹ' },
                        })
                    }
                    target="_self"
                    rel="noopener noreferrer"
                    className="sidebar__category--ranking"
                >
                    <img src="/img/icon/top-icon.png" alt="" />
                    <span>Đồ ăn nhẹ</span>
                </a>
            ),
            key: 'Đồ ăn nhẹ',
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
