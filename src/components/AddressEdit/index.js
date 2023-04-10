import { Button, Form, Input, message, Space, Modal, Cascader } from 'antd';
import { useState, useEffect } from 'react';
function AddressEditModal(props) {
    const { data, isOpen, onOk, onCancel } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                recipientname: data.receiptName,
                phonenumber: data.phoneNumber,
                address: data.address,
                residence: [data.city, data.district, data.ward],
            });
        }
    }, [data, form]);
    const onFinish = () => {
        message.success('Lưu thành công!');
    };
    const onFinishFailed = () => {
        message.error('Lưu lỗi!');
    };

    const residences = [
        {
            value: 'TP. Hồ Chí Minh',
            label: 'TP. Hồ Chí Minh',
            children: [
                {
                    value: 'Thủ Đức',
                    label: 'Thủ Đức',
                    children: [
                        {
                            value: 'Linh Xuân',
                            label: 'Linh Xuân',
                        },
                        {
                            value: 'Linh Trung',
                            label: 'Linh Trung',
                        },
                        {
                            value: 'Linh Đông',
                            label: 'Linh Đông',
                        },
                    ],
                },
            ],
        },
        {
            value: 'Bình Định',
            label: 'Bình Định',
            children: [
                {
                    value: 'Hoài Ân',
                    label: 'Hoài Ân',
                    children: [
                        {
                            value: 'Ân Tường Tây',
                            label: 'Ân Tường Tây',
                        },
                        {
                            value: 'Tăng Bạc Hổ',
                            label: 'Tăng Bạc Hổ',
                        },
                        {
                            value: 'Ân Hảo Tây',
                            label: 'Ân Hảo Tây',
                        },
                    ],
                },
            ],
        },
    ];
    return (
        <Modal
            onCancel={onCancel}
            title="Chỉnh sửa địa chỉ nhận hàng"
            open={isOpen}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Thoát
                </Button>,
                <Button key="save" type="primary" onClick={onOk}>
                    Lưu thông tin
                </Button>,
            ]}
        >
            {data && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="recipientname"
                        label="Tên người nhận"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên người nhận!',
                            },
                        ]}
                    >
                        <Input placeholder="Trần Thanh Bình" />
                    </Form.Item>
                    <Form.Item
                        name="phonenumber"
                        label="Số điện thoại nhận hàng"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại nhận hàng!',
                            },
                        ]}
                    >
                        <Input placeholder="0968213964" />
                    </Form.Item>
                    <Form.Item
                        name="residence"
                        label="Chọn Tỉnh - Huyện - Xã"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn địa chỉ!',
                            },
                        ]}
                    >
                        <Cascader options={residences} />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Địa chỉ chi tiết"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ chi tiết!',
                            },
                        ]}
                    >
                        <Input placeholder="669 QL1A, Khu phố 3" />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}

export default AddressEditModal;
