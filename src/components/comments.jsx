import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../api/api"
import Error from "./error";
import CommentCard from "./comment-card";
import CommentAdder from "./comment-adder";

export default function Comments({article_id}){
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);

    const addComment = (commentToAdd)=>{
        setComments((currentComments)=>{
            return [commentToAdd, ...currentComments]
        })
    }
    
    useEffect(()=>{
        setIsError(false);
        getCommentsByArticleId(article_id)
        .then(data=>{
            setComments(data);
            setIsLoading(false)
        })
        .catch(error=>{
            setIsError(true);
            setError(error);
            setIsLoading(false)
        })
    }, [])

    const handleDelete = (deletedCommentId)=>{
        
        setComments(currentComments=>
            currentComments.filter((comment)=> comment.comment_id !== deletedCommentId
            )
        )
    }

    if (isLoading) return (
        <div>
            <h1>Loading...</h1>
        </div>
    )

    if(isError) return <Error error={error}/>

    return (
        <section className="card-list-container">
            <CommentAdder article_id={article_id} addComment={addComment}/>
            <ul className="card-list">
                {comments.map(comment=>{
                    return <li key={comment.comment_id}><CommentCard comment={comment} onDelete={handleDelete}/></li>
                })}
            </ul>
        </section>
    )

}