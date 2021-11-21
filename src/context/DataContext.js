import {createContext, useState, useEffect} from "react"
import api from "../api/posts"


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    
    // validate form fields and store error message in this object
    const [error, setError] = useState({
        nameError: "",
        emailError: "",
        passwordError: "",
    });

    // check if Login details match user info and show this message
    const [loginMessage, setLoginMessage] = useState({
       message: ""
    })


    // if login details match set this boolean to true
    const [correctLogin, setCorrectLogin] = useState(false);
    


    // array of all users
    const [users, setUsers] = useState([])

    // collect user information from form and store in this object
    const [loginDetails, setLoginDetails] = useState({
        name: "",
        email: "",
        password: ""
    });

    // validate form field and set this flag to true or false if there is an error
    const [errorFlag, setErrorFlag] = useState(false)

    //submitted
    const [submitted, setSubmitted] = useState(false)    

    // collect user Information for signin
    const [signInDetails, setSignInDetails] = useState({
        name: "",
        email: "",
        password: "",
    })

    // validate form field and set this flag to true or false if there is an error
    const [signInErrorFlag, setSignInErrorFlag] = useState(false)

    //ask if signin is submitted
    const [signInSubmitted, setSignInSubmitted] = useState(false)    


    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    })


      // check for error in signIn details
        const [signInError, setSignInError] = useState({
            nameError: "",
            emailError: "",
            passwordError: "",
        });





    
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
  
    
    return (
        <DataContext.Provider value={{
            error, setError, loginMessage, setLoginMessage, users, setUsers,
            correctLogin, setCorrectLogin, loginDetails, setLoginDetails,
            errorFlag, setErrorFlag, submitted, setSubmitted,
            signInDetails, setSignInDetails, signInSubmitted, setSignInSubmitted,
            signInErrorFlag, setSignInErrorFlag, signInError, setSignInError,
            newUser, setNewUser
        }}>
            {children}
        </DataContext.Provider>
    )            
}

export default DataContext;