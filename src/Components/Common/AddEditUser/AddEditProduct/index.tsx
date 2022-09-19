import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

interface ProductListType {
  id?: number;
  rating?: number;
  price: number;
  brand: string;
  description: string;
  name?: string;
  date?: string;
  title?: string;
  images: string[];
  length?: number;
}
interface IProps {
  toogleSidebar: () => void;
  show: boolean;
  AddProductNew: (user: any) => void;
  editProduct: any;
  updateProduct: any;
}

const AddEditProduct = ({
  toogleSidebar,
  show,
  AddProductNew,
  editProduct,
  updateProduct,
}: IProps) => {
  const [data, setData] = useState<ProductListType[]>([]);

  const initialValues = {
    id: `${editProduct ? editProduct.id : ""}`,
    title: `${editProduct ? editProduct.title : ""}`,
    brand: `${editProduct ? editProduct.brand : ""}`,
    description: `${editProduct ? editProduct.description : ""}`,
    price: `${editProduct ? editProduct.price : ""}`,
    images: "",
  };

  const CreateSchema = yup.object({
    title: yup.string().required("Required"),
    images: yup.string().required("Required"),
    brand: yup.string().required("Required"),
    description: yup.string().required("Required"),
    price: yup.string().required("Required"),
  });
  // console.log("editProduct===>", editProduct);

  return (
    <>
      <div className="">
        <Offcanvas show={show} onHide={toogleSidebar} placement="end">
          <Offcanvas.Header className="pb-0" closeButton>
            <Offcanvas.Title>
              {editProduct ? "Edit Product" : "Add Product"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="form">
              <Formik
                initialValues={initialValues}
                validationSchema={CreateSchema}
                enableReinitialize={true}
                onSubmit={(values: any) => {
                  // console.log("values ==> ", values);
                  // AddProductNew(values);
                  if (editProduct) {
                    updateProduct(values);
                  } else {
                    AddProductNew(values);
                  }
                }}
              >
                {({ errors, touched, handleChange, isValid, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="file">
                        <label>Choose Image</label>
                        <div className="img-box">
                          <Field
                            type="file"
                            label="file"
                            placeholder="file"
                            name="images"
                            accpte="image/*"
                            onChange={(e: any) => {
                              console.log(
                                "onChange::",
                                e.target.name,
                                e.target.value
                              );
                              handleChange(e);
                            }}
                          />
                          <h4>Please select File</h4>
                          {errors.images && touched.images ? (
                            <div className="error">{errors.images}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Title</label>
                      <Field
                        type="text"
                        label="title"
                        Placeholder="title"
                        autoComplete="off"
                        name="title"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.title && touched.title ? (
                        <div className="error">{errors.title}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>brand</label>
                      <Field
                        type="text"
                        label="brand"
                        Placeholder="brand"
                        name="brand"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.brand && touched.brand ? (
                        <div className="error">{errors.brand}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>price</label>
                      <Field
                        type="number"
                        label="price"
                        Placeholder="price"
                        name="price"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.price && touched.price ? (
                        <div className="error">{errors.price}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>description</label>
                      <Field
                        type="text"
                        label="description"
                        Placeholder="description"
                        name="description"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.description && touched.description ? (
                        <div className="error">{errors.description}</div>
                      ) : null}
                    </div>

                    <button type="submit" className="addbtn mt-2">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default AddEditProduct;
