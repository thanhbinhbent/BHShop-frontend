import { Button, Popover, Rate, message } from 'antd';
import { useEffect, useState } from 'react';
import {
    ShoppingCartOutlined,
    FullscreenOutlined,
    HeartOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { handleMoney } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/actions/cartActions';
import PreviewModal from '@/components/Widgets/PreviewModal';
import './ProductItem.css';
import productService from '@/services/productService';
let GetCategoryNameById = async (id) => {
    const body = { category_id: id };
    try {
        const response = await productService.getCategoryNameByProductId(body);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
function ProductItem(props) {
    const { product } = props;
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleAddToCart = (product) => dispatch(addToCart(product));

    useEffect(() => {
        GetCategoryNameById(product.category_id).then((res) => {
            setCategoryName(res);
        });
    }, [product.category_id]);

    return (
        <div className="product-item">
            <div className="product-item__container">
                <button className="product-item__link">
                    <div className="product-item__img">
                        {product.thumbnail !== undefined ? (
                            <img src={product?.thumbnail} alt="" />
                        ) : (
                            <img src={product?.image_url[0]} alt="" />
                        )}
                    </div>
                    <h3 className="product-item__name">{product?.name}</h3>
                    <div className="product-item__rating">
                        <Rate
                            class="product-item__star"
                            disabled
                            defaultValue={product?.rating}
                        />
                    </div>
                    <div className="product-item__price">
                        <span className="product-item__price--old">
                            {product?.oldPrice
                                ? handleMoney(product?.oldPrice)
                                : handleMoney('20000')}
                        </span>
                        <span className="product-item__price--sale">
                            {handleMoney(product?.price)}
                        </span>
                    </div>
                </button>
                <div className="product-item__more">
                    <div className="product-item__col">
                        <span className="product-item__discount">
                            {'-' + product?.discountPercentage + ' %'}
                        </span>
                        {product.category !== undefined ? (
                            <span className="product-item__category ">
                                {product.category}
                            </span>
                        ) : (
                            <span className="product-item__category ">
                                {categoryName}
                            </span>
                        )}
                    </div>
                    <div className="product-item__col">
                        <div
                            className="product-item__preview  product-item__tag"
                            onClick={showModal}
                        >
                            <FullscreenOutlined />
                        </div>
                        <PreviewModal
                            open={isModalOpen}
                            product={product}
                            close={handleCancel}
                            oK={handleOk}
                        />
                        <div className="product-item__wishlist  product-item__tag">
                            <HeartOutlined />
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-item__addcart">
                <Button
                    block
                    type="primary"
                    className="product-item__btn"
                    ghost
                    onClick={() => handleAddToCart(product)}
                >
                    <ShoppingCartOutlined />
                    Thêm vào giỏ
                </Button>
                <Popover content={'Xoá khỏi danh sách yêu thích'}>
                    <Button
                        block
                        type="primary"
                        className="product-item__btn product-item__btn-love-clear"
                        danger
                        ghost
                    >
                        <CloseOutlined />
                    </Button>
                </Popover>
            </div>
        </div>
    );
}

export default ProductItem;
