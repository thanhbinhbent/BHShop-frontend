import './OrderReceive.css';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleMoney } from '@/utils';
import { Divider, Table } from 'antd';
import orderService from '@/services/orderService';
import { useParams } from 'react-router-dom';
function OrderReceive(props) {
    // const { cartItems, updateQuantity } = props;
    // const allTotalPrice = cartItems.reduce((acc, item) => {
    //     return acc + item.price * item.quantity;
    // }, 0);
    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product_name',
        },
        {
            title: 'Tổng',
            dataIndex: 'totalPrice',
        },
    ];
    const { order_id } = useParams();
    const [order, setOrder] = useState({});
    const changePaymentMethodToText = (e) => {
        switch (e) {
            case 'cash_on_delivery':
                return 'Thanh toán khi nhận hàng';
            case 'momo':
                return 'Thanh toán qua Momo';
            case 'zalopay':
                return 'Thanh toán qua ZaloPay';
            case 'credit_card':
                return 'Thanh toán bằng thẻ tín dụng';
            default:
                return 'Thanh toán khi nhận hàng';
        }
    };
    const changeDateFormat = (date) => {
        let newDate = new Date(date);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    };
    useEffect(() => {
        orderService.getOrderById(order_id).then((res) => {
            let newOrder = res.data;
            newOrder.totalPrice = 0;
            newOrder.products.forEach((item) => {
                item.totalPrice = 0;
                item.totalPrice += item.price * item.quantity;
                newOrder.totalPrice += item.totalPrice;
            });
            newOrder.products.push({
                key: 'shipping-address',
                product_name: <b>Địa chỉ giao hàng</b>,
                totalPrice: newOrder.shipping_address, // địa chỉ giao hàng
            });
            setOrder(newOrder);
            console.log(res.data);
        });
    }, []);
    return (
        <>
            <div className="container">
                <div className="container-content">
                    <div className="header-thanks">
                        <h1>Cảm ơn bạn. Đã nhận được đơn đặt hàng của bạn. </h1>
                    </div>
                    <div className="content-brief--info">
                        <div className="brief-order--number">
                            <p>Mã đơn hàng:</p>
                            <p>{order._id}</p>
                        </div>
                        <div className="brief-order--date">
                            <p>Ngày đặt hàng:</p>
                            <p>{changeDateFormat(order.order_date)}</p>
                        </div>
                        <div className="brief-order--total">
                            <p>Tổng giá trị:</p>
                            <p>{handleMoney(order.totalPrice)}</p>
                        </div>
                        <div className="brief-order--payment">
                            <p>Phương thức thanh toán:</p>
                            <p>{changePaymentMethodToText(order.payment_method)}</p>
                        </div>
                    </div>
                    <div className="content-detail--info">
                        <h1>Chi tiết đơn hàng:</h1>
                        <Table
                            columns={columns}
                            dataSource={order.products}
                            pagination={false}
                        />
                    </div>
                </div>
                <Divider></Divider>
            </div>
        </>
    );
}
function mapStateToProps(state) {
    return {
        cartItems: state.cart.cartItems,
    };
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderReceive);
