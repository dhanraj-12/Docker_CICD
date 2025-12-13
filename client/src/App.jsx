import React from "react";
import axios from "axios";
// import { api } from "./config";

function App() {
  const [users, setUsers] = React.useState([]);

  // Get all users
  const handleGet = async () => {
    try {
      const res = await axios.get(`https://dhanraj.southeastasia.cloudapp.azure.com:3000/`);
      console.log(res.data);
      setUsers(res.data); // <-- update UI
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Add a new user
  const handleAdd = async () => {
    try {
      const res = await axios.post(`https://dhanraj.southeastasia.cloudapp.azure.com:3000/add-user`);
      console.log(res.data);

      // refresh list after adding
      handleGet();
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // Run once on component mount
  React.useEffect(() => {
    handleGet();
  }, []);

  return (
    <>
      <button onClick={handleAdd}>Add User</button>
      <button onClick={handleGet}>Get Users</button>

      <h2>Users List:</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index}>{JSON.stringify(user)}</li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </>
  );
}

export default App;
