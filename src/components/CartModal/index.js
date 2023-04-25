import { connect } from 'react-redux';
import { updateQuantity, updateTotalPrice, removeFromCart } from '@/actions/cartActions';
import { Row, Empty, Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CartModal.css';
import { handleMoney } from '@/utils';
// import demo data
function CartModal(props) {
    const { cartItems, updateQuantity } = props;

    const handleQuantityChange = (productId, quantity) => {
        updateQuantity(productId, quantity);
    };
    // Remove  item
    const handleRemoveItem = (productId) => {
        props.removeFromCart(productId);
    };

    return cartItems.length !== 0 ? (
        <div className="cart-modal">
            <Row className="cart-modal__container">
                <Row>
                    <h3 className="cart-modal__title">Giỏ hàng</h3>
                </Row>
                {cartItems.map((item, index) => {
                    return (
                        <Row className="cart-modal__item" key={index}>
                            <div className="cart-img__container">
                                <img
                                    className="cart-item__img"
                                    src={item.thumbnail}
                                    alt=""
                                />
                            </div>
                            <div className="cart-modal__col cart-product__detail">
                                <p className="product-title">{item.title}</p>
                                <Row className="cart-modal__row">
                                    <div>
                                        <span className="product-quantity">
                                            <InputNumber
                                                className="product-quantity__value"
                                                size="small"
                                                min={1}
                                                max={100000}
                                                value={item.quantity}
                                                defaultValue={item.quantity}
                                                onChange={(value) =>
                                                    handleQuantityChange(item.id, value)
                                                }
                                            />
                                        </span>
                                        <span>{` x `}</span>
                                        <span className="product-price">
                                            {handleMoney(item.price)}
                                        </span>
                                    </div>
                                    <div className="cart-product__delete">
                                        <span onClick={() => handleRemoveItem(item.id)}>
                                            <DeleteOutlined style={{ fontSize: '16px', color: 'black' }} className="cart__icon--delete" />
                                        </span>
                                    </div>
                                </Row>
                            </div>
                        </Row>
                    );
                })}
                <Row className="cart-modal__action">
                    <Button className="cart-modal__button cart-modal__review">
                        Xem giỏ hàng
                    </Button>
                    <Button
                        type="primary"
                        className="cart-modal__button cart-modal__checkout"
                    >
                        Thanh toán
                    </Button>
                </Row>
            </Row>
        </div>
    ) : (
        <div className="cart-modal cart-empty">
            <Empty description={<span>Giỏ hàng trống!</span>} />
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
export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
