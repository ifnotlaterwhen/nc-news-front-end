import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById, patchArticleVoteById} from "../api/api";
import Error from "./error";
import Comments from "./comments";

export default function ArticleDetails(){
    const {article_id} = useParams();
    const [article, setArticle] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);
    const [votes, setVotes] = useState(0)

    useEffect(()=>{
        setIsError(false);
        getArticleById(article_id)
        .then((data) =>{
            setArticle(data);
            setVotes(data.votes)
            setIsLoading(false)
        })
        .catch(error=>{
            setIsError(true);
            setError(error);
            setIsLoading(false)
        })

    }, [article_id])

    const updateVotes = (num)=>{
        setVotes(currentVotes=> currentVotes += num)
    }

    const handleVote = (num) =>{
        updateVotes(num);
        patchArticleVoteById(article.article_id, {inc_votes: num})
        .catch(error=>{
            setError(error);
        })
    }

    if (isLoading) return (
        <div>
            <h1>Loading...</h1>
        </div>
    )

    if(isError) return <Error error={error}/>

    return (
    <section key={article.article_id} className="article-details"> 
        <div>
            <img height="300px" src={`${article.article_img_url}`} alt="article image" />
        </div>
        <div className="card-list">
            <h3>{article.title}</h3>
            <ul >
                <li>Author: {article.author}</li>
                <li>Topic: {article.topic}</li>
            </ul>
            <p>{article.body}</p>
        </div>
        <h4>Votes: {votes}</h4>
        <button onClick={()=>{
                handleVote(1)
            }}>Up vote</button>
            <button onClick={()=>{
                handleVote(-1)
            }}>Down vote</button>
        <div className="card-list-container">
            <h3>Comments</h3>
             <Comments article_id={article.article_id}/>
        </div>
    </section>
)
}