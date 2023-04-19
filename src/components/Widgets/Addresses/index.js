import { Avatar, List, Skeleton } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import AddressEditModal from '@/components/AddressEdit';
import { useState } from 'react';
import './Addresses.css';
function Addresses() {
    const fakeData = [
        {
            id: 1,
            receiptName: 'Trần Thanh Bình',
            city: 'Hồ Chí Minh',
            district: 'Thủ Đức',
            ward: 'Linh Xuân',
            address: '669, QL 1A, Khu Phố 3',
            phoneNumber: '0968213964',
            default: true,
        },
        {
            id: 2,
            receiptName: 'Nguyễn Văn Hướng',
            city: 'Hồ Chí Minh',
            district: 'Tân Phú',
            ward: 'Tân Sơn Nhì',
            address: '123 Tây Thạnh',
            phoneNumber: '0968213964',
            default: false,
        },
        {
            id: 3,
            receiptName: 'Lê Việt Hưng BBBB',
            city: 'Hồ Chí Minh',
            district: 'Quận 4',
            ward: 'Phường 1',
            address: '54 Bến Vân Đồn',
            phoneNumber: '0968213964',
            default: false,
        },
    ];

    // Modal edit
    const [selectedItem, setSelectedItem] = useState({});
    const [isAddressModal, setIsAddressModal] = useState(false);
    const showAddressModal = (item) => {
        setSelectedItem(item);
        setIsAddressModal(true);
    };
    const handleAddressOk = () => {
        setIsAddressModal(false);
    };
    const handleAddressCancel = () => {
        setIsAddressModal(false);
    };

    <div
        style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
        }}
    ></div>;

    return (
        <div>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={fakeData}
                renderItem={(item) => {
                    return (
                        <List.Item
                            key={item.id}
                            actions={[
                                <div>
                                    <button
                                        key="list-loadmore-edit"
                                        onClick={() => {
                                            showAddressModal(item);
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </div>,
                                <div>
                                    {item.default ? (
                                        <span className="default-text-noselect">
                                            Địa chỉ mặc định
                                        </span>
                                    ) : (
                                        <button key="set-default-btn">Đặt làm mặc định</button>
                                    )}
                                </div>,
                            ]}
                        >
                            <Skeleton
                                key={item.id + 'skeleton'}
                                avatar
                                title={false}
                                loading={item.loading}
                                active
                            >
                                <List.Item.Meta
                                    key={item.id + 'meta'}
                                    avatar={
                                        <Avatar
                                            size={{
                                                xs: 24,
                                                sm: 24,
                                                md: 24,
                                                xl: 30,
                                                xxl: 30,
                                            }}
                                            icon={<EnvironmentOutlined />}
                                        />
                                    }
                                    title={item.receiptName}
                                    description={
                                        <div>
                                            <p>{'Số điện thoại: ' + item.phoneNumber}</p>
                                            <p>
                                                {'Địa chỉ: ' +
                                                    item.address +
                                                    ', ' +
                                                    item.ward +
                                                    ', ' +
                                                    item.district +
                                                    ', ' +
                                                    item.city}
                                            </p>
                                        </div>
                                    }
                                />
                            </Skeleton>
                        </List.Item>
                    );
                }}
            />
            <AddressEditModal
                data={selectedItem}
                isOpen={isAddressModal}
                onOk={handleAddressOk}
                onCancel={handleAddressCancel}
                key={'addressEditModal'}
            />
        </div>
    );
}

export default Addresses;
