import './Cart.css';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import {
    Empty,
    Button,
    InputNumber,
    Input,
    Progress,
    Table,
    Space,
    Switch,
    Radio,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { updateQuantity, updateTotalPrice, removeFromCart } from '@/actions/cartActions';
import { handleMoney } from '@/utils';
import { useNavigate } from 'react-router-dom';

function Cart(props) {
    const { cartItems, updateQuantity } = props;
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();
    const handleCartClick = () => {
        navigate('/cart');
    };
    const handlePaymentClick = () => {
        if (isLoggedIn) {
            navigate('/checkout');
        } else {
            navigate('/account');
            alert('Vui lòng đăng nhập trước khi thực hiện thanh toán!!!');
        }
    };
    const handleQuantityChange = (productId, quantity) => {
        updateQuantity(productId, quantity);
    };
    // Remove  item
    const handleRemoveItem = (productId) => {
        props.removeFromCart(productId);
    };
    const columns = [
        {
            title: '',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail) => (
                <div className="cart-img__container">
                    <img className="cart-item__img" src={thumbnail} alt="" />
                </div>
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            render: (title) => <p className="product-title">{title}</p>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => handleMoney(price),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity, record) => (
                <InputNumber
                    value={quantity}
                    onChange={(value) => handleQuantityChange(record.id, value)}
                    defaultValue={quantity}
                    min={1}
                    max={100}
                    bordered={false}
                />
            ),
        },
        {
            title: 'Giá thành',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice) => handleMoney(totalPrice),
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <div className="cart-product__delete">
                    <span onClick={() => handleRemoveItem(id)}>
                        <CloseOutlined className="cart__icon--delete" />
                    </span>
                </div>
            ),
        },
    ];

    const data = cartItems.map((item, index) => ({
        key: index,
        thumbnail: item.thumbnail,
        title: item.name || item.title,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        id: item.id,
    }));
    const allTotalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    const footer = () => (
        <tr>
            <td colSpan={2}>
                <Input placeholder="Nhập mã giảm giá tại đây" />
            </td>

            <td>
                <Button type="primary">Sử dụng mã</Button>
            </td>
            <td></td>
            <td colSpan={2}>
                <Button type="primary">Xóa hết</Button>
            </td>
        </tr>
    );
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        if (allTotalPrice > 1000000) {
            setValue(3);
        } else if (value === 3) {
            setValue(1);
        } else {
            setValue(e.target.value);
        }
        console.log('radio checked', e.target.value);
    };

    const data1 = [
        {
            key: '1',
            name: 'Giá trị của giỏ hàng:',
            value: handleMoney(allTotalPrice),
        },
        {
            key: '2',
            name: 'Giao hàng',
            value: (
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Giao hàng nhanh: {handleMoney(15000)}</Radio>
                    <br />
                    <Radio value={2}>Giao hàng hỏa tốc: {handleMoney(50000)}</Radio>
                    <br />
                    <Radio
                        value={3}
                        checked={allTotalPrice > 1000000}
                        disabled={allTotalPrice < 1000000}
                    >
                        Miễn phí giao hàng
                    </Radio>
                </Radio.Group>
            ),
        },
        {
            key: '3',
            name: 'Tổng giá trị:',
            value:
                1000000 - allTotalPrice < 0 ? (
                    <>{handleMoney(allTotalPrice)}</>
                ) : value === 1 ? (
                    <>{handleMoney(allTotalPrice + 15000)}</>
                ) : (
                    <>{handleMoney(allTotalPrice + 50000)}</>
                ),
        },
        {
            key: '4',
            name: '',
            value: (
                <Button type="primary" danger onClick={handlePaymentClick}>
                    Tiến hành thanh toán
                </Button>
            ),
        },
    ];

    const columns1 = [
        {
            title: 'TỔNG GIÁ TRỊ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
        },
    ];
    return cartItems.length === 0 ? (
        <div className="cart-container">
            <Empty description={<span>Bạn chưa thêm sản phẩm nào</span>}>
                <Button type="primary">Thêm sản phẩm mới</Button>
            </Empty>
            ;
        </div>
    ) : (
        <div className="container">
            <div className="breadcrumb"></div>
            <div className="cart-container">
                <div className="cart-content">
                    <div className="cart-content--left">
                        <div className="cart-progress--bar">
                            <p>
                                Thêm{' '}
                                <span>
                                    {1000000 - allTotalPrice > 0
                                        ? handleMoney(1000000 - allTotalPrice)
                                        : handleMoney(0)}
                                </span>{' '}
                                vào giỏ hàng để được miễn phí giao hàng!
                            </p>
                            <Progress percent={(allTotalPrice / 1000000) * 100} />
                        </div>
                        <div className="cart-form--content">
                            <Table
                                columns={columns}
                                dataSource={data}
                                footer={footer}
                                pagination={false}
                            />
                        </div>
                    </div>
                    <div className="cart-content--right">
                        <Table dataSource={data1} columns={columns1} pagination={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        cartItems: state.cart.cartItems,
    };
}

const mapDispatchToProps = {
    updateQuantity,
    updateTotalPrice,
    removeFromCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
