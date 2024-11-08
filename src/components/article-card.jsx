import Comments from "./comments"
import {Link, useParams} from "react-router-dom"
import { getCommentsByArticleId } from "../api/api"
import { useEffect, useState } from "react"


export default function ArticleCard(props){
    const {article} = props
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    useEffect(()=>{
        setIsLoading(true);

    })

    return <section key={article.id} className="item-card"> 
        <div>
            <img height="150px" src={`${article.article_img_url}`} alt="article image" />
        </div>
        <div className="card-list">
            <ul >
                <Link to={`/articles/${article.article_id}`}>
                    <li> <h4>{article.title}</h4></li>
                </Link>
                <li>Preview: {article.body.split(" ").slice(0,5).join(" ")}...</li>
                <li>Author: {article.author}</li>
                <li>Votes: {article.votes}</li>
                <li>Topic: {article.topic}</li>
                <li>Comments: {article.comment_count}</li>
            </ul>
        </div>
    </section>

}