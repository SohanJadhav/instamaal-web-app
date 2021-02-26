
import React, { Component, useState } from 'react';
import { Col, Form, Button, InputGroup, OverlayTrigger, Tooltip, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { BagPlusFill, ArrowLeftShort } from 'react-bootstrap-icons';
import AddCategory from '../add-category';
import AddBrand from '../add-brand';
import { right } from '@popperjs/core';
import axios from 'axios';
import { CameraFill } from 'react-bootstrap-icons';


class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            isShowAddCategory: false,
            categoryList: [],
            subCategoryList: [],
            selectedCategoryId: '',
            selectedSubCategoryId: '',
            selectedBrandId: '',
            brandList: [],
            allSubCategoryList: [],
            isShowAddBrand: false,
            categoryName: '',
            subCategoryName: '',
            fileUploaded: {},
            isShowAddCategoryMessage: false,
            isShowNewSubCategory: false,
            productPrice: 0,
            productQty: 0,
            productSize: '',
            productCode: '',
            productDiscount: 0,
            productUnit: 'Units',
            productImagePath: '',
            brandName: ''
        }
        this.hiddenFileInput = React.createRef();
    }

    componentDidMount() {
        this.fetchCategoryList();
        this.fetchBrandList();
        this.fetchAllSubcategoryList();
    }

    productUnitList = ['Piece', 'Kg', 'Gm', 'ML', 'Litre', 'Packet']

    fetchCategoryList = () => {
        axios.get(`http://13.232.114.224:8080/fetchCategoryList`)
            .then(res => {
                const categoryList = res.data.data;
                this.setState({ categoryList });
            })

    }

    fetchSubcategoryList = () => {
        const { selectedCategoryId } = this.state;
        axios.get(`http://13.232.114.224:8080/fetchSubCategoryListByCategoryId?categoryId=${selectedCategoryId}`)
            .then(res => {
                const subCategoryList = res.data.data;
                this.setState({ subCategoryList });
            })

    }

    fetchAllSubcategoryList = () => {
        axios.get(`http://13.232.114.224:8080/fetchSubCategoryList`)
            .then(res => {
                const allSubCategoryList = res.data.data;
                this.setState({ allSubCategoryList });
            })

    }

    fetchBrandList = () => {
        axios.get(`http://13.232.114.224:8080/fetchBrandList`)
            .then(res => {
                const brandList = res.data.data;
                this.setState({ brandList });
            })

    }

    setValidated = (value) => {
        this.setState({
            validated: value
        })
    }

    setShowAddCategory = (value) => {
        this.setState({
            isShowAddCategory: value
        })
    }

    setShowAddBrand = (value) => {
        this.setState({
            isShowAddBrand: value
        })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setValidated(true);
    };

    handleOpenAddCateogry = () => {
        this.setShowAddCategory(true);
    }

    handleCloseAddCateogry = () => {
        this.setShowAddCategory(false);
    }

    handleOpenAddBrand = () => {
        this.setShowAddBrand(true);
    }

    handleCloseAddBrand = () => {
        this.setShowAddBrand(false);
    }

    renderAddCategory = () => (
        <Tooltip id="button-tooltip" {...this.props}>
            Add New Category
        </Tooltip>
    );

    nextPath = (path) => {
        this.props.history.push(path);
    }

    handleCategoryChange = (event) => {
        this.setState({
            selectedCategoryId: event.target.value
        }, () => {
            this.fetchSubcategoryList()
        })
    }

    handleSubCategoryChange = (event) => {
        debugger;
        this.setState({
            selectedSubCategoryId: event.target.value
        })
        if (event.target.value === 'other') {
            this.setState({
                isShowNewSubCategory: true
            })
        } else {
            this.setState({
                isShowNewSubCategory: false
            })
        }
    }

    handleBrandChange = (event) => {
        this.setState({
            selectedBrandId: event.target.value
        })
    }

    handleCategoryAdd = () => {
        debugger;
        const { categoryName, subCategoryName, selectedSubCategoryId, categoryList, subCategoryList } = this.state;
        if (this.validateAddCategory()) {
            debugger;
            const categoryObj = {
                categoryName,
                categoryId: '99999',
                createdAt: null, 
                modifiedAt: null
            }
            const subcategoryObj = {
                subCategoryName,
                subCategoryId: '99999'
            }
            debugger;
            const tempCategoryList = categoryList;
            tempCategoryList.push(categoryObj);
            const tempSubCategoryList = subCategoryList;
            tempSubCategoryList.push(subcategoryObj);
            this.setState({
                categoryList: [...tempCategoryList],
                subCategoryList: [...tempSubCategoryList],
                selectedSubCategoryId: '99999',
                selectedSubCategoryId: '99999'
            }, () => {
                console.log(categoryList)
                console.log(subCategoryList)
                debugger
            })
            debugger;
            this.setState({
                isShowAddCategory: false
            });
        }
    }

    validateAddCategory = () => {
        const { categoryName, subCategoryName, selectedSubCategoryId } = this.state;
        if (!categoryName || (!subCategoryName && (selectedSubCategoryId === 'Choose...' || selectedSubCategoryId === 'other'))) {
            this.setState({
                isShowAddCategoryMessage: true
            });
            return false
        } else {
            this.setState({
                isShowAddCategoryMessage: false
            })
            return true
        }
    }

    handleCategoryTextChange = (event) => {
        this.setState({
            categoryName: event.target.value
        })
    }

    handleSubCategoryTextChange = (event) => {
        this.setState({
            subCategoryName: event.target.value
        })
    }

    handleClick = event => {
        this.hiddenFileInput.current.click();
    };

    handleChange = event => {
        const fileUploaded = event.target.files[0];
        this.setState({
            fileUploaded
        })
    };

    handleTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAddProduct = () => {

        const { productName, categoryName, selectedCategoryId, selectedBrandId, selectedSubCategoryId, subCategoryName, brandName, productCode, productDiscount, productPrice, productQty, productSize, productUnit } = this.state;
        debugger;
        // const productInfo =
    }

    handleProductUnitChange = (e) => {
        this.setState({
            productUnit: e.target.text
        })
    }
    render() {
        const { productUnit, productDiscount, productCode, productSize, productPrice, productQty, productName, isShowNewSubCategory, validated, isShowAddCategory, categoryList, isShowAddCategoryMessage, subCategoryList, brandList, allSubCategoryList, isShowAddBrand, categoryName, fileUploaded } = this.state;
        let categoryOptions = categoryList.map(item => (
            <option value={item.categoryId}>{item.categoryName}</option>
        ));
        let subcategoryOptions = subCategoryList.map(item => (
            <option value={item.subCategoryId}>{item.subCategoryName}</option>
        ));
        let brandOptions = brandList.map(item => (
            <option value={item.brandId}>{item.brandName}</option>
        ));

        let productUnitOptions = this.productUnitList.map(item => (
            <Dropdown.Item onClick={this.handleProductUnitChange} value={item}>{item}</Dropdown.Item>
        ));
        return (
            <>
                <div className="row page-header">
                    <div className="col-10 form-inline">
                        <ArrowLeftShort style={{ marginRight: '10px' }} size={40} onClick={() => this.nextPath(`/products`)} />
                        <h5>Add New Product</h5>
                    </div>
                </div>
                <div className=" page-content">
                    <div className="row">
                        <div className="col-6 mx-auto htmlForm">
                            <div className="formHeader">
                                <h5>Product Image</h5>
                            </div>
                            <Form.Group>
                                <input
                                    type="file"
                                    ref={this.hiddenFileInput}
                                    onChange={this.handleChange}
                                    style={{ display: 'none' }}
                                />
                                <CameraFill fontSize={60} onClick={this.handleClick} />
                                {fileUploaded && fileUploaded.name}
                            </Form.Group>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mx-auto htmlForm">
                            <div className="formHeader">
                                <h5>Product Information</h5>
                            </div>
                            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                        <Form.Label>Product Name *</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Product Name"
                                            name="productName"
                                            value={productName}
                                            onChange={this.handleTextChange}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="formGridState">
                                        <Form.Label>Category*
                                                <BagPlusFill onClick={this.handleOpenAddCateogry} />
                                        </Form.Label>
                                        <Form.Control as="select" defaultValue="Choose..." onChange={this.handleCategoryChange}>
                                            <option>Choose...</option>
                                            {categoryOptions}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="formGridState">
                                        <Form.Label>Sub Category*</Form.Label>
                                        <Form.Control as="select" defaultValue="Choose..." onChange={this.handleSubCategoryChange}>
                                            <option>Choose...</option>
                                            {subcategoryOptions}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="formGridState">
                                        <Form.Label>Brand* <BagPlusFill onClick={this.handleOpenAddBrand} /></Form.Label>
                                        <Form.Control as="select" defaultValue="Choose..." onChange={this.handleBrandChange}>
                                            <option>Choose...</option>
                                            {brandOptions}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <Form.Label>Quantity*</Form.Label>
                                        <ButtonGroup>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Enter Quantity"
                                                name="productQty"
                                                value={productQty}
                                                onChange={this.handleTextChange}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            <DropdownButton as={ButtonGroup} title={productUnit} id="bg-nested-dropdown" value={productUnit} >
                                                {productUnitOptions}
                                            </DropdownButton>
                                        </ButtonGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Price"
                                            name="productPrice"
                                            value={productPrice}
                                            onChange={this.handleTextChange}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                        <Form.Label>Size</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Enter Size"
                                            name="productSize"
                                            value={productSize}
                                            onChange={this.handleTextChange}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <Form.Label>Code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Code" name="productCode"
                                            value={productCode}
                                            onChange={this.handleTextChange} />

                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                                        <Form.Label>Discount</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Discount"
                                            name="productDiscount"
                                            value={productDiscount}
                                            onChange={this.handleTextChange} />
                                    </Form.Group>
                                </Form.Row>
                                <Button type="submit" onClick={this.handleAddProduct}>Submit form</Button>
                            </Form>
                        </div>
                    </div>
                    {
                        isShowAddCategory &&
                        <AddCategory isShowNewSubCategory={isShowNewSubCategory} isShowAddCategoryMessage={isShowAddCategoryMessage} onTextChange={this.handleTextChange} categoryName={categoryName} onAddCategory={this.handleCategoryAdd} allSubCategoryList={allSubCategoryList} isShowAddCategory={isShowAddCategory} onSubCategoryChange={this.handleSubCategoryChange} onCloseAddCateogry={this.handleCloseAddCateogry} />
                    }
                    {
                        isShowAddBrand &&
                        <AddBrand isShowAddBrand={isShowAddBrand} onCloseAddBrand={this.handleCloseAddBrand} />
                    }
                </div>

            </>
        )
    }

}

export default AddProduct;