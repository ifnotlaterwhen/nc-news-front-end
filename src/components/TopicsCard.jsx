import {Link} from "react-router-dom"
export default function TopicsCard(props){
    const {topic, counts, info} = props;
    return (
        <section key={topic} className="category-card">
            <Link to={`/articles?topic=${topic}`}> 
            <h3>{topic}</h3>
            </Link>
            <p>{info}</p>
            <h5>{counts} Articles</h5>
        </section>
    )


}