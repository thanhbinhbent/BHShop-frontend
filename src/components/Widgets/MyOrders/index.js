import { useEffect, useState } from 'react';
import { Button, List, Skeleton, Modal, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import OrderTracking from '@/components/OrderTracking';

import './MyOrders.css';
import { useSelector } from 'react-redux';
import orderService from '@/services/orderService';
function MyOrders() {
    const currentUser = useSelector((state) => state.user.user);
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);
    useEffect(() => {
        orderService.getOrdersOfUser({ user_id: currentUser.user_id }).then((res) => {
            setInitLoading(false);
            setList(res.data);
        });
    }, [currentUser.user_id]);
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
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    key={item.order_id}
                    actions={[
                        <div>
                            {' '}
                            <button className="button-detail"
                                key="list-loadmore-edit"
                                onClick={() => setModalOpen(true)}
                            >
                                Chi tiết
                            </button>
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
                                        icon={
                                            <QuestionCircleOutlined
                                                style={{ color: 'red' }}
                                            />
                                        }
                                    >
                                        <Button
                                            key="cancel"
                                            onClick={showPopconfirm}
                                            danger
                                        >
                                            Huỷ đơn
                                        </Button>
                                    </Popconfirm>,
                                    <Button
                                        key="ok"
                                        type="primary"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Thoát
                                    </Button>,
                                ]}
                            >
                                <OrderTracking
                                    order_id={item.order_id}
                                ></OrderTracking>
                            </Modal>
                        </div>,
                        <button className='button-rate' key="list-loadmore-more">Đánh giá</button>,
                    ]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            // avatar={<Avatar src={item?.productItems[0].thumbnail} />}
                            title={<span>{item.order_id}</span>}
                            // description={item?.productItems[0]?.title}
                        />
                        <div>
                            <p>Đặt ngày: {item.order_date}</p>
                            <p className="my-order__price-total">Tổng tiền: {'45000'}</p>
                        </div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
}

export default MyOrders;
