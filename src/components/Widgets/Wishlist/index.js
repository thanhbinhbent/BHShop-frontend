import React, { useState, useEffect } from 'react';
import { Empty } from 'antd';
import SpinLoading from '@/components/SpinLoading';
import ProductItem from '@/components/ProductItem';
import SourceImg from '@/assets/images';
import './Wishlist.css';
import customerService from '@/services/customerService';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist } from '@/actions/userActions';
function Wishlist() {
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.user.wishListItems);
    const user = useSelector((state) => state.user.user);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        customerService
            .getWishlist(user.user_id)
            .then((res) => {
                setLoading(false);
                dispatch(setWishlist(res.data.wishlist));
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
                    {wishlist.length == 0 ? (
                        <Empty description="Chưa có sản phẩm yêu thích nào!" />
                    ) : (
                        wishlist.map((wishItem) => (
                            <ProductItem key={wishItem._id} product={wishItem} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
