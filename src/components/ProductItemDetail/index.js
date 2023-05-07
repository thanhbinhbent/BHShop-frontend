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
} from 'antd';
import {
    ShoppingCartOutlined,
    FullscreenOutlined,
    HeartOutlined,
    CloseOutlined,
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

function ProductItemDetail() {
    const { product_id } = useParams();
    const [product, setproduct] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            message.error('Bạn cần đăng nhập để thực hiện chức năng này');
            return;
        }
        dispatch(addToCart(product));
    };

    let averageRating = 0;
    if (product && product.reviews) {
        let customerReview = 0;
        for (let i = 0; i < product.reviews.length; i++) {
            customerReview += product.reviews[i].rating;
        }
        averageRating = customerReview / product.reviews.length;
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

    const reviewsToDisplay =
        product &&
        product.reviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const getProductID = async (id) => {
            try {
                const response = await productService.getProduct(id);
                return response.data;
            } catch (err) {
                console.log('Error', err);
            }
        };
        getProductID(product_id).then((res) => {
            setproduct(res);
            // console.log('res', res);
        });
    }, []);

    return product ? (
        <div className="container">
            <div className="product-detail">
                <div className="bread-crumb">
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/">Trang chủ</a>,
                            },
                            {
                                title:  <a href="/shop">Mua sắm</a>,
                            },
                            
                            {
                                title: <>{product.name}</>,
                            },
                        ]}
                    />
                </div>

                <div className="product-detail__container">
                    <div className="product-detail__heading">
                        <h1>{product && product.name}</h1>
                        <div className="product-detail__subheading">
                            Sản xuất bởi: {product && product.brand}{' '}
                            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <Rate
                                class="product-item__star"
                                disabled
                                defaultValue={product && averageRating}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {product && averageRating} lượt đánh giá &nbsp;| &nbsp;Mã sản
                            phẩm: {product && product._id}
                        </div>
                    </div>
                    <div className="product-detail__content">
                        <div className="product-detail__thumb product-detail__main-col-1">
                            <div className="product-detail__col">
                                {product && '-' + product.discountPercentage + ' %'}
                            </div>
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
                                                    index === activeIndex ? 'active' : ''
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
                        </div>
                        <div className="product-detail__info  product-detail__main-col-2">
                            <div className="product-detail__price">
                                <span> {handleMoney(product && product.price)} </span>
                                <span> {product && product.new_price} </span>
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
                            <div className="product-detail__wishlist product-detail__tag">
                                <HeartOutlined />
                                &nbsp;&nbsp;Thêm vào ưa thích
                            </div>
                            <>
                                <ul className="product-detail__category">
                                    <h4 className="product-detail__category-heading">
                                        Danh mục:
                                    </h4>
                                    <li className="product-detail__category-item">
                                        <Tag>Nước năng lực</Tag>
                                    </li>
                                    <li className="product-detail__category-item">
                                        <Tag>Nước uống</Tag>
                                    </li>
                                    <li className="product-detail__category-item">
                                        <Tag>Chăm sóc da</Tag>
                                    </li>
                                </ul>
                            </>
                            <Divider></Divider>
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
                                        Được hoàn trả hàng trong 1 ngày nếu bạn có nhu cầu
                                        thay đổi.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="product-detail__information">
                    <h2>Mô tả sản phẩm: </h2>
                    <h3>{product.name}</h3>
                    <a
                        class="btn btn-link"
                        data-toggle="collapse"
                        href="#moreInfo"
                        role="button"
                        aria-expanded="false"
                        aria-controls="moreInfo"
                    >
                        Xem thêm
                    </a>
                    <div class="collapse" id="moreInfo">
                        <p>Thông tin chi tiết:</p>
                        <ul>
                            <li>Thông tin 1</li>
                            <li>Thông tin 2</li>
                            <li>Thông tin 3</li>
                        </ul>
                    </div>
                </div> */}
                <div className="product-detail__reviewers">
                    <h2>Đánh giá của khách hàng:</h2>
                    <Divider></Divider>
                    {reviewsToDisplay &&
                        reviewsToDisplay.map((rating) => (
                            <div key={rating._id}>
                                <div className="product-detail__reviewer">
                                    <img
                                        src={rating.avatar}
                                        alt={rating.user_id}
                                        className="product-detail__reviewer-avatar"
                                    />
                                    <div className="product-detail__reviewer-details">
                                        <h3 className="product-detail__reviewer-username">
                                            {rating.user_id}
                                        </h3>
                                        <p className="product-detail__reviewer-star">
                                            <Rate
                                                class="product-item__star"
                                                disabled
                                                defaultValue={rating.rating}
                                            />
                                        </p>
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
                        ))}
                    <div className="product-detail__reviewers-pagination">
                        <Pagination
                            showSizeChanger
                            defaultCurrent={1}
                            pageSize={pageSize}
                            total={product && product.reviews.length}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="loading-spinner">Loading...</div>
    );
}

export default ProductItemDetail;
