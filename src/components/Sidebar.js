import React from "react";

const Sidebar = ({ users }) => (
  <div
    style={{
      flex: "1",
      marginRight: "3em",
      borderRight: "1px solid gray"
    }}
  >
    <ul style={{ position: "sticky", top: "2em" }}>
      {users.map(user => {
        const author = user.attrs.username;
        return (
          <li key={author}>
            <img
              src={`./assets/flags/${author.language}.png`}
              alt={author.language}
            />{" "}
            {author.slice(-14, author.length) === ".id.blockstack"
              ? author.slice(0, -14)
              : author}{" "}
            {user.attrs.online ? "logged in" : null}
          </li>
        );
      })}
    </ul>
  </div>
);

export default Sidebar;
