import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from '../ProductItem';
import SpinLoading from '../SpinLoading';
import './RecentlyViewProduct.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
function RecentlyViewProduct(props) {
    const { viewedProducts, updateQuantity } = props;
    const [state, setState] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get('/data/products.json')
            .then((res) => {
                setLoading(false);
                return setState(res.data);
            })
            .catch((err) => {
                setHasError(true);
                setLoading(false);
            });
    }, []);
    const optionsCarousel = {
        type: 'slide',
        rewind: true,
        perPage: 4,
        perMove: 1,
        gap: '1rem',
        arrows: true,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 1,
            },
            992: {
                perPage: 1,
            },
        },
    };
    return (
        <div>
            <h1 className="best-seller__title section__title">Sản phẩm vừa xem</h1>
            {loading ? (
                <SpinLoading></SpinLoading>
            ) : hasError ? (
                'Lỗi tải dữ liệu!'
            ) : (
                <div>
                    <Splide options={optionsCarousel} className="best-seller__list ">
                        {state.slice(0, 10).map((product) => (
                            <SplideSlide key={product.id}>
                                <ProductItem
                                    product={product}
                                    className="product-carousel__item"
                                ></ProductItem>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            )}
        </div>
    );
}

export default RecentlyViewProduct;
