import React from "react";

const Sidebar = ({ users }) => (
  <div id="sidebar">
    <ul>
      {users.map(user => (
        <li key={user.attrs.username}>
          {user.attrs.language} {user.attrs.username}{" "}
          {user.attrs.online ? "logged in" : null}
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
