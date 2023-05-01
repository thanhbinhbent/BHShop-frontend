import React, { useState } from 'react';
import {
    nameValidator,
    emailValidator,
    phoneValidator,
    passwordValidator,
} from '@/utils';
import { Form, Input, Button, message, Card, Popover, Select, Statistic } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import {
    EditOutlined,
    SaveOutlined,
    SafetyOutlined,
    ShoppingOutlined,
    CommentOutlined,
} from '@ant-design/icons';
import SourceImg from '@/assets/images/';
import './MyAccount.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUserFirstName } from '@/actions/userActions';
import userService from '@/services/userService';
const FormBasic = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.user);

    const { Meta } = Card;
    const { Option } = Select;
    const [form] = useForm();
    const ordersSum = 51;
    const userAddressDefault = '669 QL1A, Khu phố 3, P. Linh Xuân, Tp. Thủ Đức, Tp. HCM';
    const accountVerified = true;
    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const handleSave = () => {
        form.validateFields().then(async (values) => {
            setIsEditingBasic(false);
            await userService.update(values).then((res) => {
                message.success('Đã lưu thành công!');
                dispatch(setUserFirstName(values.name.trim().split(' ').pop()));
            });
        });
    };
    const handleRank = (ordersSum) => {
        if (ordersSum > 50) {
            return { rankName: 'Hạng vàng', rankLogo: SourceImg.goldRank };
        } else if (ordersSum <= 50 && ordersSum >= 30) {
            return { rankName: 'Hạng Bạc', rankLogo: SourceImg.sliverRank };
        } else {
            return { rankName: 'Hạng Đồng', rankLogo: SourceImg.copperRank };
        }
    };
    return (
        <div className="my-account__basic">
            {/* <h2 className="my-account__section">
                <InfoCircleOutlined />
                <span className="my-account__title">Thông tin cơ bản</span>
            </h2> */}
            {isEditingBasic ? (
                <Form
                    id="my-account__basic"
                    form={form}
                    layout="vertical"
                    initialValues={{
                        'name': `${currentUser.last_name} ${currentUser.first_name}`,
                        'email': currentUser.email,
                        'phone': currentUser.phone_number,
                        'gender': currentUser.gender,
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Họ và tên"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Họ và tên!' },
                            { validator: nameValidator },
                        ]}
                    >
                        <Input
                            placeholder={`${currentUser.last_name} ${currentUser.first_name}`}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            {
                                validator: emailValidator,
                            },
                        ]}
                    >
                        <Input placeholder={currentUser.email} />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            {
                                validator: phoneValidator,
                            },
                        ]}
                    >
                        <Input placeholder={currentUser.phone_number} />
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
                        <Select placeholder={currentUser.gender === 'Nam' ? 'Nam' : 'Nữ'}>
                            <Option value="Nam">Nam</Option>
                            <Option value="Nữ">Nữ</Option>
                            <Option value="other">Khác</Option>
                        </Select>
                    </Form.Item>
                    <div>
                        <Button type="primary" onClick={handleSave}>
                            <SaveOutlined />
                            Lưu
                        </Button>
                        <Button
                            className="my-account__cancel"
                            onClick={() => {
                                form.resetFields();
                                setIsEditingBasic(false);
                            }}
                        >
                            Huỷ
                        </Button>
                    </div>
                </Form>
            ) : (
                <Card
                    style={{ width: '100%' }}
                    cover={<img alt="example" src={SourceImg.defaultCover} />}
                    actions={[
                        <Statistic
                            title="Đơn mua"
                            value={ordersSum}
                            prefix={<ShoppingOutlined />}
                        />,
                        <Statistic
                            title="Đã đánh giá"
                            prefix={<CommentOutlined />}
                            value={ordersSum - 10}
                            suffix={'/' + ordersSum}
                        />,

                        <div className="my-account__rank">
                            <p className="my-account__rank-title">Hạng</p>
                            <img src={handleRank(ordersSum).rankLogo} alt=''/>
                        </div>,
                    ]}
                >
                    <div className="my-account__">
                        <Meta
                            title={
                                <h2 className="my-account__fullname">
                                    {!form.getFieldValue('name')
                                        ? `${currentUser.last_name} ${currentUser.first_name}`
                                        : form.getFieldValue('name')}
                                    <Popover
                                        content={
                                            accountVerified
                                                ? 'Tài khoản đã xác minh'
                                                : 'Bạn cần phải xác minh số điện thoại'
                                        }
                                        placement="bottom"
                                    >
                                        <span className="verified-icon">
                                            <img
                                                src={
                                                    accountVerified
                                                        ? ' /img/icon/icon-rank.png'
                                                        : '/img/icon/not-verified.png'
                                                }
                                                alt="Xác minh tài khoản"
                                            />
                                        </span>
                                    </Popover>
                                </h2>
                            }
                            description={
                                <div>
                                    <div className="my-account__detailed--showed">
                                        <p>
                                            Email:{' '}
                                            <b>
                                                {!form.getFieldValue('email')
                                                    ? currentUser.email
                                                    : form.getFieldValue('email')}
                                            </b>
                                        </p>
                                        <p>
                                            Số điện thoại:{' '}
                                            <b>
                                                {!form.getFieldValue('phone')
                                                    ? currentUser.phone_number
                                                    : form.getFieldValue('phone')}
                                            </b>
                                        </p>
                                        <p>
                                            Giới tính:{' '}
                                            <b>
                                                {!form.getFieldValue('gender')
                                                    ? currentUser.gender
                                                        ? 'Nam'
                                                        : 'Nữ'
                                                    : form.getFieldValue('gender')}
                                            </b>
                                        </p>
                                        <p>
                                            Địa chỉ nhận hàng mặc định:{' '}
                                            <b>{userAddressDefault}</b>
                                        </p>
                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setIsEditingBasic(true);
                                        }}
                                    >
                                        <EditOutlined /> Chỉnh sửa
                                    </Button>
                                    ,
                                </div>
                            }
                        />
                    </div>
                </Card>
            )}
        </div>
    );
};

