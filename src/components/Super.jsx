import React from "react";
import Profile from "./Profile";
import SideBar from "./SideBar";
import superTabs from "../content/super_tabs";

function Super(props) {
  const { children } = props;

  return (
    <section className="admin-section">
      <SideBar
        tabs={superTabs}
        buttonClass={"logout-button-admin"}
        color={"#3F72AF"}
      />

      {children}

      <div className="admin-profile">
        <h1>Profile</h1>
        <Profile
          fullName={"Test"}
          type={"Super Admin"}
        />
      </div>
    </section >
  )
}

export default Super;
