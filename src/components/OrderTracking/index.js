import { Steps, Table } from 'antd';
import './OrderTracking.css';
import { handleMoney } from '@/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import orderService from '@/services/orderService';
function OrderTracking(props) {
    const shipFee = 30000;
    const { order_id } = props;
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
        },
        {
            title: 'SL',
            dataIndex: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            render: (price) => {
                return handleMoney(price);
            },
        },
    ];
    const [order , setOrder] = useState({});
    const [productsInOrder, setProductsInOrder] = useState([]);
    const currentUser = useSelector((state) => state.user.user);
    const getOrderDetail = async (order_id) => {
        const response = await orderService.getOrderById(order_id);
        return response;
    };
    const sumOrder = productsInOrder?.reduce((sum, item) => {
        return sum + item.quantity * item.price;
    }, 0);
    useEffect(() => {
        if (!order_id) return;
        getOrderDetail(order_id).then((res) => {
            setProductsInOrder(res.data.products);
            setOrder(res.data);
        });
    }, [order_id]);
    const changeStatusToNumber = (status) => {
        switch (status) {
            case 'Đang chuẩn bị hàng':
                return 0;
            case 'processing':
                return 1;
            case 'completed':
                return 2;
            default:
                return 0;
        }
    };
    return (
        <div className="order-tracking__container">
            <h2>Chi tiết đơn hàng</h2>
            <div className="order-tracking__customer">
                <p>
                    Mã đơn hàng: &nbsp;
                    <span>
                        #<b>{order?._id}</b>
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
                        <b>{order?.shipping_address?.slice(-39).padStart(order?.shipping_address?.length, '*')}</b>
                    </span>
                </p>
            </div>
            <Steps
                className="tracking-detail__container"
                size="small"
                current={changeStatusToNumber(order?.status)}
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
                    rowKey={(product) => product.product_id}
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
