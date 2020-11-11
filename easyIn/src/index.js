import React from 'react';
//import ReactDOM from 'react-dom';

export default function App() {
  const[firstname, setfirstname] = React.useState("");
  const[lastname, setlastname] = React.useState("");
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");


  const handleSubmit = (event) => {
    console.log(`
    FirstName: ${firstname}
    LastName: ${lastname}
    Email: ${email}
    Password: ${password}
    `);

    event.preventDefault();
  }

return (
  <form onSubmit={handleSubmit}>
    <h1>Register your account</h1>

    <label>
    FirstName
    <input
      name="firstName"
      type="textbox"
      value={Text}
      required />
  </label>

  <label>
    LastName
    <input
      name="lastName"
      type="textbox"
      value={Text}
      required />
  </label>

  <label>
    Email:
    <input
      name="email"
      type="email"
      value={email}
      required />
  </label>

  <label>
    Password:  <input
      name="password"
      type="password"
      value={password}
      required />
  </label>

  <label>
    Email:
    <input
      name="email"
      type="email"
      value={email}
      required />
  </label>

  
<button>Submit</button>
  </form>
);

}
