import './CheckOut.css';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { updateQuantity, updateTotalPrice, removeFromCart } from '@/actions/cartActions';
import { setCustomerAddresses } from '@/actions/customerActions';
import { SmileOutlined, GiftOutlined } from '@ant-design/icons';
import {
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TimePicker,
    TreeSelect,
    Progress,
    Divider,
    Checkbox,
    Button,
    Radio,
    Table,
} from 'antd';
import { handleMoney } from '@/utils';
function CheckOut(props) {
    const [showShippingForm, setShowShippingForm] = useState(false);
    const { cartItems, updateQuantity  } = props;
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const customer = useSelector((state) => state.customer);

    const data = cartItems.map((item, index) => ({
        key: index,
        thumbnail: item.thumbnail,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        id: item.id,
    }));
    console.log('customer nè', customer);
    const allTotalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    const { Option } = Select;
    const { TextArea } = Input;
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onCheckboxChange = (e) => {
        setShowShippingForm(e.target.checked);
        if (!e.target.checked) {
            form.setFieldsValue({
                shippingAddress: {
                    streetAddressLine1: '',
                    streetAddressLine2: '',
                    district: '',
                    province: '',
                    city: '',
                },
            });
        }
    };
    const [radShipValue, setRadShipValue] = useState(1);
    const onRadShipChange = (e) => {
        if (allTotalPrice > 1000000) {
            setRadShipValue(3);
        } else if (radShipValue === 3) {
            setRadShipValue(1);
        } else {
            setRadShipValue(e.target.value);
        }
        console.log('radio checked', e.target.value);
    };
    const [radPayValue, setradPayValue] = useState(1);
    const onRadPayChange = (e) => {
        setradPayValue(e.target.value);
        console.log('radio checked', e.target.value);
    };

    const data1 = [
        {
            key: '1',
            name: 'Giá trị của giỏ hàng:',
            value: handleMoney(allTotalPrice),
        },
        {
            key: '2',
            name: 'Giao hàng',
            value: (
                <Radio.Group onChange={onRadShipChange} value={radShipValue}>
                    <Radio value={1}>Giao hàng nhanh: {handleMoney(15000)}</Radio>
                    <br />
                    <Radio value={2}>Giao hàng hỏa tốc: {handleMoney(50000)}</Radio>
                    <br />
                    <Radio
                        value={3}
                        checked={allTotalPrice > 1000000}
                        disabled={allTotalPrice < 1000000}
                    >
                        Miễn phí giao hàng
                    </Radio>
                </Radio.Group>
            ),
        },
        {
            key: '3',
            name: 'Tổng giá trị:',
            value:
                1000000 - allTotalPrice < 0 ? (
                    <>{handleMoney(allTotalPrice)}</>
                ) : radShipValue === 1 ? (
                    <>{handleMoney(allTotalPrice + 15000)}</>
                ) : (
                    <>{handleMoney(allTotalPrice + 50000)}</>
                ),
        },
        {
            key: '4',
            name: 'Phương thức thanh toán:',

            value: (
                <Radio.Group onChange={onRadPayChange} value={radPayValue}>
                    <Radio value={1}>Chuyển khoản qua ngân hàng</Radio>
                    <br />
                    <Radio value={2}>Thanh toán khi nhận hàng</Radio>
                </Radio.Group>
            ),
        },
        {
            key: '5',
            name: (
                <>
                    Thông tin cá nhân của bạn sẽ được sử dụng xử lý đơn hàng của bạn, hỗ
                    trợ trải nghiệm của bạn trong trang web này, và một số mục đích khác
                    được mô tả trong{' '}
                    <span className="policy">
                        {' '}
                        <a href="#">Chính sách bảo mật</a> của chúng tôi.
                    </span>
                </>
            ),
        },
        {
            key: '6',
            name: (
                <>
                    <Checkbox>
                        Tôi đã đọc và chấp nhận các{' '}
                        <span className="policy">
                            <a href="#">chính sách và điều kiện </a>
                        </span>{' '}
                        của Websites
                    </Checkbox>
                </>
            ),
        },
        {
            key: '7',
            name: (
                <Button type="primary" danger>
                    Hoàn tất thanh toán
                </Button>
            ),
        },
    ];

    const columns1 = [
        {
            title: 'TỔNG GIÁ TRỊ',
            dataIndex: 'name',
            key: 'name',
            onCell: (_, index) => ({
                colSpan: index === 4 || index === 5 || index === 6 ? 2 : 1,
            }),
        },
        {
            title: '',
            dataIndex: 'value',
            key: 'value',
        },
    ];
    return (
        <>
            <div className="container">
                <div className="checkout-container">
                    <div className="question-header checkout-progress--bar">
                        <a href="#">
                            <GiftOutlined /> Bạn có mã giảm giá không? Nếu có thì nhấn vào
                            đây.
                        </a>
                    </div>
                    <div className="checkout-progress--bar">
                        <p>
                            Thêm{' '}
                            <span>
                                {1000000 - allTotalPrice > 0
                                    ? handleMoney(1000000 - allTotalPrice)
                                    : handleMoney(0)}
                            </span>{' '}
                            vào giỏ hàng để được miễn phí giao hàng!
                        </p>
                        <Progress percent={(allTotalPrice / 1000000) * 100} />
                    </div>
                    <div className="checkout-content">
                        <div className="checkout-content--left">
                            <Form form={form} name="billing-address" onFinish={onFinish}>
                                <Divider orientation="left" plain>
                                    <h1>Địa chỉ thanh toán</h1>
                                </Divider>
                                <Form.Item
                                    name={['billingAddress', 'firstName']}
                                    label="Họ và tên đệm"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Hãy điền vào "Họ và tên đệm" của bạn!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'lastName']}
                                    label="Tên"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your last name!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'companyName']}
                                    label="Tên công ty/Tổ chức"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'streetAddressLine1']}
                                    label="Số và Tên đường/khu phố"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your street address line 1!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'streetAddressLine2']}
                                    label="Phường/Xã"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your street address line 2!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'district']}
                                    label="Quận/Huyện"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your district!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'province']}
                                    label="Tỉnh"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your province!',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Option value="Ontario">Ontario</Option>
                                        <Option value="Quebec">Quebec</Option>
                                        <Option value="Nova Scotia">Nova Scotia</Option>
                                        <Option value="New Brunswick">
                                            New Brunswick
                                        </Option>
                                        <Option value="Manitoba">Manitoba</Option>
                                        <Option value="British Columbia">
                                            British Columbia
                                        </Option>
                                        <Option value="Prince Edward Island">
                                            Prince Edward Island
                                        </Option>
                                        <Option value="Saskatchewan">Saskatchewan</Option>
                                        <Option value="Alberta">Alberta</Option>
                                        <Option value="Newfoundland and Labrador">
                                            Newfoundland and Labrador
                                        </Option>
                                        <Option value="Northwest Territories">
                                            Northwest Territories
                                        </Option>
                                        <Option value="Yukon">Yukon</Option>
                                        <Option value="Nunavut">Nunavut</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'city']}
                                    label="Thành phố"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your city!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'phone']}
                                    label="Số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone number!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['billingAddress', 'email']}
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not a valid email!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="shipToDifferentAddress"
                                    valuePropName="checked"
                                    wrapperCol={{ offset: 9, span: 16 }}
                                >
                                    <Checkbox onChange={onCheckboxChange}>
                                        Giao hàng đến vị trí khác
                                    </Checkbox>
                                </Form.Item>
                                {showShippingForm && (
                                    <>
                                        <Divider orientation="left" plain>
                                            <h1>Địa chỉ giao hàng khác</h1>
                                        </Divider>
                                        <Form.Item
                                            name={[
                                                'shippingAddress',
                                                'streetAddressLine1',
                                            ]}
                                            label="Số và Tên đường/khu phố"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Không để ô trống!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={[
                                                'shippingAddress',
                                                'streetAddressLine2',
                                            ]}
                                            label="Phường/Xã"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Không để ô trống!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['shippingAddress', 'district']}
                                            label="Quận/Huyện"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy nhập vào Quận/Huyện!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['shippingAddress', 'province']}
                                            label="Tỉnh"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy nhập vào Tỉnh!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name={['shippingAddress', 'city']}
                                            label="Thành phố"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Hãy nhập vào Thành Phố!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </>
                                )}
                                <Form.Item name="orderNotes" label="Order Notes">
                                    <Mentions rows={3} placeholder="Leave a message" />
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="checkout-content--right">
                            <div className="checkout-form--content">
                                <Table
                                    columns={columns1}
                                    dataSource={data1}
                                    pagination={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=""></div>
            </div>
        </>
    );
}
function mapStateToProps(state) {
    return {
        cartItems: state.cart.cartItems,
        customer: state.customer,
        adresses: state.customer.addresses
    };
}
const mapDispatchToProps = {
    setCustomerAddresses,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
