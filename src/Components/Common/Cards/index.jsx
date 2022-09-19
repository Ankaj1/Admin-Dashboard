import { useEffect, useState } from "react";
import { GetAllProduct, GetAllUsers } from "../../Layouts/Auth";

const Cards = () => {
  const [producttotal, setProductTotal] = useState([]);
  const [usertotal, setUserTotal] = useState([]);

  /***************** All Product Api  ******************/
  const AllProduct = async () => {
    const response = await GetAllProduct();
    setProductTotal(response?.data);
    console.log("TotalProducts =======>", response?.data);
  };

  useEffect(() => {
    AllProduct();
  }, []);

  /***************** All User Api  ******************/
  const AllUsers = async () => {
    const response = await GetAllUsers();
    setUserTotal(response?.data);
    console.log("TotalUsers =======>", response?.data);
  };

  useEffect(() => {
    AllUsers();
  }, []);

  return (
    <>
      <div className="cards pt-2 pb-3">
        <div className="row">
          <div className="col-md-3">
            <div className="boxes">
              <h2>Products</h2>
              <p>
                Total <strong> {producttotal.total} </strong>
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="boxes">
              <h2>User</h2>
              <p>
                Total <strong> {usertotal.total} </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
