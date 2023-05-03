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
    console.log(
        'nhung cai da chọn:',
        selectedBrand,
        selectedPriceRange,
        selectedCategories,
        selectedTags,
    );
    function handleBrandChange(event) {
        const brand = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedBrand([...selectedBrand, brand]);
        } else {
            setSelectedBrand(
                selectedBrand.filter((selectedBrand) => selectedBrand !== brand),
            );
        }
    }

    // const handlePriceRangeChange = (value) => {
    //     setSelectedPriceRange(value);
    // };

    // function handleCategoryChange(checkedKeys, { checked, node }) {
    //     const categoryTitle = node.title;
    //     setSelectedCategories((prevSelected) =>
    //         checked
    //             ? [...prevSelected, categoryTitle]
    //             : prevSelected.filter((title) => title !== categoryTitle),
    //     );
    // }
    function handleCategoryChange(checkedKeys, { checked, node }) {
        const categoryId = node.key;
        const categoryName = node.title;
        setSelectedCategories((prevSelected) =>
            checked
                ? [...prevSelected, categoryName]
                : prevSelected.filter((name) => name !== categoryName),
        );
    }

    const handleTagChange = (event) => {
         const tags = event.target.value;
         const isChecked = event.target.checked;
         if (isChecked) {
             setSelectedTags([...selectedTags, tags]);
         } else {
             setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tags));
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

    //
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    // function to display range value
    const handleSliderChange = (value) => {
        setSelectedPriceRange(value);
    };

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const ProductCategories = categories.map((category, index) => {
        const children = categories
            .filter((product) => product.category_id === category.category_id)
            .map((product) => ({
                title: category.name,
                key: `0-${index}-${category._id.$oid}`,
            }));

        return {
            title: `${category.name}`,
            key: `0-${index}`,
            children: children.length > 1 ? children : undefined,
        };
    });
    useEffect(() => {
        const getAllCategories = async () => {
            const response = await categoryService.getAllCategory();
            return response.data;
        };
        getAllCategories().then((res) => {
            setCategories(res);
            console.log('Categories', res);
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
                console.log('data ne', res);
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

    console.log('brand ne', brands);
    return (
        <div className="search-container--vertical">
            <div className="search-container__type">
                <h4>Loại thực phẩm</h4>
                {/* <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={ProductCategories}
                    className="search-container__type-tree"
                    onChange={handleCategoryChange}
                    value={selectedCategories}
                /> */}
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
                                <Checkbox value={status.type} onChange={handleTagChange}
                                checked = {selectedTags.includes(status.type)}>
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
                <Button type="primary" onClick={handleFilterButtonClick}>
                    Filter
                </Button>
            </div>
        </div>
    );
}

export default VerticalSearchBar;
