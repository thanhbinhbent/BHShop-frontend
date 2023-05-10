import { Tree, Slider, Button, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import categoryService from '@/services/categoryService';
import productService from '@/services/productService';
import './VerticalSearchBar.css';
function VerticalSearchBar(props) {
    //filter with props
    const [selectedBrand, setSelectedBrand] = useState([]);
    const defaultRange = [20000, 1000000];
    const [selectedPriceRange, setSelectedPriceRange] = useState(defaultRange);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const handleBrandChange = (event) => {
        const { filterParams } = props;
        const brand = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedBrand([...selectedBrand, brand]);
        } else {
            setSelectedBrand(
                selectedBrand &&
                    selectedBrand.filter((selectedBrand) => selectedBrand !== brand),
            );
        }
    };

    const handleCategoryChange = (checkedKeys, { checked, node }) => {
        const categoryId = node.key;
        const categoryName = node.title;
        setSelectedCategories((prevSelected) =>
            checked
                ? [...prevSelected, categoryName]
                : prevSelected && prevSelected.filter((name) => name !== categoryName),
        );
    };

    const handleTagChange = (event) => {
        const tags = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedTags([...selectedTags, tags]);
        } else {
            setSelectedTags(
                selectedTags &&
                    selectedTags.filter((selectedTag) => selectedTag !== tags),
            );
        }
    };
    const handleFilterButtonClick = () => {
        props.onFilterParamsChange({
            brand: selectedBrand,
            priceRange: selectedPriceRange,
            categories: selectedCategories,
            tags: selectedTags,
        });
    };
    const handleClearFilters = () => {
        props.onClearFilters({
            brand: [],
            priceRange: [20000, 1000000],
            categories: [],
            tags: [],
        });
        setSelectedBrand([]);
        setSelectedPriceRange([20000, 1000000]);
        setSelectedCategories([]);
        setSelectedTags([]);
    };
    //
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    // function to display range value
    const handleSliderChange = (value) => {
        setSelectedPriceRange(value);
    };

    const ProductCategories = categories.map((category, index) => {
        return {
            title: `${category.name}`,
            key: `0-${index}`,
        };
    });
    const getAllCategories = async () => {
        const response = await categoryService.getAllCategory();
        return response.data;
    };
    useEffect(() => {
        getAllCategories().then((res) => {
            setCategories(res);
        });
    }, []);

    // Product status
    const status = [
        { id: 1, type: 'Còn hàng' },
        { id: 2, type: 'Đang giảm giá' },
    ];
    useEffect(() => {
        productService
            .getAllProduct()
            .then((res) => {
                // console.log('data ne', res);
                return setProducts(res.data);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }, []);
    // Brands
    const brandFrequencies = products.reduce((acc, product) => {
        const brand = product.brand;
        if (acc[brand]) {
            acc[brand]++;
        } else {
            acc[brand] = 1;
        }
        return acc;
    }, {});

    const brands = Object.keys(brandFrequencies)
        .map((brand) => ({ brand, frequency: brandFrequencies[brand] }))
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 5)
        .map((brandObj) => brandObj.brand);
    return (
        <div className="search-container--vertical">
            <div className="search-container__type">
                <h4>Loại thực phẩm</h4>
                <Tree
                    checkable
                    onCheck={handleCategoryChange}
                    checkedKeys={selectedCategories.map(
                        (name) =>
                            ProductCategories.find((category) => category.title === name)
                                ?.key,
                    )}
                    treeData={ProductCategories}
                    className="search-container__type-tree"
                />
            </div>
            <div className="search-container__price">
                <h4>Giá:</h4>
                <Slider
                    range={{
                        draggableTrack: true,
                    }}
                    defaultValue={defaultRange}
                    className="search-container__price-slider"
                    onChange={handleSliderChange}
                    min={20000}
                    max={1000000}
                    step={10000}
                />
                <p>
                    Price:{' '}
                    <span
                        value={selectedPriceRange}
                        onChange={handleSliderChange}
                    >{`${selectedPriceRange[0]} - ${selectedPriceRange[1]}`}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
            </div>
            <div className="search-container__status">
                <h4>Trạng thái sản phẩm</h4>
                <div className="search-container__status-main">
                    {status.map((status) => {
                        return (
                            <div key={status.id}>
                                <Checkbox
                                    value={status.type}
                                    onChange={handleTagChange}
                                    checked={selectedTags.includes(status.type)}
                                >
                                    {status.type}
                                </Checkbox>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="search-container__brand">
                <h4>Thương hiệu đang nổi: </h4>
                <div className="search-container__brand-main">
                    {brands.map((brand, index) => {
                        return (
                            <div key={index}>
                                <Checkbox
                                    value={brand}
                                    onChange={handleBrandChange}
                                    checked={selectedBrand.includes(brand)}
                                >
                                    {brand}
                                </Checkbox>
                                <span>{brand.frequency}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="search-container__action">
                <Button
                    onClick={handleClearFilters}
                    type="primary"
                    style={{ backgroundColor: 'red' }}
                >
                    Loại bỏ các filter
                </Button>
                <Button type="primary" onClick={handleFilterButtonClick}>
                    Filter
                </Button>
            </div>
        </div>
    );
}

export default VerticalSearchBar;
