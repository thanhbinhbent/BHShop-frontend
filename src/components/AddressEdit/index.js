import { Button, Form, Input, message, Space, Modal, Cascader } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
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

    const onChange = (value) => {
        console.log(value);
    };
    const [residences, setResidences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getResidence = async () => {
        const response = await axios.get('http://localhost:3100/residences');
        return response.data;
    };

    useEffect(() => {
        if (isLoading) {
            getResidence().then((res) => {
                setResidences(res);
            });
            setIsLoading(false);
        }
    }, [isLoading]);
    return (
        <Modal
            onCancel={onCancel}
            title="Chỉnh sửa địa chỉ nhận hàng"
            open={isOpen}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Thoát
                </Button>,
                <Space></Space>,
                <Button key="save" type="primary" onClick={onOk}>
                    Lưu thông tin
                </Button>,
            ]}
            key={'123modal'}
        >
            {data && (
                <Form
                    key={data.id + 'form'}
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        key={data.id + 'recipientname'}
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
                        key={data.id + 'phonenumber'}
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
                        key={data.id + 'residence'}
                        name="residence"
                        label="Chọn Tỉnh - Huyện - Xã"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn địa chỉ!',
                            },
                        ]}
                    >
                        <Cascader options={residences} onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        key={data.id + 'address'}
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
