import React from "react";
import defaultPic from "../assets/images/default_pic.png";
import editImage from "../assets/images/edit.png"
import cancelImage from "../assets/images/cancel.png"

function Table(props) {
  const { headers, contents, addClass, editButton, deleteButton } = props;

  return (
    <div>
      <section className={`table-content ${addClass && addClass}`}>
        {headers.map((header, index) => {
          return (
            <p key={index}>{header}</p>
          )
        })}
      </section>
      {contents.map((content, index) => {
        return (
          <div key={index}>
            <p>{content.id}</p>
            {<p><img className="profile-image" src={defaultPic} alt="default" /></p>}
            <p>{content.email}</p>
            {content.userType && <p>{content.userType}</p>}
            {<p>
              <div
                style={{ display: "inline-block" }}
                onClick={() => editButton(content.id.toString())}
              >
                <img className="edit-image" src={editImage} alt="default" />
              </div>
              <div
                style={{ display: "inline-block" }}
                onClick={() => deleteButton(content.id.toString())}
              >
                <img className="edit-image" src={cancelImage} alt="default" />
              </div>
            </p>}
          </div>
        )
      })}
    </div>
  )
}

export default Table;
