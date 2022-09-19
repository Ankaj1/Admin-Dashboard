import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DeleteProduct, GetAllProduct } from "../../Components/Layouts/Auth";
import { Button, Modal } from "react-bootstrap";
import AddEditProduct from "../../Components/Common/AddEditUser/AddEditProduct";

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

const Products = () => {
  const [data, setData] = useState<ProductListType[]>([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [show, setShow] = useState(false);
  const [productid, setProductId] = useState<number>();
  const [search, setSearch] = useState<string>("");
  const [editableProduct, setEditableProduct] = useState<any>();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleToggleSidebar = () => setOpenSidebar(!openSidebar);

  /****** ProductList Api Start   *******/

  const AllProduct = async (search: string) => {
    const res = await GetAllProduct(search);
    setData(res?.data.products);
    console.log("products=====>", res?.data.products);
  };

  useEffect(() => {
    AllProduct(search);
  }, [search]);

  /****** ProductList Api End   *******/

  /****** Delete Api Start   *******/
  const deleteRcordsUpdate = async (productid: number) => {
    const response = await DeleteProduct(productid);
    await setData(data.filter((item) => item.id !== Number(productid)));
    if (response?.status === 200) {
      handleClose();
    }
  };

  const deletedatalist = (id: any) => {
    setProductId(id);
    console.log("Product Id ===>", id);
  };

  /****** Delete Api End   *******/

  /****** Add Edit Sidebar Start   *******/
  const handleAddProduct = () => {
    setEditableProduct(null);
    handleToggleSidebar();
  };
  const handleEditProduct = (product: any) => {
    setEditableProduct(product);
    handleToggleSidebar();
  };

  const addNewProduct = (product: any) => {
    console.log("hurray===>", product);
    const newData = data;
    newData.unshift(product);
    setData(newData);
    handleToggleSidebar();
  };

  const editableProductNew = (values: any) => {
    let newArr = [...data];
    const index = newArr.findIndex((item) => item.id === Number(values.id));
    const newObj = { ...data[index], ...values };
    newArr[index] = newObj;
    setData(newArr);
    handleToggleSidebar();
  };

  /****** Add Edit Sidebar End   *******/

  return (
    <>
      <DashboardLayout>
        <div className="products">
          <div className="col-md-12">
            <div className="title mb-0 d-flex align-items-center justify-content-between">
              <h1 className="mb-0">Products</h1>
              <form>
                <div className="form-group mb-0">
                  <input
                    type="search"
                    placeholder="Search Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
              <button className="addbtn" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
          </div>

          <AddEditProduct
            toogleSidebar={handleToggleSidebar}
            show={openSidebar}
            AddProductNew={addNewProduct}
            editProduct={editableProduct}
            updateProduct={editableProductNew}
          />

          <div className="row mt-3">
            {data && data.length > 0 ? (
              data.map((item, i) => (
                <div className="col-md-4" key={i}>
                  <div className="product-box">
                    <div className="btnsedit-delete">
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          handleEditProduct(item);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-edit delete-btn"
                        onClick={() => {
                          handleShow();
                          deletedatalist(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="product-img">
                      <img src={item.images[0]} alt="product" />
                    </div>
                    <div className="product-text">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="title">
                          <h2>{item.title}</h2>
                        </div>
                        <div className="price">
                          <h2>{item.price}</h2>
                        </div>
                      </div>
                      <div className="dis">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="no-found"> No Data Found </div>
              </>
            )}
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Record Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>You are sure delete record ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  deleteRcordsUpdate(productid!);
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Products;
