import React, { Component, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';

function AddBrand(props) {
    const { isShowAddBrand, onCloseAddBrand, onAddBrand } = props;
    return (
        <>
            <Modal show={isShowAddBrand} onHide={onCloseAddBrand}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onAddBrand}>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Brand Name *</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Brand Name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseAddBrand}>
                        Close
            </Button>
                    <Button variant="primary" onClick={onAddBrand}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddBrand;