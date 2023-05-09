import { useEffect, useState } from 'react';
import { Button, List, Skeleton, Modal, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import OrderTracking from '@/components/OrderTracking';

import './MyOrders.css';
import { useSelector } from 'react-redux';
import orderService from '@/services/orderService';
function MyOrders() {
    const customer = useSelector((state) => state.customer.customer);
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);
    const [orderId, setOrderId] = useState('');
    const sumTotal = (order) => {
        return order?.products.reduce((sum, item) => {
            return sum + item.quantity * item.price;
        }, 0);
    }
    useEffect(() => {
        orderService.getOrdersOfUser({ customer_id: customer._id }).then((res) => {
            setInitLoading(false);
            setList(res.data);
        });
    }, [customer]);
    const onLoadMore = () => {
        setLoading(true);
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>Xem thêm</Button>
            </div>
        ) : null;
    const showPopconfirm = () => {
        setOpenPop(true);
    };
    const handlePopOk = () => {
        setCancelLoading(true);
        setTimeout(() => {
            setOpenPop(false);
            setCancelLoading(false);
        }, 1500);
    };

    const handleCancelPop = () => {
        setOpenPop(false);
    };
    return (
        <div>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        key={item._id}
                        actions={[
                            <div>
                                {' '}
                                <button
                                    className="button-detail"
                                    key="list-loadmore-edit"
                                    onClick={() => {
                                        setModalOpen(true);
                                        setOrderId(item._id);
                                    }}
                                >
                                    Chi tiết
                                </button>
                            </div>,
                            <button className="button-rate" key="list-loadmore-more">
                                Đánh giá
                            </button>,
                        ]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={<span>{item._id}</span>}
                                description={item?.payment_method}
                            />
                            <div>
                                <p>Đặt ngày: {item.order_date}</p>
                                <p className="my-order__price-total">
                                    Tổng tiền: {sumTotal(item)} đồng
                                </p>
                            </div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Modal
                style={{ top: 20 }}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={[
                    <Popconfirm
                        title="Huỷ đơn hàng"
                        description="Bạn có chắn chắn muốn huỷ đơn hàng này?"
                        open={openPop}
                        onConfirm={handlePopOk}
                        okButtonProps={{ loading: cancelLoading }}
                        onCancel={handleCancelPop}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    >
                        <Button key="cancel" onClick={showPopconfirm} danger>
                            Huỷ đơn
                        </Button>
                    </Popconfirm>,
                    <Button key="ok" type="primary" onClick={() => setModalOpen(false)}>
                        Thoát
                    </Button>,
                ]}
            >
                <OrderTracking order_id={orderId}></OrderTracking>
            </Modal>
        </div>
    );
}

export default MyOrders;
