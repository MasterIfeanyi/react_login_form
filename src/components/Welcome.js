import {Link} from "react-router-dom"


const Welcome = ({ loginDetails, setLoginDetails }) => {


    const Logout = () => {
        console.log("Logout");
        setLoginDetails({ name: "", email: "" });
    }


    return (
        <section>
            {loginDetails.name !== "" &&
                <>
                    <h1>Hello</h1>
                    <h2>{loginDetails.name}</h2>
                    <Link to="/"><button className="btn btn-primary" onClick={Logout}>Logout</button></Link>
                </>
            }

        </section>
    )
}

export default Welcome
