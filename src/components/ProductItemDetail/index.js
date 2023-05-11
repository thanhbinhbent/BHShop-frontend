import './ProductItemDetail.css';
import {
    Rate,
    InputNumber,
    Tag,
    Divider,
    Button,
    message,
    Pagination,
    Breadcrumb,
    Form,
    Input,
    Checkbox,
} from 'antd';
import {
    ShoppingCartOutlined,
    HeartOutlined,
    DollarOutlined,
    FileDoneOutlined,
    CarOutlined,
} from '@ant-design/icons';
import { addToCart } from '@/actions/cartActions';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import productService from '@/services/productService';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleMoney } from '@/utils';
import customerService from '@/services/customerService';
import { addToWishlist } from '@/actions/userActions';
import { phoneValidator } from '@/utils';
import reviewService from '@/services/reviewService';
const desc = ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];import './ProductItemDetail.css';
function ProductItemDetail() {
    const dispatch = useDispatch();
    const { product_id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [product, setproduct] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [value, setValue] = useState(3);
    const [form] = Form.useForm();

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const user = useSelector((state) => state.user.user);
    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            messageApi.open({
                type: 'error',
                content: 'Bạn cần đăng nhập để thực hiện chức năng này',
            });
            return;
        }
        dispatch(addToCart(product));
        messageApi.open({
            type: 'success',
            content: 'Thêm vào giỏ hàng thành công!',
        });
    };
    const addProductToWishList = (product) => {
        if (!user) return;
        customerService.addToWishlist(user.user_id, product).then((res) => {
            if (res.status === 200) {
                dispatch(addToWishlist(product));
                messageApi.open({
                    type: 'success',
                    content: 'Thêm vào wishlist thành công!',
                });
            }
        });
    };

    let averageRating = 0;
    if (product && product.reviews) {
        let customerReview = 0;
        for (let i = 0; i < product?.reviews?.length; i++) {
            customerReview += product.reviews[i].rating;
        }
        averageRating = customerReview / product?.reviews?.length;
    }
    const splideOptions = {
        autoWidth: true,
        gap: 10,
        arrows: false,
        pagination: false,
        autoplay: false,
        drag: false,
        onMove: (splide) => setActiveIndex(splide.index),
    };
    const handleSlideClick = (index) => {
        setActiveIndex(index);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [reviews, setReviews] = useState([]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const displayNewPrice = (price) => {
        if (product?.campaign?.active) {
            if (product.campaign.sale_type === 'percent') {
                return price - price * product.campaign.amount;
            }
            return price - product.campaign.amount;
        }
        return price;
    };
    const changeType = (type) => {
        if (type === 'percent') {
            return '%';
        }
        return 'đ';
    };
    const displayCategory = (product) => {
        if (!product?.category_lst) {
            return <></>;
        }
        return product.category_lst.map((category) => {
            return (
                <li className="product-detail__category-item" key={category._id}>
                    <Tag>{category.name}</Tag>
                </li>
            );
        });
    };
    const getProductID = async (id) => {
        try {
            const response = await productService.getProduct(id);
            return response?.data;
        } catch (err) {
            console.log('Error', err);
        }
    };
    const changeDateFormat = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-GB');
    };
    const getReviewById = async (id) => {
        let userInfo = [];
        await reviewService.getReviewById(id).then((res) => {
            userInfo = res?.data[0].user;
        });
        return userInfo;
    };
    const onRatingChange = (value) => {
        setValue(value);
    };
    const getProductDetail = () => {
        getProductID(product_id).then(async (res) => {
            setproduct(res);

            if (res?.reviews) {
                const slicedReviews = res.reviews.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize,
                );

                const transformedReviews = await Promise.all(
                    slicedReviews.map(async (review) => {
                        review.created_at = changeDateFormat(review.created_at);
                        review.ownerInfor = await getReviewById(review._id);
                        review.ownerFullName =
                            review.ownerInfor[0].last_name +
                            ' ' +
                            review.ownerInfor[0].first_name;
                        return review;
                    }),
                );

                setReviews(transformedReviews);
            }
        });
    };
    useEffect(() => {
        getProductDetail();
    }, [product_id, currentPage, pageSize]);
    const onFinish = (values) => {
        let review = values.review;
        review.product_id = product_id;
        review.user_id = user.user_id;
        reviewService.postReview(review).then((res) => {
            if (res.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Đánh giá thành công!',
                });
                getProductDetail();
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Đánh giá thất bại!',
                });
            }
        });
    };
    const displayDiscount = (product) => {
        if (product?.campaign?.active) {
            let discountType = product.campaign.sale_type;
            let discount = 0;
            if (discountType === 'percent') {
                discount = product.campaign.amount * 100;
            } else {
                discount = product.campaign.amount;
            }
            return (
                <span className="product-item__discount">
                    {`- ${discount} ${changeType(discountType)}`}
                </span>
            );
        }
        return <></>;
    };
    return product ? (
        <div className="container">
            {contextHolder}
            <div className="product-detail">
                <div className="bread-crumb">
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/">Trang chủ</a>,
                            },
                            {
                                title: <a href="/shop">Mua sắm</a>,
                            },

                            {
                                title: <>{product.name}</>,
                            },
                        ]}
                    />
                </div>

                <div className="product-detail__container">
                    <div className="product-detail__heading">
                        <h2>{product && product.name}</h2>
                        <div className="product-detail__subheading">
                            Sản xuất bởi: {product && product.brand}{' '}
                            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <Rate
                                className="product-item__star"
                                disabled
                                defaultValue={product && averageRating}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {product && averageRating} lượt đánh giá &nbsp;| &nbsp;Mã sản
                            phẩm: {product && product._id}
                        </div>
                    </div>
                    <div className="product-detail__content">
                        <div className="product-detail_content-group">
                            <div className="product-detail__thumb product-detail__main-col-1">
                                <Splide
                                    options={splideOptions}
                                    aria-label="My Favorite Images"
                                >
                                    {product &&
                                        product.image.map((image, index) => {
                                            return (
                                                <SplideSlide
                                                    key={index}
                                                    className={
                                                        index === activeIndex
                                                            ? 'active'
                                                            : ''
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            product &&
                                                            product.image[activeIndex]
                                                        }
                                                        alt={product && product.title}
                                                    />
                                                </SplideSlide>
                                            );
                                        })}
                                </Splide>
                                <div className="product-detail__thumb--mini">
                                    {product &&
                                        product.image.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={image.title}
                                                className={
                                                    index === activeIndex ? 'active' : ''
                                                }
                                                onClick={() => handleSlideClick(index)}
                                            />
                                        ))}
                                </div>
                                <div className="product-detail__col">
                                    <Tag color="#f50">{displayDiscount(product)}</Tag>
                                </div>
                            </div>
                            <div className="product-detail__info  product-detail__main-col-2">
                                <div className="product-detail__price">
                                    <span>
                                        {' '}
                                        {handleMoney(displayNewPrice(product.price))}{' '}
                                    </span>
                                    <span> {handleMoney(product.price)} </span>
                                </div>
                                <div className="product-detail__status">
                                    {product && product.inventory_qty > 0 ? (
                                        <Tag color="success">Còn hàng</Tag>
                                    ) : (
                                        <Tag color="error">Hết hàng</Tag>
                                    )}
                                </div>
                                <div className="product-detail__describe">
                                    {product && product.description}
                                </div>
                                <div className="product-detail__cart-update">
                                    <Button
                                        block
                                        type="primary"
                                        className="product-item__btn product-view__addcart"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <ShoppingCartOutlined />
                                        Thêm vào giỏ
                                    </Button>
                                </div>
                                <div
                                    className="product-detail__wishlist product-detail__tag"
                                    onClick={() => addProductToWishList(product)}
                                >
                                    <HeartOutlined />
                                    &nbsp;&nbsp;Thêm vào ưa thích
                                </div>
                                <div>
                                    <ul className="product-detail__category">
                                        <h4 className="product-detail__category-heading">
                                            Danh mục:
                                        </h4>
                                        {displayCategory(product)}
                                    </ul>
                                </div>
                                <Divider></Divider>
                            </div>
                        </div>

                        <div className="product-detail__info  product-detail__main-col-3">
                            <div className="product-detail__warning">
                                <span>
                                    Thông tin Covid-19: Chúng tôi vẫn tiếp tục giao hàng
                                </span>
                            </div>
                            <div className="product-detail__bonus">
                                <p>
                                    <span>
                                        <CarOutlined
                                            style={{
                                                fontSize: '25px',
                                            }}
                                        />{' '}
                                    </span>

                                    <span>
                                        Miễn phí giao hàng cho tất cả hóa đơn trên
                                        200.000VND
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <FileDoneOutlined
                                            style={{
                                                fontSize: '25px',
                                            }}
                                        />{' '}
                                    </span>

                                        <span>
                                            Đảm bảo 100% Organic từ trang trại tự nhiên
                                        </span>
                                    </p>
                                    <p>
                                        <span>
                                            <DollarOutlined
                                                style={{
                                                    fontSize: '25px',
                                                }}
                                            />{' '}
                                        </span>
                                        <span>
                                            {' '}
                                            Được hoàn trả hàng trong 1 ngày nếu bạn có nhu
                                            cầu thay đổi.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-detail__reviewers">
                    <h1>Đánh giá của khách hàng:</h1>
                    <Divider></Divider>
                    {reviews &&
                        reviews.map((rating) => {
                            return (
                                <div key={rating._id}>
                                    <div className="product-detail__reviewer">
                                        {/* <img
                                            src={rating.avatar}
                                            alt={rating.user_id}
                                            className="product-detail__reviewer-avatar"
                                        /> */}
                                        <div className="product-detail__reviewer-details">
                                            <h3 className="product-detail__reviewer-username">
                                                {rating.ownerFullName}
                                            </h3>
                                            <div className="product-detail__reviewer-star">
                                                <Rate
                                                    className="product-item__star"
                                                    disabled
                                                    defaultValue={rating.rating}
                                                />
                                            </div>
                                            <p className="product-detail__reviewer-date">
                                                {rating.created_at}
                                            </p>
                                            <p className="product-detail__reviewer-comment">
                                                {rating.comment}
                                            </p>
                                        </div>
                                    </div>
                                    <Divider></Divider>
                                </div>
                            );
                        })}
                    <div className="product-detail__reviewers-pagination">
                        <Pagination
                            showSizeChanger
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={product && product?.reviews?.length}
                            onChange={handlePageChange}
                        />
                    </div>
                    <div id="review_form_wrapper">
                        <div id="review_form">
                            <div id="respond" className="comment-respond">
                                <Form
                                    onFinish={onFinish}
                                    form={form}
                                    name="review"
                                    id="comment-respond"
                                    className="comment-form"
                                >
                                    <h1 id="reply-title" className="comment-reply-title">
                                        Thêm đánh giá <Divider />
                                        <p>
                                            <a
                                                rel="nofollow"
                                                id="cancel-comment-reply-link"
                                                href="https://klbtheme.com/bacola/product/all-natural-italian-style-chicken-meatballs/#respond"
                                                style={{ display: 'none' }}
                                            >
                                                Hủy phản hồi
                                            </a>
                                        </p>
                                    </h1>
                                    <p className="comment-notes">
                                        <span id="email-notes">
                                            Số điện thoại của bạn sẽ không bị công khai.
                                        </span>{' '}
                                        <span className="required-field-message">
                                            Điền vào các ô bắt buộc.{' '}
                                        </span>
                                    </p>
                                    <Form.Item
                                        htmlFor="rating"
                                        label="Đánh giá&nbsp;"
                                        name={['review', 'rating']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn Rating!',
                                            },
                                        ]}
                                    >
                                        <Rate
                                            tooltips={desc}
                                            onChange={onRatingChange}
                                            value={value}
                                        />
                                    </Form.Item>
                                    {/* <div className="ant-rate-text">
                                        {value ? (
                                            <span>
                                                {desc[value - 1]}
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </div> */}
                                    <Form.Item
                                        label="Bình luận của bạn:"
                                        name={['review', 'comment']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập nội dung đánh giá!',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            id="comment"
                                            cols="45"
                                            rows="8"
                                        ></Input.TextArea>
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
                                                              new Error(
                                                                  'Bạn phải đọc và đồng ý chính sách của chúng tôi!',
                                                              ),
                                                          ),
                                            },
                                        ]}
                                    >
                                        <Checkbox>
                                            Tôi đồng ý với chính sách của{' '}
                                            <a href="/"> BHShop.</a>
                                        </Checkbox>
                                    </Form.Item>
                                    <p className="comment-form-cookies-consent"></p>
                                    <div className="form-submit">
                                        <Button
                                            name="submit"
                                            htmlType="submit"
                                            id="submit"
                                            className="submit"
                                        >
                                            Gửi phản hồi
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="loading-spinner">Loading...</div>
    );
}

export default ProductItemDetail;
