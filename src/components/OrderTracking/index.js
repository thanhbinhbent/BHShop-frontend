import { Steps, Table } from 'antd';
import './OrderTracking.css';
import { handleMoney } from '@/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import orderService from '@/services/orderService';
function OrderTracking(props) {
    const shipFee = 30000;
    const { order_id } = props;
    const address = '669 QL 1A, phường Linh Xuân, TP. Thủ Đức, TP. HCM';
    const phoneNumber = '0968213964';
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_id',
        },
        {
            title: 'SL',
            dataIndex: 'product_quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'product_price',
            render: (price) => {
                return handleMoney(price);
            },
        },
    ];
    const dataRows = [
        {
            key: 'BH001',
            name: 'Sản phẩm 1',
            quantity: 12,
            unit: 120000,
        },
        {
            key: 'BH002',
            name: 'Sản phẩm 2',
            quantity: 12,
            unit: 120000,
        },
    ];

    const [productsInOrder, setProductsInOrder] = useState([]);
    const currentUser = useSelector((state) => state.user.user);
    const getOrdersDetail = async () => {
        const response = await orderService.getOrderById({
            order_id: order_id,
        });
        return response;
    };
    const sumOrder = productsInOrder.reduce((sum, item) => {
        return sum + item.quantity * item.unit;
    }, 0);
    useEffect(() => {
        getOrdersDetail().then((res) => {
            setProductsInOrder(res.data);
        });
    }, []);
    return (
        <div className="order-tracking__container">
            <h2>Chi tiết đơn hàng</h2>
            <div className="order-tracking__customer">
                <p>
                    Mã đơn hàng: &nbsp;
                    <span>
                        #<b>{'BH0001'}</b>
                    </span>
                </p>
                <p>
                    SĐT người nhận: &nbsp;
                    <span>
                        <b>
                            {currentUser.phone_number
                                .slice(-3)
                                .padStart(currentUser.phone_number.length, '*')}
                        </b>
                    </span>
                </p>
                <p>
                    Địa chỉ: &nbsp;
                    <span>
                        <b>{address.slice(-39).padStart(address.length, '*')}</b>
                    </span>
                </p>
            </div>
            <Steps
                className="tracking-detail__container"
                size="small"
                current={1}
                items={[
                    {
                        title: 'Chuẩn bị hàng',
                    },
                    {
                        title: 'Đang vận chuyển',
                    },
                    {
                        title: 'Giao thành công',
                    },
                ]}
            />
            <div className="order-tracking__view">
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={productsInOrder}
                />
            </div>
            <div className="order-tracking__total">
                <p>
                    Tổng tiền sản phẩm: &nbsp;
                    <span>
                        <b>{handleMoney(sumOrder)}</b>
                    </span>
                </p>
                <p>
                    Phí vận chuyển: &nbsp;
                    <span>
                        <b>{handleMoney(shipFee)}</b>
                    </span>
                </p>{' '}
                <p>
                    Tổng tiền cần thanh toán: &nbsp;
                    <span>
                        <b>{handleMoney(sumOrder + shipFee)}</b>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default OrderTracking;