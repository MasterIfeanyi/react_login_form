import { Link } from 'react-router-dom';


const Missing = () => {
    return (
        <section>
            <h2>Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </section>
    )
}

export default Missing
