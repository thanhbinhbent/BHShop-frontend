import { Row, Empty, Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CartModal.css';
import { handleMoney } from '@/utils';
// import demo data
import cartDemo from '@/data/cartdemo.json';
function CartModal() {
    const data = cartDemo;
    return data.length !== 0 ? (
        <div className="cart-modal">
            <Row className="cart-modal__container">
                <Row>
                    <h3 className="cart-modal__title">Giỏ hàng</h3>
                </Row>
                {data.map((data, index) => {
                    return (
                        <Row className="cart-modal__item" key={index}>
                            <div className="cart-img__container">
                                <img
                                    className="cart-item__img"
                                    src={data.thumbnail}
                                    alt=""
                                />
                            </div>
                            <div className="cart-modal__col cart-product__detail">
                                <p className="product-title">{data.name}</p>
                                <Row className="cart-modal__row">
                                    <p>
                                        <span className="product-quantity">
                                            <InputNumber
                                                className="product-quantity__value"
                                                size="small"
                                                min={1}
                                                defaultValue={data.quantity}
                                            />
                                        </span>
                                        <span>{` x `}</span>
                                        <span className="product-price">
                                            {handleMoney(data.price)}
                                        </span>
                                    </p>
                                    <div className="cart-product__delete">
                                        <span>
                                            <DeleteOutlined className="cart__icon--delete" />
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
            <Empty />
        </div>
    );
}

export default CartModal;
