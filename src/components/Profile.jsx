import React from 'react';
import profileImage from "../assets/images/default_pic.png";

function Profile(props) {
  const { fullName, type, desc } = props;

  return (
    <>
      <img src={profileImage} alt="" />
      <h2>{fullName}</h2>
      <h5>{type}</h5>
      <p>{desc}</p>
      <button><h3>Edit Profile</h3></button>
    </>
  );
}

export default Profile;
