import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    AudioOutlined,
    UserOutlined,
    ShoppingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import {
    Select,
    Input,
    Row,
    Col,
    Avatar,
    Badge,
    theme,
    Popover,
    Menu,
    Button,
    message,
    Popconfirm,
    Table,
} from 'antd';
import TopNavbar from '@/components/Widgets/TopNavbar';
import CartModal from '@/components/CartModal';
import { handleMoney } from '@/utils';
import './Header.css';
import SourceImg from '@/assets/images';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setUser, setLoggedIn } from '@/actions/userActions';
import { useDispatch } from 'react-redux';
// import demo data

function Header() {
    const { cartItems } = useSelector((state) => state.cart);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const user = useSelector((state) => state.user.user);
    const totalCart = cartItems.reduce((sum, object) => {
        return sum + object.price * object.quantity;
    }, 0);

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
    let cartBadge = cartItems.length;
    // Search Handle
    const onSearch = (value) => {
        console.log(value);
        setFilterInput(value);
    };
    // Format Money
    // const navLeft: MenuProps['items'] = [
    const navLeft = [
        {
            label: 'Giới thiệu',
            key: '0',
            icon: '',
        },
        {
            label: 'Tài khoản',
            key: '1',
            icon: '',
        },
        {
            label: 'Sản phẩm yêu thích',
            key: '2',
            icon: '',
        },
        {
            label: (
                <span>
                    <Link to="/tracking">Tra cứu đơn hàng</Link>
                </span>
            ),
            key: '3',
            icon: '',
        },
    ];
    const navRight = [
        {
            label: (
                <span>
                    Tổng đài hỗ trợ: <a href="tel:19006128">19006128</a>
                </span>
            ),
            key: '1',
            icon: '',
        },
    ];
    const dispatch = useDispatch();
    const onLogOut = () => {
        message.warning('Đăng xuất thành công');
        dispatch(setUser({}));
        dispatch(setLoggedIn(false));
    };
    const [provinces, setProvinces] = useState([]);
    const [productData, setProductData] = useState([]);
    const [filterInput, setFilterInput] = useState('');
    const getProvince = async () => {
        const response = await axios.post('http://localhost:3100/provinces');
        return response.data;
    };
    const getAllProductWithName = async () => {
        const response = await axios.post(
            'http://localhost:3100/products/allWithOnlyName',
        );
        return response.data;
    };
    const filterData = (value) => {
        return productData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()),
        );
    };
    useEffect(() => {
        getProvince().then((res) => {
            setProvinces(res);
        });
        getAllProductWithName().then((res) => {
            setProductData(res);
        });
    }, []);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
    ];
    return (
        <header className="header-container">
            <div className="header-top">
                <div className="container">
                    <div className="header-top__container">
                        <Menu
                            mode="horizontal"
                            className="col col-left"
                            items={navLeft}
                        />
                        <Menu
                            mode="horizontal"
                            className="col col-right"
                            items={navRight}
                        />
                    </div>
                </div>
            </div>
            <div className="header-main">
                <Row className="container" align="middle" justify="space-between">
                    <Col className="col col-left">
                        <div className="header-logo__site">
                            <Link to="/">
                                <img src={SourceImg.logoWeb} alt="" />
                            </Link>
                        </div>
                    </Col>
                    <Row className="col col-center">
                        <Col className="header-location">
                            <Select
                                defaultValue="Chọn chi nhánh"
                                style={{ width: 140 }}
                                size="large"
                                options={provinces}
                            />
                        </Col>
                        <Col className="header-search">
                            <Search
                                placeholder="Nhập tên sản phẩm..."
                                enterButton="Tìm kiếm"
                                size="large"
                                suffix={suffix}
                                onSearch={onSearch}
                                allowClear
                            />
                            <Table
                                className="search-table"
                                columns={columns}
                                dataSource={filterData(filterInput)}
                            />
                        </Col>
                    </Row>
                    <Col className="col col-right">
                        <Row className="header-action" justify="center" align="middle">
                            <Col className="header-user">
                                {isLoggedIn ? (
                                    <Col>
                                        <Link to="/profile">
                                            <span className="logined-name">
                                                Xin chào <b>{user.first_name + ''}</b>!
                                            </span>
                                        </Link>

                                        <Popconfirm
                                            title="Đăng xuất"
                                            description="Bạn có chắc muốn đăng xuất?"
                                            okText="Đăng xuất"
                                            cancelText="Huỷ"
                                            onConfirm={onLogOut}
                                        >
                                            <LogoutOutlined
                                                title="Đăng xuất"
                                                className="logout-btn"
                                            />
                                        </Popconfirm>
                                    </Col>
                                ) : (
                                    <Link to="/account">
                                        <Avatar size="large" icon={<UserOutlined />} />
                                    </Link>
                                )}
                            </Col>

                            <Popover
                                content={<CartModal cartItems={cartItems} />}
                                overlayClassName="header-cart__tooltip"
                            >
                                <Row className="header-cart">
                                    <Row>
                                        <Col className="header-cart__total">
                                            <div>
                                                <span>{handleMoney(totalCart)}</span>
                                            </div>
                                        </Col>
                                        <Col className="header-cart__list">
                                            <Badge count={cartBadge}>
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
                                </Row>
                            </Popover>
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

function mapStateToProps(state) {
    return {
        cartItems: state.cart.cartItems,
    };
}

export default connect(mapStateToProps)(Header);
