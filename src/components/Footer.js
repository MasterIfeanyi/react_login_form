const Footer = () => {

    const today = new Date();

    return (
        <footer>
            <p>Chima Ifeanyi &copy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer
