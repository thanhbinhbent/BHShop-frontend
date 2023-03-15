import { Steps, Table } from 'antd';
import './OrderTracking.css';
import { handleMoney } from '@/utils';
function OrderTracking(props) {
    const shipFee = 30000;
    const { order } = props;
    const address = '669 QL 1A, phường Linh Xuân, TP. Thủ Đức, TP. HCM';
    const phoneNumber = '0968213964';
    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'SL',
            dataIndex: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unit',
            render: (price) => {
                return handleMoney(price);
            },
        },
    ];
    const dataRows = [
        {
            key: 'BH001',
            name: 'Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1Sản phẩm 1',
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
    const sumOrder = dataRows.reduce((sum, item) => {
        return sum + item.quantity * item.unit;
    }, 0);

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
                        <b>{phoneNumber.slice(-3).padStart(phoneNumber.length, '*')}</b>
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
                <Table pagination={false} columns={columns} dataSource={dataRows} />
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
