import React, { useState } from 'react';
import { Menu } from 'antd';
import {
    RestOutlined,
    InboxOutlined,
    FileProtectOutlined,
    GiftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Import Fake Data

function TopNavbar() {
    const navigate = useNavigate();
    const items = [
        {
            label: (
                <a onClick={() => navigate('/')} target="_self" rel="noopener noreferrer">
                    Trang chủ
                </a>
            ),
            key: 'home',
            icon: '',
        },
        {
            label: 'Thực phẩm đóng gói',
            key: 'food',
            icon: <InboxOutlined style={{ fontSize: '1.8rem' }} />,
            children: [
                {
                    type: 'group',
                    label: 'Đồ ăn nhanh',
                    children: [
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', { state: { name: 'Bánh mì' } })
                                    }
                                    target="_self"
                                >
                                    Bánh mì
                                </a>
                            ),
                            key: 'Bánh mì',
                        },
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: { name: 'Sản phẩm bơ sữa' },
                                        })
                                    }
                                    target="_self"
                                >
                                    Sản phẩm bơ sữa
                                </a>
                            ),
                            key: 'Sản phẩm bơ sữa',
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
                                >
                                    Đồ ăn nhẹ
                                </a>
                            ),
                            key: 'Đồ ăn nhẹ',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'Thực phẩm',
                    children: [
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: { name: 'Trái cây và rau quả' },
                                        })
                                    }
                                    target="_self"
                                >
                                    Trái cây và rau quả
                                </a>
                            ),
                            key: 'Trái cây và rau quả',
                        },
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: { name: 'Thịt và hải sản' },
                                        })
                                    }
                                    target="_self"
                                >
                                    Thịt và hải sản
                                </a>
                            ),
                            key: 'Thịt và hải sản',
                        },
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: {
                                                name: 'Thực phẩm đóng hộp và đóng gói',
                                            },
                                        })
                                    }
                                    target="_self"
                                >
                                    Thực phẩm đóng hộp và đóng gói
                                </a>
                            ),
                            key: 'Thực phẩm đóng hộp và đóng gói',
                        },
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: { name: 'Thực phẩm đông lạnh' },
                                        })
                                    }
                                    target="_self"
                                >
                                    Thực phẩm đông lạnh
                                </a>
                            ),
                            key: 'Thực phẩm đông lạnh',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Đồ uống',
            key: 'drink',
            icon: <RestOutlined style={{ fontSize: '1.8rem' }} />,
            children: [
                {
                    type: 'group',
                    label: 'Nước',
                    children: [
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: { name: 'Nước giải khát' },
                                        })
                                    }
                                    target="_self"
                                >
                                    Nước giải khát
                                </a>
                            ),
                            key: 'Nước giải khát',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'Khác',
                    children: [
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: { name: 'Đồ làm bánh' },
                                        })
                                    }
                                    target="_self"
                                >
                                    Đồ làm bánh
                                </a>
                            ),
                            key: 'Đồ làm bánh',
                        },
                        {
                            label: (
                                <a
                                    onClick={() =>
                                        navigate('/shop', {
                                            state: { name: 'Gia vị và nước sốt' },
                                        })
                                    }
                                    target="_self"
                                >
                                    Gia vị và nước sốt
                                </a>
                            ),
                            key: 'Gia vị và nước sốt',
                        },
                    ],
                },
            ],
        },
        {
            label: (
                <a
                    onClick={() => navigate('/shop', { state: { name: 'green' } })}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Chương trình ưu đãi
                </a>
            ),
            key: 'gift',
            icon: <GiftOutlined style={{ fontSize: '1.8rem' }} />,
            danger: true,
        },
        {
            label: (
                <a
                    onClick={() => navigate('/shop', { state: { name: 'green' } })}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Blog
                </a>
            ),
            key: 'blog',
            icon: <FileProtectOutlined style={{ fontSize: '1.8rem' }} />,
        },
    ];
    const [current, setCurrent] = useState('home');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Menu
            selectable="true"
            className="header-nav__list"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
}

export default TopNavbar;