const ChangePasswordForm = () => {
    const currentUser = useSelector((state) => state.user.user);
    const [passform] = useForm();
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const handleEdit = () => {
        setIsEditingPassword(true);
    };

    const handleSave = () => {
        passform.validateFields().then(async (values) => {
            values.user_id = currentUser.user_id;
            await userService
                .changePassword(values)
                .then((res) => {
                    setIsEditingPassword(false);
                    message.success('Đã lưu thành công');
                })
                .catch((err) => {
                    message.error('Mật khẩu hiện tại không đúng');
                    setIsEditingPassword(false);
                });
        });
    };

    return (
        <div className="my-account__password">
            <h2 className="my-account__section">
                <SafetyOutlined />
                <span className="my-account__title">Mật khẩu</span>
            </h2>
            <div className="my-account__illustration">
                <img
                    src="/img/illustrations/profile/change-password.svg"
                    alt="Đổi mật khẩu"
                />
            </div>
            {isEditingPassword ? (
                <Form id="my-account__password" form={passform} layout="vertical">
                    <Form.Item
                        name="password"
                        label="Mật khẩu hiện tại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu hiện tại!',
                            },
                            { validator: passwordValidator },
                        ]}
                    >
                        {isEditingPassword ? <Input.Password /> : <div>********</div>}
                    </Form.Item>
                    <Form.Item
                        name="newpass"
                        label="Mật khẩu mới"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                            { validator: passwordValidator },
                        ]}
                    >
                        {isEditingPassword ? <Input.Password /> : <div>********</div>}
                    </Form.Item>
                    <Form.Item
                        name="renewpass"
                        label="Nhập lại mật khẩu mới"
                        dependencies={['newpass']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập lại mật khẩu mới!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newpass') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'Bạn nhập mật khẩu không khớp với mật khẩu đã nhập trước đó!',
                                        ),
                                    );
                                },
                            }),
                            { validator: passwordValidator },
                        ]}
                    >
                        {isEditingPassword ? <Input.Password /> : <div>********</div>}
                    </Form.Item>
                    <div>
                        <Button type="primary" onClick={handleSave}>
                            <SaveOutlined />
                            Lưu
                        </Button>
                        <Button
                            className="my-account__cancel"
                            onClick={() => {
                                setIsEditingPassword(false);
                            }}
                        >
                            Huỷ
                        </Button>
                    </div>
                </Form>
            ) : (
                <Button type="primary" onClick={handleEdit}>
                    <EditOutlined /> Đổi mật khẩu
                </Button>
            )}
        </div>
    );
};

function MyAccount() {
    return (
        <div className="my-account__container">
            <FormBasic />
            <ChangePasswordForm />
        </div>
    );
}

export default MyAccount;
