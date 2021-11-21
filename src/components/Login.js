import { useContext } from "react";
import {Link, useHistory} from "react-router-dom"
import DataContext from "../context/DataContext"

const Login = () => {


    const { submitted, setSubmitted, errorFlag, setErrorFlag,
        users, setUsers, error, setError, loginMessage,
        setLoginMessage, correctLogin, newUser, setNewUser, setCorrectLogin,
        loginDetails, setLoginDetails, } = useContext(DataContext);

    const history = useHistory();




    const formValidation = () => {
        // deconstruct user information and check for errors
        const { name, email, password } = loginDetails;
        let isValid = true;
        // check for error in name of user
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
        if (password === "" || password.trim().length < 6) {
        const passwordError = "password must be higher than 6";
            isValid = false;
            setError({ ...error, passwordError })
        }
        
        setErrorFlag(isValid)
        return isValid
  }


    const findUser = () => {
        const thisUser = users.find(user => user.name === loginDetails.name);
        console.log(thisUser)
        try {
            // find out if name and password match
            if (thisUser.name === loginDetails.name && thisUser.email === loginDetails.email && thisUser.password === loginDetails.password) {
                //message for when login details match
                setLoginMessage({ ...loginMessage, message: "Welcome" })
                //if login details match 
                setCorrectLogin(true)
                setNewUser({ ...newUser, name: thisUser.name })
                history.push("/welcome");
                setLoginDetails({
                    name: "",
                    email: "",
                    password: "",
                })
            } else {
                //message for when login details match
                setLoginMessage({ ...loginMessage, message: "did not match" })
                //if login details match 
                setCorrectLogin(false)
            }
        } catch (e) {
            console.log(e.message)
            console.log("error")
            setLoginMessage({ ...loginMessage, message: "Check Login details" })
            setCorrectLogin(false)
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation()
        // find out if validation is true and has no errors
        if (!isValid) {
            return
        } else {
            findUser()
            setSubmitted(true)
        }
    }


    return (
        <>     
            <section className="">

                    <h3 className="text-success mt-4 mb-3">Log In</h3>
                    <div className="container mt-2">
                    

          
                        <form action="" className="row d-flex flex-column justify-content-center align-items-center">
                            <div className="mb-3 col-md-5">
                                <input type="text"
                                    className="form-control"
                                    id="first-name"
                                    placeholder="Name"
                                    value={loginDetails.name}
                                    onChange={e => setLoginDetails({ ...loginDetails, name: e.target.value })}
                                />
                                {/* find out if the name is too short */}
                                {!errorFlag && <p style={{ color: "red" }}>{error.nameError}</p>}
                            </div>
            
                            <div className="mb-3 col-md-5">
                                <input type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="email"
                                    value={loginDetails.email}
                                    onChange={e => setLoginDetails({ ...loginDetails, email: e.target.value })}
                                />
                                {/* find out if email is empty */}
                                {!errorFlag && <p style={{ color: "red" }}>{error.emailError}</p>}
                            </div>
            
            
                            <div className="mb-3 col-md-5">
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="password"
                                    value={loginDetails.password}
                                    onChange={e => setLoginDetails({ ...loginDetails, password: e.target.value })}
                                />
                                {/* find out if password is empty   */}
                                {!errorFlag && <p style={{ color: "red" }}>{error.passwordError}</p>}
                            </div>
            
            
                            <div className="mb-3 col-md-5">
                                <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>Submit</button>
                            </div>
                        </form>
          
                    </div>
                    <div className="d-sm-flex align-items-center justify-content-between text-center lead">
                        <small className="me-4">Do not have an account ?</small>
                        <p className="text-white">
                            <Link to="/"><button className="btn btn-primary">Sign Up</button></Link>
                        </p>
                    </div>
                </section>    
        </>
    )
}

export default Login
