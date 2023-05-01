import './ProductItemDetail.css';
import { Rate, InputNumber, Tag, Divider, Button, message } from 'antd';
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
import { useState, useEffect, useSelector } from 'react';
import { useDispatch } from 'react-redux';
let getProductID = async (id) => {
    const body = { product_id: id };
    try {
        const response = await productService.getProduct(body);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
function ProductItemDetail(props) {
    const { product } = props;
    const [productInfo, setproductInfo] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    useEffect(() => {
        getProductID(product.product_id).then((res) => {
            setproductInfo(res);
        });
    }, [product.product_id]);
    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            message.error('Bạn cần đăng nhập để thực hiện chức năng này');
            return;
        }
        dispatch(addToCart(product));
    };
    const customerReview = 10;
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
    return (
        <div className="product-detail">
            <div className="product-detail__container">
                <div className="product-detail__heading">
                    <h1>{product.title}</h1>
                    <div className="product-detail__subheading">
                        Sản xuất bởi: {product.brand} |
                        <Rate
                            class="product-item__star"
                            disabled
                            defaultValue={product.rating}
                        />
                        {customerReview} lượt đánh giá | Mã sản phẩm: {product.product_id}
                    </div>
                </div>
                <div className="product-detail__content">
                    <div className="product-detail__thumb product-detail__main-col-1">
                        <div className="product-detail__col">
                            {'-' + product.discountPercentage + ' %'}
                        </div>
                        <Splide options={splideOptions} aria-label="My Favorite Images">
                            {product.images.map((image, index) => {
                                return (
                                    <SplideSlide
                                        key={index}
                                        className={index === activeIndex ? 'active' : ''}
                                    >
                                        <img
                                            src={product.images[activeIndex]}
                                            alt={product.title}
                                        />
                                    </SplideSlide>
                                );
                            })}
                        </Splide>
                        <div className="product-detail__thumb--mini">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={image.title}
                                    className={index === activeIndex ? 'active' : ''}
                                    onClick={() => handleSlideClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-detail__info  product-detail__main-col-2">
                        <div className="product-detail__price">
                            <span> {product.old_price} </span>
                            <span> {product.new_price} </span>
                        </div>
                        <div className="product-detail__status">{product.status}</div>
                        <div className="product-detail__describe">
                            {product.description}
                        </div>
                        <div className="product-detail__cart-update">
                            <Button
                                block
                                type="primary"
                                className="product-item__btn product-view__addcart"
                                onClick={() => addToCart(product)}
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
                                    Miễn phí giao hàng cho tất cả hóa đơn trên 200.000VND
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

                                <span>Đảm bảo 100% Organic từ trang trại tự nhiên</span>
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
        </div>
    );
}

export default ProductItemDetail;
