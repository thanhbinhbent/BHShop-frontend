import './OrderReceive.css';
import { connect } from 'react-redux';
import { useState } from 'react';
import { handleMoney } from '@/utils';
import { Divider, Table } from 'antd';
function OrderReceive(props) {
    const { cartItems, updateQuantity } = props;
    const cartData = cartItems.map((item, index) => ({
        key: index,
        thumbnail: item.thumbnail,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        id: item.id,
    }));
    const leng_data = cartData.length;
    const allTotalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    const data = [];
    for (let data1 of cartData) {
        data.push({
            key: data1.key,
            thumbnail: data1.thumbnail,
            title: data1.title,
            price: data1.price,
            quantity: data1.quantity,
            total: data1.price * data1.quantity,
            id: data1.id,
            name: <>{data1.title} <b>x{data1.quantity}</b> </>
        });
    }
    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
        },
    ];
    const orderData = [
        {
            key: 'subtotal',
            name: <b>Subtotal:</b>,
            total: handleMoney(allTotalPrice),
        },
        {
            key: 'shipping',
            name: <b>Shipping:</b>,
            total: '', // phí ship
        },
        {
            key: 'payment',
            name: <b>Payment Method: </b>,
            total: '', //Chuyển khoản hay thanh toán khi nhận hàng
        },
        {
            key: 'total',
            name: <b>Total: </b>,
            total: '', // tổng phí khi đã tính thuế
        },
        {
            key: 'shipping-address',
            name: <b>Shipping address:</b>,
            total: '', // địa chỉ giao hàng
        },
        {
            key: 'notes',
            name: <b>Notes: </b>,
            total: '', // notes thêm của khách hàng
        },
    ];
    for (let data1 of orderData) {
        data.push({
            key: data1.key,
            name: data1.name,
            total: data1.total
        });
    }
    
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
                            <p></p>
                        </div>
                        <div className="brief-order--date">
                            <p>Ngày đặt hàng:</p>
                            <p></p>
                        </div>
                        <div className="brief-order--total">
                            <p>Tổng giá trị:</p>
                            <p></p>
                        </div>
                        <div className="brief-order--payment">
                            <p>Phương thức thanh toán:</p>
                            <p></p>
                        </div>
                    </div>
                    <div className="content-detail--info">
                        <h1>Chi tiết đơn hàng:</h1>
                        <Table columns={columns} dataSource={data} pagination={false} />
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
