import { Rate } from 'antd';
import { Button } from 'antd';
import {
    ShoppingCartOutlined,
    FullscreenOutlined,
    HeartOutlined,
} from '@ant-design/icons';
import { handleMoney } from '@/utils';
import { connect } from 'react-redux';
import { addToCart } from '@/actions/cartActions';
import './ProductItem.css';
function ProductItem(props) {
    const { product, addToCart } = props;
    return (
        <div className="product-item">
            <a href="thanhbinhbent.com" className="product-item__container">
                <div className="product-item__img">
                    <img src={product.thumbnail} alt="" />
                </div>
                <h3 className="product-item__name">{product.title}</h3>
                <div className="product-item__rating">
                    <Rate
                        class="product-item__star"
                        disabled
                        defaultValue={product.rating}
                    />
                </div>
                <div className="product-item__price">
                    <span className="product-item__price--old">
                        {product.oldPrice
                            ? handleMoney(product.oldPrice)
                            : handleMoney('20000')}
                    </span>
                    <span className="product-item__price--sale">
                        {handleMoney(product.price)}
                    </span>
                </div>
                <div className="product-item__more">
                    <div className="product-item__col">
                        <span className="product-item__discount">
                            {'-' + product.discountPercentage + ' %'}
                        </span>
                        <span className="product-item__category ">
                            {product.category}
                        </span>
                    </div>
                    <div className="product-item__col">
                        <div className="product-item__preview  product-item__tag">
                            <FullscreenOutlined />
                        </div>
                        <div className="product-item__wishlist  product-item__tag">
                            <HeartOutlined />
                        </div>
                    </div>
                </div>
            </a>
            <div className="product-item__addcart">
                <Button
                    block
                    type="primary"
                    className="product-item__btn"
                    ghost
                    onClick={() => addToCart(product)}
                >
                    <ShoppingCartOutlined />
                    Thêm vào giỏ
                </Button>
            </div>
        </div>
    );
}

export default connect(null, { addToCart })(ProductItem);
