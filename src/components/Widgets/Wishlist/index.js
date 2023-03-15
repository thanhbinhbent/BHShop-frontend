import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Empty, Button, InputNumber } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import SpinLoading from '@/components/SpinLoading';
import { handleMoney } from '@/utils';
import ProductItem from '@/components/ProductItem';
import SourceImg from '@/assets/images';
import './Wishlist.css';
function Wishlist() {
    const [state, setState] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get('/data/wishlist.json')
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
        <div className="wishlist-item__container">
            <div className="wishlist-illustration">
                <img src={SourceImg.loveProduct} alt="" />
            </div>
            {loading ? (
                <SpinLoading></SpinLoading>
            ) : hasError ? (
                'Lỗi tải dữ liệu!'
            ) : (
                <div className="wishlist__list products-list__items">
                    {state.length == 0 ? (
                        <Empty description="Chưa có sản phẩm yêu thích nào!" />
                    ) : (
                        state.map((wishItem) => (
                            <ProductItem key={wishItem.id} product={wishItem} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
