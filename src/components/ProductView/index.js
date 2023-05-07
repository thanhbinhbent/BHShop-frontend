import React, { useState } from 'react';
import { Rate, Button, Tag, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { handleMoney } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/actions/cartActions';
import './ProductView.css';
function ProductView(props) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const { product } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideClick = (index) => {
        setActiveIndex(index);
    };
    const handleAddToCart = () => {
        if (!isLoggedIn) {
            message.error('Bạn cần đăng nhập để thực hiện chức năng này');
            return;
        }
        dispatch(addToCart(product));
    };
    const splideOptions = {
        autoWidth: true,
        gap: 10,
        arrows: false,
        pagination: false,
        autoplay: false,
        drag: false,
        onMove: (splide) => setActiveIndex(splide.index),
    };
    const displayNewPrice = (price) => {
        if (product?.campaign?.active) {
            if (product.campaign.sale_type === 'percent') {
                return price - (price * product.campaign.amount) / 100;
            }
            return price - product.campaign.amount;
        }
        return price;
    };
    const displayRating = (product) => {
        let rating = 0;
        if (!product?.reviews) {
            return rating;
        }
        product?.reviews.forEach((review) => {
            rating += review.rating;
        });
        return rating / product?.reviews.length;
    };
    const displayCategory = (product) => {
        if (!product?.category_lst) {
            return <></>;
        }
        return product.category_lst.map((category) => {
            return (
            <li className="product-view__category-item">
                <Tag>{category.name}</Tag>
            </li>
        )});
    };
    return (
        <div>
            <div className="product-view__container">
                <div className="product-view__heading">
                    <h2 className="product-view__name">{product.name}</h2>
                    <div className="product-view__row">
                        <div className="product-view__credit  product-view__col">
                            <span>Sản xuất bởi: &nbsp;&nbsp;</span>
                            <span>{product.brand}</span>
                        </div>
                        <div className="product-item__rating product-view__col">
                            <Rate
                                class="product-item__star"
                                disabled
                                defaultValue={displayRating(product)}
                            />
                            <span>&nbsp;&nbsp;({product.reviews ? (product.reviews.length) : (0)}&nbsp; lượt đánh giá)</span>
                        </div>
                        <div className="product-view__credit  product-view__col">
                            <span>Mã sản phẩm:&nbsp;&nbsp;</span>
                            <span>{product._id}</span>
                        </div>
                    </div>
                </div>
                <div className="product-view__main">
                    <div className="product-view__thumb product-view__main-col">
                        <Splide options={splideOptions} aria-label="My Favorite Images">
                            {product.image.map((image, index) => {
                                return (
                                    <SplideSlide
                                        key={index}
                                        className={index === activeIndex ? 'active' : ''}
                                    >
                                        <img
                                            src={product.image[activeIndex]}
                                            alt={product.name}
                                        />
                                    </SplideSlide>
                                );
                            })}
                        </Splide>
                        <div className="product-view__thumb--mini">
                            {product.image.map((image, index) => (
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
                    <div className="product-view__content product-view__main-col">
                        <div className="product-item__price product-view__price">
                            <span className="product-item__price--old">
                                {handleMoney(product.price)}
                            </span>
                            <span className="product-item__price--sale">
                                {handleMoney(displayNewPrice(product.price))}
                            </span>
                        </div>
                        <p className="product-item__status product-view__status">
                            <Tag color="cyan">Còn hàng</Tag>
                        </p>
                        <h4 className="product-view__category-heading">Mô tả:</h4>
                        <p className="product-item__description product-view__desciption">
                            {product.description}
                        </p>
                        <ul className="product-view__category">
                            <h4 className="product-view__category-heading">Danh mục:</h4>
                            {displayCategory(product)}
                        </ul>
                        <div className="product-item__quantity product-view__quantity">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductView;
