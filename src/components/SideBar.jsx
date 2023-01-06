import React from "react";
import Tab from "../components/Tab";
import logout from "../assets/images/logout.svg";
import { useLocation } from "react-router-dom";

function SideBar(props) {
  const { addClass, buttonClass, color } = props;
  const currentLocation = useLocation();

  return (
    <div className={`admin-sidebar ${addClass && addClass}`}>
      <h1>Task Manager</h1>
      {props.tabs.map((tab, index) => {
        return (
          <Tab
            key={index}
            content={tab.content}
            icon={tab.icon}
            url={tab.path}
            active={currentLocation.pathname === tab.path}
            color={color}
          />
        )
      })}
      <Tab
        addClass={buttonClass}
        content={"Log Out"}
        icon={logout}
        url={"/"}
        logout={true}
      />
    </div>
  )
}

export default SideBar;
