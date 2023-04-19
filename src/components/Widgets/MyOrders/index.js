import { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Modal, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import OrderTracking from '@/components/OrderTracking';

import './MyOrders.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
function MyOrders() {
    const currentUser = useSelector((state) => state.user.user);
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [openPop, setOpenPop] = useState(false);

    // const ordersData = '/data/customerOrders.json';
    useEffect(() => {
        // fetch(ordersData)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setInitLoading(false);
        //         setData(res);
        //         setList(res);
        //     });
        axios.post('http://localhost:3100/orders', { user_id: currentUser.user_id }).then((res) => {
            console.log(res.data);
            setInitLoading(false);
            setData(res.data);
            setList(res.data);
        });
    }, []);
    const onLoadMore = () => {
        // setLoading(true);
        // setList(
        //     data.concat(
        //         [...new Array(5)].map(() => ({
        //             loading: true,
        //             name: {},
        //             picture: {},
        //         })),
        //     ),
        // );
        // fetch(ordersData)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         const newData = data.concat(res);
        //         setData(newData);
        //         setList(newData);
        //         setLoading(false);
        //         window.dispatchEvent(new Event('resize'));
        //     });
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
                            <a
                                key="list-loadmore-edit"
                                onClick={() => setModalOpen(true)}
                            >
                                Chi tiết
                            </a>
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
                        <a key="list-loadmore-more">Đánh giá</a>,
                    ]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            // avatar={<Avatar src={item?.productItems[0].thumbnail} />}
                            title={<a href="#">{item.order_id}</a>}
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
