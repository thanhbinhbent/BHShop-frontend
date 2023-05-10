import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/actions/cartActions';
import { Row, Empty, Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CartModal.css';
import { handleMoney } from '@/utils';
import { useNavigate } from 'react-router-dom';
// import demo data
function CartModal(props) {
    const dispatch = useDispatch();
    const { cartItems } = props;
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const navigate = useNavigate();
    const handleCartClick = () => {
        navigate('/cart');
    };
    const handleQuantityChange = (productId, quantity) => {
        dispatch(updateQuantity(productId, quantity));
    };
    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };
    
    const handlePaymentClick = () =>{
        if (isLoggedIn){
            navigate('/checkout');
        }
        else{
            navigate('/account');
            alert("Vui lòng đăng nhập trước khi thực hiện thanh toán!!!")
        }
    }
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
                                    src={item.image[0]}
                                    alt=""
                                />
                            </div>
                            <div className="cart-modal__col cart-product__detail">
                                <p className="product-title">{item.name}</p>
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
                                                    handleQuantityChange(item._id, value)
                                                }
                                            />
                                        </span>
                                        <span>{` x `}</span>
                                        <span className="product-price">
                                            {handleMoney(item.price)}
                                        </span>
                                    </div>
                                    <div className="cart-product__delete">
                                        <span onClick={() => handleRemoveItem(item._id)}>
                                            <DeleteOutlined className="cart__icon--delete" />
                                        </span>
                                    </div>
                                </Row>
                            </div>
                        </Row>
                    );
                })}
                <Row className="cart-modal__action">
                    <Button
                        onClick={handleCartClick}
                        className="cart-modal__button cart-modal__review"
                    >
                        Xem giỏ hàng
                    </Button>
                    <Button
                        type="primary"
                        className="cart-modal__button cart-modal__checkout"
                        onClick={handlePaymentClick}
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

export default CartModal;
