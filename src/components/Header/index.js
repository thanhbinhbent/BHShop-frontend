import React from 'react';
import { AudioOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Select, Input, Row, Col, Avatar, Badge, theme, Tooltip } from 'antd';
import TopNavbar from '../TopNavbar';
import CartModal from '../CartModal';
import { handleMoney } from '@/utils';

import './Header.css';
import SourceImg from '@/assets/images';
// import demo data
import cartData from '@/data/cartdemo.json';

function Header() {
    // Custom theme
    const { useToken } = theme;
    const { token } = useToken();
    //Search Variable
    const { Search } = Input;
    // Voice Search icon
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: token.colorPrimary,
            }}
        />
    );

    // Count of Cart Items
    let cartAmount = cartData.length;

    // Search Handle
    const onSearch = (value) => console.log(value);
    // Format Money
    const totalCart = cartData.reduce((sum, object) => {
        console.log(sum);
        return sum + object.price * object.quantity;
    }, 0);
    // console.log(totalCart);
    // Handle CartModal

    return (
        <header className="header-container">
            <div className="header-top">
                <div className="container">
                    <div className="col col-left">
                        <nav className="menu-top__container">
                            <ul className="header-top__menu">
                                <li className="menu-top__item">
                                    <a href="/">Giới thiệu</a>
                                </li>
                                <li className="menu-top__item">
                                    <a href="/">Tài khoản</a>
                                </li>
                                <li className="menu-top__item">
                                    <a href="/"> Sản phẩm yêu thích</a>
                                </li>
                                <li className="menu-top__item">
                                    <a href="/">Tra cứu đơn hàng</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col col-right">
                        <div className="header-top__action">
                            <span className="header-top__phone">
                                Tổng đài hỗ trợ: <a href="tel:19006128">19006128</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-main">
                <Row className="container" align="middle" justify="space-between">
                    <Col className="col col-left">
                        <div className="header-logo__site">
                            <a href="/">
                                <img src={SourceImg.logoWeb} alt="" />
                            </a>
                        </div>
                    </Col>
                    <Row className="col col-center">
                        <Col className="header-location">
                            <Select
                                defaultValue="Chọn chi nhánh"
                                style={{ width: 140 }}
                                size="large"
                                options={[
                                    { value: '', label: '--Chi nhánh--', disabled: true },
                                    { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
                                    { value: 'Hà Nội', label: 'Hà Nội' },
                                    { value: 'Đà Nẵng', label: 'Đà Nẵng' },
                                    { value: 'Cần Thơ', label: 'Cần Thơ' },
                                ]}
                            />
                        </Col>
                        <Col className="header-search">
                            <Search
                                placeholder="Nhập tên sản phẩm..."
                                enterButton="Tìm kiếm"
                                size="large"
                                suffix={suffix}
                                onSearch={onSearch}
                                style={{}}
                            />
                        </Col>
                    </Row>
                    <Col className="col col-right">
                        <Row className="header-action" justify="center" align="middle">
                            <Col className="header-user">
                                <Avatar size="large" icon={<UserOutlined />} />
                            </Col>
                            <Row className="header-cart">
                                <Tooltip
                                    overlayClassName="header-cart__tooltip"
                                    placement="bottom"
                                    title={CartModal}
                                    color="white"
                                >
                                    <Row>
                                        <Col className="header-cart__total">
                                            <div>
                                                <span>{handleMoney(totalCart)}</span>
                                            </div>
                                        </Col>
                                        <Col className="header-cart__list">
                                            <Badge count={cartAmount}>
                                                <Row
                                                    justify="center"
                                                    align="middle"
                                                    className="header-cart__badge"
                                                >
                                                    <ShoppingOutlined
                                                        style={{
                                                            fontSize: '2rem',
                                                            color: '#ea2b0f',
                                                        }}
                                                    />
                                                </Row>
                                            </Badge>
                                        </Col>
                                    </Row>
                                </Tooltip>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Row justify="center" align="center" className="header-nav">
                <TopNavbar justify="center"></TopNavbar>
            </Row>
        </header>
    );
}

export default Header;
