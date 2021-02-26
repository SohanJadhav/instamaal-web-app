
import React, { Component, Link } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import './product.css';
import ProductList from './product-list';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
        }
    }

    componentDidMount() {
        axios.get(`http://13.232.114.224:8080/fetchProductList`)
            .then(res => {
                debugger;
                const productList = res.data.data;
                this.setState({ productList });
            })

    }
    nextPath(path) {
        debugger;
        this.props.history.push(path);
    }


    render() {
        const { productList } = this.state;
        const { match } = this.props;
        return (
            <>
                <div className="row page-header">
                    <div className="col-12">
                        <h5>Products</h5>
                    </div>
                </div>
                <div className="row mx-auto page-content">
                    <div className="col-12">
                        <div className="row verticalPadding15px">
                            <div className="col-6 text-left">
                                <input type="text" name="name" placeholder="Search Product..." />
                            </div>
                            <div className="col-6 text-right">
                                <Button variant="primary">Bulk Add Product</Button>{' '}
                                <Button onClick={() => this.nextPath(`products/addProduct`)} variant="primary">Add New Product</Button>{' '}
                            </div>
                        </div>
                        <div className="row">
                            <ProductList productList={productList} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Products;