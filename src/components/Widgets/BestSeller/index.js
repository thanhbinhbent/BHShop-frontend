import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import SpinLoading from '@/components/SpinLoading';
import './BestSeller.css';
import ProductItem from '@/components/ProductItem';
function BestSeller() {
    const [state, setState] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
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

    return (
        <div className="best-seller-container products-list__container">
            <div className="best-seller__wrapper products-list__wrapper">
                <div className="best-seller__group products-list__group">
                    <h1 className="best-seller__title section__title">
                        Sản phẩm bán chạy
                    </h1>
                    <p className="best-seller__subtitle section__desc">
                        Không bỏ lỡ bất kỳ sản phẩm phổ biến nào tại BHShop
                    </p>
                </div>
                <div className="best-seller__group products-list__group">
                    <Button>
                        <AppstoreOutlined /> Xem tất cả
                    </Button>
                </div>
            </div>
            {loading ? (
                <SpinLoading></SpinLoading>
            ) : hasError ? (
                'Lỗi tải dữ liệu!'
            ) : (
                <div className="best-seller__list products-list__items">
                    {state.slice(0, 4).map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                        ></ProductItem>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BestSeller;
