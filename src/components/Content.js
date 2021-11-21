import {useContext } from "react";
import { Link, useHistory} from "react-router-dom"
import api from "../api/posts"
import DataContext from "../context/DataContext"

const Content = () => {

  const { users, setUsers, signInErrorFlag, setSignInErrorFlag,
    signInSubmitted, setSignInSubmitted,
    signInDetails, setSignInDetails,
    signInError, setSignInError, newUser, setNewUser } = useContext(DataContext);

  const history = useHistory();

 

  // function to add user information to JSON server
  const addUser = async(details) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id, ...signInDetails };
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
    const { name, email, password } = signInDetails;
    let isValid = true;
    if (name.trim().length < 6 || name === "") {
      const nameError = "username must be higher than 6";
      setSignInError({...signInError, nameError})
      isValid = false;
    }
    if (email === "") {
       const emailError = "email cannot be empty";
      isValid = false;
      setSignInError({ ...signInError, emailError })
    }
    if (password.trim().length < 6 || password === "") {
      const passwordError = "password must be higher than 6";
      isValid = false;
      setSignInError({ ...signInError, passwordError })
    }
    
    setSignInErrorFlag(isValid)
    return isValid
  }




  // function to run when form is submitted
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(signInDetails)
    const isValid = formValidation();
    if (!isValid) {
      return
    } else {
      addUser(signInDetails)
      setNewUser({...newUser, name: signInDetails.name})
      setSignInSubmitted(true)
      history.push("/welcome");
   }

    //clear out login details field
    setSignInDetails({
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
            
            {(signInSubmitted && signInErrorFlag) ? <div className="alert alert-primary text-center"><p>Submitted Successfully</p></div> : null}
          
            <form action="" className="row d-flex flex-column justify-content-center align-items-center">
                <div className="mb-3 col-md-5">
                    <input type="text"
                      className="form-control"
                      id="first-name"
                      required
                      placeholder="Name"
                      value={signInDetails.name}
                      onChange={e => setSignInDetails({...signInDetails, name: e.target.value})}
              />
              {!signInErrorFlag && <p style={{color:"red"}}>{ signInError.nameError }</p>}
                </div>
            
                <div className="mb-3 col-md-5">
                    <input type="text"
                      className="form-control"
                      id="email"
                      required
                      placeholder="email"
                      value={signInDetails.email}
                      onChange={e => setSignInDetails({...signInDetails, email: e.target.value})}
              />
              {!signInErrorFlag && <p style={{color:"red"}}>{signInError.emailError}</p>}
                </div>
            
            
              <div className="mb-3 col-md-5">
                  <input type="password"
                    className="form-control"
                    id="password"
                    required
                    placeholder="password"
                    value={signInDetails.password}
                    onChange={e => setSignInDetails({...signInDetails, password: e.target.value})}
              />
              {!signInErrorFlag && <p style={{color:"red"}}>{signInError.passwordError}</p>}
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
