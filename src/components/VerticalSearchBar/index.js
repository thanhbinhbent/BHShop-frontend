import { Tree, Slider, Button, Checkbox } from 'antd';
import { useState } from 'react';


function VerticalSearchBar() {
    const ProductCategories = [
        {
            title: 'Beverages',
            key: '0-0',
            children: [
                {
                    title: 'Coffe',
                    key: '0-0-0',
                },
                {
                    title: 'Craft Beer',
                    key: '0-0-1',
                },
                {
                    title: 'Drinking Boxes & Pouches',
                    key: '0-0-2',
                },
                {
                    title: 'Soda & Pop',
                    key: '0-0-3',
                },
                {
                    title: 'Sparkling Water',
                    key: '0-0-4',
                },
                {
                    title: 'Water',
                    key: '0-0-5',
                },
            ],
        },
        {
            title: 'Biscuits & Snacks',
            key: '0-1',
        },
        {
            title: 'Frozen Foods',
            key: '0-2',
        },
        {
            title: 'Fruits & Vegetables',
            key: '0-3',
            children: [
                {
                    title: 'Party Trays',
                    key: '0-3-0',
                },
                {
                    title: 'Fresh Fruits',
                    key: '0-3-1',
                },
            ],
        },
    ];

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
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


    // Product status
    const status = [{id:1,type:'In Stock'},
    {id:2,type:'On Sale'}]

    // Brands
    const brands = [{id:1,title:'Frito Lay',quantity:2},
    {id:2,title:'Nespresso',quantity:1},
    {id:3,title:'Oreo',quantity:1},
    {id:4,title:'Quaker',quantity:8},
    {id:5,title:'Welch',quantity:8}]
    return (
        <div className='search-container--vertical'>
            <div>
                <h4>Loại thực phẩm</h4>
                <Tree
                    checkable
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={onSelect}
                    selectedKeys={selectedKeys}
                    treeData={ProductCategories}
                />
            </div>
            <div>
                <h4>PRODUCT CATEGORIES</h4>
                <Slider
                    range={{
                        draggableTrack: true,
                    }}
                    defaultValue={[20, 50]}
                />
                <p>Price: <span></span><Button>Filter</Button></p>
            </div>
            <div>
                <h4>PRODUCT STATUS</h4>
                <div>
                {status.map((status)=>{
                    return (
                        <div key={status.id}>
                        <Checkbox>{status.type}</Checkbox>
                        </div>
                    )
                })}
                </div>
            </div>
            <div>
                <h4>BRANDS</h4>
                <div>
                {brands.map((brand)=>{
                    return (
                        <div key={brand.id}>
                        <Checkbox>{brand.title}</Checkbox>
                        <span>({brand.quantity})</span>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
        
    );
}

export default VerticalSearchBar;
