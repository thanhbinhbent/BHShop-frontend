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
                                <a onClick={() => navigate('/shop',{state: { id: '64114ce137a2db2927a2aa74', name: 'Bánh mì' }})} target="_parent">
                                    Bánh mì
                                </a>
                            ),
                            key: 'setting:1',
                        },
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Sản phẩm bơ sữa
                                </a>
                            ),
                            key: 'setting:2',
                        },
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Đồ ăn nhẹ
                                </a>
                            ),
                            key: 'setting:3',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'Thực phẩm',
                    children: [
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Trái cây và rau quả
                                </a>
                            ),
                            key: 'setting:4',
                        },
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Thịt và hải sản
                                </a>
                            ),
                            key: 'setting:5',
                        },
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Thực phẩm đóng hộp và đóng gói
                                </a>
                            ),
                            key: 'setting:6',
                        },
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Thực phẩm đông lạnh
                                </a>
                            ),
                            key: 'setting:7',
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
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Nước giải khát
                                </a>
                            ),
                            key: 'setting:8',
                        },
                    ],
                },
                {
                    type: 'group',
                    label: 'Khác',
                    children: [
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Đồ làm bánh
                                </a>
                            ),
                            key: 'setting:9',
                        },
                        {
                            label: (
                                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_parent">
                                    Gia vị và nước sốt
                                </a>
                            ),
                            key: 'setting:10',
                        },
                    ],
                },
            ],
        },
        {
            label: (
                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_blank" rel="noopener noreferrer">
                    Chương trình ưu đãi
                </a>
            ),
            key: 'gift',
            icon: <GiftOutlined style={{ fontSize: '1.8rem' }} />,
            danger: true,
        },
        {
            label: (
                <a onClick={() => navigate('/shop',{state: { id: 7, name: 'green' }})} target="_blank" rel="noopener noreferrer">
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
