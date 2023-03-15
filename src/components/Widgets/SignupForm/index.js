import { Button, Cascader, Checkbox, Form, Input, Select } from 'antd';
import {
    nameValidator,
    emailValidator,
    phoneValidator,
    passwordValidator,
} from '@/utils';
import './SignupForm.css';
function SignupForm() {
    const { Option } = Select;
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
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Dữ liệu nhận từ Form đăng ký: ', values);
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['TP. Hồ Chí Minh', 'TP. Thủ Đức', 'P.Linh Xuân'],
                prefix: '84',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                    {
                        validator: nameValidator,
                    },
                    {
                        required: true,
                        message: 'Vui lòng nhập Họ và tên!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { validator: phoneValidator },
                ]}
            >
                <Input addonBefore={'+84'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[{ validator: emailValidator }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                    { validator: passwordValidator },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Nhập lại mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(
                                    'Mật khẩu vào không khớp với mật khẩu đã nhập!',
                                ),
                            );
                        },
                    }),
                    { validator: passwordValidator },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn giới tính!',
                    },
                ]}
            >
                <Select placeholder="Chọn giới tính">
                    <Option value="male">Nam</Option>
                    <Option value="female">Nữ</Option>
                    <Option value="other">Khác</Option>
                </Select>
            </Form.Item>

            <Form.Item name="residence" label="Địa chỉ">
                <Cascader options={residences} />
            </Form.Item>
            <Form.Item name="address2" label="Địa chỉ chi tiết">
                <Input placeholder="Ví dụ: 669, QL1A, Khu phố 3" />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(
                                      new Error('Bạn phải đọc, và đồng ý chính sách!'),
                                  ),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    Tôi đồng ý với chính sách của <a href=""> BHShop.</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Đăng ký
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignupForm;
