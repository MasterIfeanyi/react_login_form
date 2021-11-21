import { Link } from "react-router-dom"
import {useContext} from "react"
import DataContext from "../context/DataContext"


const Welcome = () => {


    const { newUser, setNewUser } = useContext(DataContext);
    


    const Logout = () => {
        console.log("Logout");
        setNewUser({ name: "", email: "" });
    }


    return (
        <section>
            {newUser.name !== "" &&
                <>
                    <h1>Hello</h1>
                    <h2>{newUser.name}</h2>
                    <Link to="/"><button className="btn btn-primary" onClick={Logout}>Logout</button></Link>
                </>
            }

        </section>
    )
}

export default Welcome
