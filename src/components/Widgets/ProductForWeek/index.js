import React, { useState, useEffect } from 'react';
import { Progress, Statistic } from 'antd';
import SpinLoading from '@/components/SpinLoading';
import './ProductForWeek.css';
import { handleMoney } from '@/utils';
import productService from '@/services/productService';
function ProductForWeek() {
    const { Countdown } = Statistic;

    // Example Deadline
    const ONE_SECOND = 1000;
    const ONE_MINUTE = 60000;
    const ONE_HOUR = 3600000;
    const ONE_DAY = 86400000;
    const TIME_TO_DEADLINE = ONE_MINUTE * 2;
    const [deadline, setDeadline] = useState(Date.now() + TIME_TO_DEADLINE);
    const [percent, setPercent] = useState(0);
    const [state, setState] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    const displayDiscount = (product) => {
        if (product?.campaign?.active) {
            return (
                <span className="product-item__discount">
                    {`- ${product.campaign.amount} ${changeType(
                        product.campaign.sale_type,
                    )}`}
                </span>
            );
        }
        return <></>;
    };
    const changeType = (type) => {
        if (type === 'percent') {
            return '%';
        }
        return 'đ';
    };
    const displayNewPrice = (product) => {
        if (product?.campaign?.active) {
            if (product.campaign.sale_type === 'percent') {
                return product.price - (product.price * product.campaign.amount) / 100;
            }
            return product.price - product.campaign.amount;
        }
        return product.price;
    };
    useEffect(() => {
        setLoading(true);
        productService
            .getAllProduct()
            .then((res) => {
                setLoading(false);
                return setState(res.data);
            })
            .catch((err) => {
                setHasError(true);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            let present = Date.now();
            if (present < deadline) {
                let remain = Math.floor((deadline - present)/TIME_TO_DEADLINE * 100);
                setPercent(remain);
            } else {
                setPercent(0);
            }
        }, 1000);
        return () => clearInterval(interval);
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
                state.slice(0, 1).map((product) => (
                    <div className="forweek-container" key={product._id}>
                        <div className="forweek-col">
                            <div className="forweek-product__img">
                                <img src={product.image[0]} alt="" />
                            </div>
                            <div className="forweek-product__discount">
                                <span>{`- ${product.campaign.amount}${changeType(
                                    product.campaign.sale_type,
                                )}`}</span>
                            </div>
                        </div>
                        <div className="forweek-col">
                            <div className="forweek-product__price">
                                <span className="forweek-product__priceold product-item__price--old ">
                                    {handleMoney(product.price)}
                                </span>
                                <span className="forweek-product__pricesale product-item__price--sale">
                                    {handleMoney(displayNewPrice(product))}
                                </span>
                            </div>
                            <h3 className="product-item__name forweek-product__name">
                                {product.name}
                            </h3>
                            <div className="forweek-product__stock">
                                <span className="forweek-product__label">
                                    Trong kho còn:
                                </span>
                                <span className="forweek-product__quantity">
                                    {product.inventory_qty + ' sản phẩm'}
                                </span>
                            </div>
                            <div className="forweek-product__progress">
                                <Progress
                                    percent={percent}
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
