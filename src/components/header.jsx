import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header>
            <h1>NC Gossip Girl</h1>
            <nav className="nav-bar" >
                <Link to="/">Home </Link>
                <Link to="/topics">Topics </Link>
                <Link to="/articles">All articles </Link>
            </nav>
        </header>
    )

}