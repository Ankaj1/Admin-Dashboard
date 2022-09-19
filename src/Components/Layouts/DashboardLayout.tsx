import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const DashboardLayout = ({ children, ...props }: Props) => {
  return (
    <>
      <div className="page-content">
        <Header />
        <aside className="d-flex div-main">
          <Sidebar />
          <div className="main-content">{children}</div>
        </aside>
      </div>
    </>
  );
};

export default DashboardLayout;
