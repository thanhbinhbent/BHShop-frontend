import './CheckOut.css';
import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { updateQuantity, updateTotalPrice, removeFromCart } from '@/actions/cartActions';
import { setCustomerAddresses } from '@/actions/customerActions';
import { SmileOutlined, GiftOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Mentions,
    Select,
    Progress,
    Divider,
    Checkbox,
    Button,
    Radio,
    Table,
} from 'antd';
import { handleMoney } from '@/utils';
import { useNavigate } from 'react-router-dom';
import orderService from '@/services/orderService';
import addressService from '@/services/addressService';
function CheckOut(props) {
    const navigate = useNavigate();
    const [showShippingForm, setShowShippingForm] = useState(false);
    const { cartItems, updateQuantity } = props;
    const customer = useSelector((state) => state.customer.customer);
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart.cartItems);
    const allTotalPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    const { Option } = Select;
    const [form] = Form.useForm();
    const [agree, setAgree] = useState(false);
    const onAgreeChange = (e) => {
        setAgree(e.target.checked);
    };
    const onFinish = (values) => {
        let shippingAddress = `${values.billingAddress.streetAddressLine1}, ${values.billingAddress.streetAddressLine2}, ${values.billingAddress.district}, ${values.billingAddress.city} `;
        let products = [];
        cart.forEach((item) => {
            products.push({
                product_id: item._id,
                product_name: item.name,
                quantity: item.quantity,
                price: item.price,
            });
        });
        let newOrder = {
            customer_id: customer._id,
            products: products,
            status: 'processing',
            shipping_address: shippingAddress,
            payment_method: radPayValue,
        };
        orderService.postOrder(newOrder).then((res) => {
            console.log(res);
            navigate(`/checkout/order-received/${res.data._id}`);
        });
    };
    const onCheckboxChange = (e) => {
        setShowShippingForm(e.target.checked);
        if (!e.target.checked) {
            form.setFieldsValue({
                shippingAddress: {
                    streetAddressLine1: '',
                    streetAddressLine2: '',
                    district: '',
                    // province: '',
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
    const [radPayValue, setradPayValue] = useState('cash_on_delivery');
    const onRadPayChange = (e) => {
        setradPayValue(e.target.value);
        console.log(e.target.value);
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
                    <Radio value={'credit_card'}>Chuyển khoản qua ngân hàng</Radio>
                    <br />
                    <Radio value={'cash_on_delivery'}>Thanh toán khi nhận hàng</Radio>
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
                    <Checkbox onChange={onAgreeChange}>
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
                <Button
                    form="checkout-form"
                    type="primary"
                    htmlType="submit"
                    danger
                    disabled={!agree}
                >
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
    const checkFreeShip = () => {
        let conditionPrice = 1000000 - allTotalPrice;
        if (conditionPrice > 0) {
            return (
                <div className="checkout-progress--bar">
                    <p>
                        Thêm <span>{handleMoney(conditionPrice)}</span> vào giỏ hàng để
                        được miễn phí giao hàng!
                    </p>
                    <Progress percent={(allTotalPrice / 1000000) * 100} />
                </div>
            );
        }
        return <></>;
    };
    const takeAddress = async () => {
        let ward = await addressService.getWardName(customer.addresses[0].ward_id);
        let district = await addressService.getDistrictName(
            customer.addresses[0].district_id,
        );
        let province = await addressService.getProvinceName(
            customer.addresses[0].province_id,
        );
        form.setFieldsValue({
            billingAddress: {
                firstName: user.first_name,
                lastName: user.last_name,
                companyName: '',
                streetAddressLine1: customer.addresses[0].address_line_1,
                streetAddressLine2: customer.addresses[0].address_line_2,
                district: district.data,
                // province: '',
                city: province.data,
                phone: user.phone_number,
                email: user.email,
            },
        });
    };
    useEffect(() => {
        takeAddress();
    }, []);
    return (
        <>
            <div className="container">
                <div className="checkout-container">
                    <div className="question-header checkout-progress--bar">
                        <GiftOutlined /> Bạn có mã giảm giá không? Nếu có thì nhấn vào{' '}
                        <a className="checkout-discount--coupon" href="#">
                            {' '}
                            đây.
                        </a>
                    </div>
                    {checkFreeShip()}
                    <div className="checkout-content">
                        <div className="checkout-content--left">
                            <Form
                                form={form}
                                name="billing-address"
                                onFinish={onFinish}
                                id="checkout-form"
                            >
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
                                {/* <Form.Item
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
                                </Form.Item> */}
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
        adresses: state.customer.addresses,
    };
}
const mapDispatchToProps = {
    setCustomerAddresses,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
