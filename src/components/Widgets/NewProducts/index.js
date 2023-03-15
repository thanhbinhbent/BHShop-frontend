import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import SpinLoading from '@/components/SpinLoading';
import ProductItem from '@/components/ProductItem';
import './NewProducts.css';

function NewProducts() {
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

    return (
        <div className="new-products-container products-list__container">
            <div className="new-products__wrapper products-list__wrapper">
                <div className="new-products__group products-list__group">
                    <h1 className="new-products__title section__title">Sản phẩm mới</h1>
                    <p className="new-products__subtitle section__desc">
                        Luôn cập nhật những sản phẩm mới và chất lượng nhất
                    </p>
                </div>
                <div className="new-products__group products-list__group">
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
                <div className="new-products__list products-list__items">
                    {state.slice(0, 8).map((products) => (
                        <ProductItem key={products.id} product={products}></ProductItem>
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewProducts;
