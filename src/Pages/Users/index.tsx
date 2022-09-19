import React from "react";
import DashboardLayout from "../../Components/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { DeleteUser, GetAllUsers } from "../../Components/Layouts/Auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddEditUser from "../../Components/Common/AddEditUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserListType {
  id: number;
  phone: number;
  weight: number;
  email: string;
  gender: string;
  firstName: string;
  username: string;
  image: string;
  birthDate: number;
  age: number;
}

const Users = () => {
  const [data, setData] = useState<UserListType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [userid, setUserId] = useState<number>();

  /********* Modal  ************/
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleToggleSidebar = () => setOpenSidebar(!openSidebar);
  const [editableUser, setEditableUser] = useState<any>();
  const [editId, setEditId] = useState<number | null>(null);

  /****** User List Api   *******/
  const getUserList = async (search: string) => {
    const res = await GetAllUsers(search);
    setData(res?.data.users ?? []);
    console.log("Userssss=====>", res?.data.users);
  };
  useEffect(() => {
    getUserList(search);
  }, [search]);

  /****** Add Edit Sidebar Start   *******/
  const handleAddUser = () => {
    setEditableUser(null);
    handleToggleSidebar();
  };
  const handleEditUser = (User: any) => {
    setEditableUser(User);
    handleToggleSidebar();
  };

  const addNewUser = (User: any) => {
    console.log("hurray===>", User);
    const newData = data;
    newData.unshift(User);
    setData(newData);
    handleToggleSidebar();
  };

  const editableUserNew = (values: any) => {
    let newArr = [...data];
    const index = newArr.findIndex((item) => item.id === editId);
    newArr[index] = { ...newArr[index], ...values };
    setData(newArr);
    handleToggleSidebar();
  };
  /****** Add Edit Sidebar End   *******/

  /****** Delete Api Start   *******/
  const deleteRcordsUpdate = async (userid: number) => {
    const response = await DeleteUser(userid);
    await setData(data.filter((item) => item.id !== Number(userid)));
    if (response?.status === 200) {
      handleClose();
      toast.success("Successfully Deleted !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Error !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const deletedatalist = (id: any) => {
    setUserId(id);
  };

  /****** Delete Api End   *******/

  return (
    <>
      <DashboardLayout>
        <div className="users-full">
          <div className="col-md-12">
            <div className="title mb-4 d-flex align-items-center justify-content-between">
              <h1 className="mb-0">User</h1>
              <form>
                <div className="form-group mb-0">
                  <input
                    type="search"
                    placeholder="Search User"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
              <button className="addbtn" onClick={handleAddUser}>
                Add User
              </button>
            </div>
          </div>

          <AddEditUser
            toogleSidebar={handleToggleSidebar}
            show={openSidebar}
            AddUserNew={addNewUser}
            editUser={editableUser}
            updateUser={editableUserNew}
          />

          <div className="users">
            <div className="col-md-12">
              <div className="table-name">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">image</th>
                      <th scope="col">firstName</th>
                      <th scope="col" style={{ width: "25%" }}>
                        email
                      </th>
                      <th scope="col">gender</th>
                      <th scope="col" style={{ width: "10%" }}>
                        age
                      </th>
                      <th scope="col">username</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((item, i) => (
                        <tr key={i}>
                          <td>{item.id}</td>
                          <td>
                            <img src={item.image} alt="" />
                          </td>
                          <td>{item.firstName}</td>
                          <td style={{ width: "15%" }}>{item.email}</td>
                          <td>{item.gender}</td>
                          <td>{item.age}</td>
                          <td>{item.username}</td>
                          <td>
                            <button
                              className="btn btn-edit"
                              onClick={() => {
                                handleEditUser(item);
                                setEditId(item.id);
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
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-end">No Data Found</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Record Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are sure delete record ?</Modal.Body>
                <Modal.Footer>
                  {/* <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button> */}
                  <Button
                    variant="primary"
                    onClick={() => {
                      deleteRcordsUpdate(userid!);
                    }}
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <ToastContainer />
      </DashboardLayout>
    </>
  );
};

export default Users;
