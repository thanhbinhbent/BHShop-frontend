import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Progress, Statistic } from 'antd';
import SpinLoading from '@/components/SpinLoading';
import './ProductForWeek.css';
import { handleMoney } from '@/utils';
function ProductForWeek() {
    const { Countdown } = Statistic;

    // Example Deadline
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
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
        <div className="forweek">
            <div className="forweek-section__heading">
                <h1 className="section__title">Sản phẩm HOT trong tuần</h1>
                <p className="section__desc">
                    Sản phẩm ưu đãi theo tuần, giảm giá siêu sâu!
                </p>
            </div>
            {loading ? (
                <SpinLoading></SpinLoading>
            ) : hasError ? (
                'Lỗi tải dữ liệu!'
            ) : (
                state.slice(0, 1).map((products) => (
                    <div className="forweek-container" key={products.id}>
                        <div className="forweek-col">
                            <div className="forweek-product__img">
                                <img src={products.thumbnail} alt="" />
                            </div>
                            <div className="forweek-product__discount">
                                <span>{'- ' + products.discountPercentage + '%'}</span>
                            </div>
                        </div>
                        <div className="forweek-col">
                            <div className="forweek-product__price">
                                <span className="forweek-product__priceold product-item__price--old ">
                                    {handleMoney(products.oldPrice)}
                                </span>
                                <span className="forweek-product__pricesale product-item__price--sale">
                                    {handleMoney(products.price)}
                                </span>
                            </div>
                            <h3 className="product-item__name forweek-product__name">
                                {products.title}
                            </h3>
                            <div className="forweek-product__stock">
                                <span className="forweek-product__label">
                                    Trong kho còn:
                                </span>
                                <span className="forweek-product__quantity">
                                    {products.stock + ' sản phẩm'}
                                </span>
                            </div>
                            <div className="forweek-product__progress">
                                <Progress
                                    percent={60}
                                    status="active"
                                    strokeColor={{
                                        from: '#d51243',
                                        to: '#ffcd00',
                                    }}
                                />
                            </div>
                            <div className="forweek-product__timer">
                                <Countdown
                                    valueStyle={{
                                        fontSize: '1.8rem',
                                        color: 'var(--red)',
                                    }}
                                    title="Ưu đãi kết thúc sau:"
                                    value={deadline}
                                    format="D ngày : H giờ : m phút : s giây"
                                />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProductForWeek;
