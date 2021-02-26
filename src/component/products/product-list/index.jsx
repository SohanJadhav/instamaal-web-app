
import React, { Component } from 'react';
import { Card, Image, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';


class ProductList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { productList, handleClick } = this.props;
        const popover = (
            <Popover id="popover-basic">
                <Popover.Content>
                    <div>
                        <a href="#" onClick={handleClick}>
                            Edit
    </a>
                    </div>
                    <div>
                        <a href="#" onClick={handleClick}>
                            Delete
    </a>
                    </div>
                </Popover.Content>
            </Popover>
        );

        const content = productList.map((item) =>
            <div className="col-4">
                <Card >
                    <Card.Body>
                        <div className="row">
                            <div className="col-4">
                                <Image tyle={{ width: "100px" }} src="./no-image.png" />
                            </div>
                            <div className="col-8">
                                <div className="col-12 text-left">
                                    <div className="row no-padding" >
                                        <div className="col-10">
                                            <Card.Title className="text-overflow">{item.productName}</Card.Title>
                                        </div>
                                        <div className="col-2 text-right">
                                            <OverlayTrigger rootClose="true" trigger="click" placement="right" overlay={popover}>
                                                <ThreeDotsVertical />
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                    <Card.Text>
                                        <div>
                                            {item.categoryName}
                                        </div>
                                        <div>
                                            {item.inStockQuantity}
                                        </div>
                                        <div>
                                            ₹{item.productPrice}
                                        </div>
                                        <div className="color-red">
                                            In Stock
                                        </div>
                                    </Card.Text>
                                </div>
                            </div>
                        </div>

                    </Card.Body>
                </Card >
            </div >
        );

        return (
            <>
                {content}
            </>
        )
    }
}

export default ProductList;