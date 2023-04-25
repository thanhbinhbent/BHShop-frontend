import VerticalSearchBar from '@/components/VerticalSearchBar';
import VerticalBanner from '@/components/VerticalBanner';
import SourceImg from '@/assets/images';
import { MenuOutlined, HolderOutlined } from '@ant-design/icons';
import './SearchByFilter.css';
import React, { useState, useEffect } from 'react';
import SpinLoading from '@/components/SpinLoading';
import ProductItem from '@/components/ProductItem';
import RecentlyViewProduct from '@/components/RecentlyViewProduct';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';
import { Breadcrumb } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';

function Shop() {
    const [state, setState] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get('/data/products.json')
            .then((res) => {
                setLoading(false);
                return setState(res.data);
            })
            .catch((err) => {
                setHasError(true);
                setLoading(false);
            });
    }, []);
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`);
    };
    const items = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    const quantity = [
        {
            label: '6',
            key: '1',
        },
        {
            label: '12',
            key: '2',
        },
        {
            label: '20',
            key: '3',
        },
    ];
   
    return (
        
        <div>
            <div>
                <Breadcrumb
                        items={[
                            {
                                title: 'Home',
                            },
                            {
                                title: <a href="#">Application Center</a>,
                            }
                        ]}
                    />
                </div>

            <div className="container">
                <div className="home-container">
                
                    <div className="home-col home-col--left">
                        <VerticalSearchBar></VerticalSearchBar>
                        <div className="home-banner__container home-banner--vertical">
                            <VerticalBanner
                                uri="thanhbinhbent.com"
                                imgUrl={SourceImg.bannerleft1}
                                title={'Bánh ngon độc lạ'}
                                value={'-20%'}
                                description={'Giảm giá nhân ngày 8/3'}
                            ></VerticalBanner>
                            <VerticalBanner
                                uri="thanhbinhbent.com"
                                className="home-banner--vertical"
                                imgUrl={SourceImg.bannerleft2}
                                title={'Bánh ngon độc lạ'}
                                value={'-20%'}
                                description={'Giảm giá nhân ngày 8/3'}
                            ></VerticalBanner>
                        </div>
                    </div>
                    <div className="home-col home-col--right">
                        <div className="right-header_img">
                            <a href="#">
                                <img
                                    src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg"
                                    alt="Organic Meals Prepared"
                                />
                            </a>
                        </div>
                        <div className="right-filter--view">
                            <div className="view-selector">
                                <a href="">
                                    <MenuOutlined />
                                </a>
                                <a href="">
                                    <HolderOutlined />
                                </a>
                            </div>
                            <div className="sort-drop_list">
                                <form action="#" method="get">
                                    <Dropdown
                                        trigger={['click']}
                                        menu={{
                                            items,
                                            onClick,
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                Sort by
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </form>
                            </div>
                            <div className="sort-product--quantity">
                                <span>Show</span>
                                <form action="#" method="get">
                                    <Dropdown
                                        trigger={['click']}
                                        menu={{
                                            quantity,
                                            onClick,
                                        }}
                                    >
                                        <a>
                                            <Space>
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </form>
                            </div>
                        </div>
                        <div className="remove-filter">
                            <ul>
                                <li></li>
                            </ul>
                        </div>
                        <div className="products-container">
                            {loading ? (
                                <SpinLoading></SpinLoading>
                            ) : hasError ? (
                                'Lỗi tải dữ liệu!'
                            ) : (
                                <div className="new-products__list products-list__items">
                                    {state.slice(0, 8).map((products) => (
                                        <ProductItem
                                            key={products.id}
                                            product={products}
                                        ></ProductItem>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <RecentlyViewProduct></RecentlyViewProduct>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shop;
