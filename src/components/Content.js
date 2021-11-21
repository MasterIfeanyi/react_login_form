import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import api from "../api/posts"

const Content = () => {

  // check for error in login details
  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // check for error in form validation (Boolean)
  const [errorFlag, setErrorFlag] = useState(false);

  // users array to store all users
  const [users, setUsers] = useState([])


  // collect user Information
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('./users');
        // if (response && response.data) setPosts(response.data);
        setUsers(response.data)
      } catch (err) {
        if (err.response) {
          //not in the response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])


  // function to add user information to JSON server
  const addUser = async(details) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id, ...details };
    try {
      const send = await api.post(`/users`, newUser);
      const newList = [...users, send.data];
      setUsers(newList)
      localStorage.setItem("newListOfUsers", JSON.stringify(newList))
    } catch (e) {
      console.log(e.message)
    }
  }

  // function to validate form field input
  const formValidation = () => {
    // deconstruct user information and check for errors
    const { name, email, password } = details;
    let isValid = true;
    if (name.trim().length < 6 || name === "") {
      const nameError = "username must be higher than 6";
      setError({...error, nameError})
      isValid = false;
    }
    if (email === "") {
       const emailError = "email cannot be empty";
      isValid = false;
      setError({ ...error, emailError })
    }
    if (password.trim().length < 6 || password === "") {
      const passwordError = "password must be higher than 6";
      isValid = false;
      setError({ ...error, passwordError })
    }
    
    setErrorFlag(isValid)
    return isValid
  }




  // function to run when form is submitted
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(details)
    const isValid = formValidation();
    if (!isValid) {
      return
    } else {
      addUser(details)
      setSubmitted(true)
   }

    //clear out login details field
    setDetails({
      name: "",
      email: "",
      password: "",
    })
  }


  return (
    <>
      <section className="">


        <h3 className="text-success mt-4 mb-3">Sign Up</h3>
        <div className="container mt-5">
            
            {submitted && errorFlag ? <div className="alert alert-primary text-center"><p>Submitted Successfully</p></div> : null}
          
            <form action="" className="row d-flex flex-column justify-content-center align-items-center">
                <div className="mb-3 col-md-5">
                    <input type="text"
                      className="form-control"
                      id="first-name"
                      required
                      placeholder="Name"
                      value={details.name}
                      onChange={e => setDetails({...details, name: e.target.value})}
              />
              {!errorFlag && <p style={{color:"red"}}>{ error.nameError }</p>}
                </div>
            
                <div className="mb-3 col-md-5">
                    <input type="text"
                      className="form-control"
                      id="email"
                      required
                      placeholder="email"
                      value={details.email}
                      onChange={e => setDetails({...details, email: e.target.value})}
              />
              {!errorFlag && <p style={{color:"red"}}>{error.emailError}</p>}
                </div>
            
            
              <div className="mb-3 col-md-5">
                  <input type="password"
                    className="form-control"
                    id="password"
                    required
                    placeholder="password"
                    value={details.password}
                    onChange={e => setDetails({...details, password: e.target.value})}
              />
              {!errorFlag && <p style={{color:"red"}}>{error.passwordError}</p>}
              </div>
            
            
                <div className="mb-3 col-md-5">
                  <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>Submit</button>
                </div>
            </form>
          
        </div>
        <div className="d-sm-flex align-items-center justify-content-between text-center lead">
          <small className="me-4">Already have an account ?</small>
          <p className="text-white">
            <Link to="/login"><button className="btn btn-primary">Log In</button></Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Content;
