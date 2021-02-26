import React, { Component, useState } from 'react';
import { Col, Form, Button, InputGroup, Modal, Alert } from 'react-bootstrap';
function AddCategory(props) {
    const { isShowNewSubCategory, isShowAddCategoryMessage, isShowAddCategory, subCategoryName, onCloseAddCateogry, allSubCategoryList, onTextChange, onAddCategory, onSubCategoryChange, categoryName } = props;
    let subcategoryOptions = allSubCategoryList.map(item => (
        <option value={item.subCategoryId}>{item.subCategoryName}</option>
    ));
    return (
        <>
            <Modal show={isShowAddCategory} onHide={onCloseAddCateogry}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isShowAddCategoryMessage &&
                        !categoryName &&
                        <Alert variant="danger">
                            Please Enter Category!
                     </Alert>
                    }
                    {
                        isShowAddCategoryMessage &&
                        !subCategoryName &&
                        <Alert variant="danger">
                            Please Select Sub-Category or Enter new!
                     </Alert>}
                    <Form onSubmit={onAddCategory}>
                        <Form.Row>
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Category Name *</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter Category Name"
                                    value={categoryName}
                                    name="categoryName"
                                    onChange={onTextChange}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="formGridState">
                                <Form.Label>Sub Category*
                                </Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." onChange={onSubCategoryChange}>
                                    <option>Choose...</option>
                                    {subcategoryOptions}
                                    <option value='other'>Other</option>
                                </Form.Control>
                            </Form.Group>
                            {
                                isShowNewSubCategory &&
                                <Form.Group as={Col} md="6" controlId="formGridState">
                                    <Form.Label>Or Enter New Sub Category
                                </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter New Sub Category"
                                        name="subCategoryName"
                                        value={subCategoryName}
                                        onChange={onTextChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                            }
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseAddCateogry}>
                        Close
            </Button>
                    <Button variant="primary" onClick={onAddCategory}>
                        Save Changes
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddCategory;