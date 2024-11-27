import { useState } from "react";
import PersonForm from "./Components/PersonForm";

function App() {
  const BOYS = 1;
  const GIRL = 2;
  const OTHER = 1;

  const [state, setState] = useState({
    boys: Array(BOYS).fill({
      title: "",
      name: "",
      email: "",
      phone: "",
      image:'',
    }),
    girls: Array(GIRL).fill({
      title: "",
      name: "",
      email: "",
      phone: "",
      image:'',
    }),
    others: Array(OTHER).fill({
      title: "",
      name: "",
      email: "",
      phone: "",
      image:'',
    }),
  });

  const handleFormChange = (type, index, updatedForm) => {
    setState((prev) => ({
      ...prev,
      [type]: prev[type]?.map((form, i) => (i === index ? updatedForm : form)),
    }));
  };

  const renderForms = (type) => (
    <>
      {state[type]?.map((from, i) => (
        <PersonForm
          key={i}
          title={`${type} ${i + 1}`}
          formData={from}
          onChange={(updatedForm) => handleFormChange(type, i, updatedForm)}
        />
      ))}
    </>
  );

  const handelSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.values(state)
      .flat()
      .every((item) => item.title && item.name && item.email && item.phone);
    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }
    console.log("Data Submit Successfully", state);
  };

  return (
    <>
      <div>
        <h1>Multiple Form Data Submit</h1>
        <form onSubmit={handelSubmit}>
          {renderForms("boys")}
          {renderForms("girls")}
          {renderForms("others")}
          <br />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
