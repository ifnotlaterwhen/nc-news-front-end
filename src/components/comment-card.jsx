import { useContext, useEffect, useState } from "react"
import { deleteCommentById, patchCommentVoteById } from "../api/api"
import { UserContext } from "../contexts/user-context"

export default function CommentCard({comment, onDelete}){

    const [votes, setVotes] = useState(comment.votes)
    const [error, setError] = useState(null)
    const loggedIn = useContext(UserContext)

    const updateVotes = (num)=>{
        setVotes(currentVotes => currentVotes += num
        )
    }

    const handleVote = (num) =>{
        updateVotes(num);
        patchCommentVoteById(comment.comment_id, {inc_votes: num})
        .catch(error=>{
            setError(error);
        })
    }

    const handleDelete = ()=>{
        deleteCommentById(comment.comment_id)
        .then(()=>{
            onDelete(comment.comment_id)
        })
        .catch(error)
    }

    return <section className="comment-card">
            <p>Date: {comment.created_at}</p>
            <p>Author: {comment.author}</p>
            <p>{comment.body}</p>
            <p>Votes: {votes}</p>
            <button onClick={()=>{
                handleVote(1)
            }}>Up vote</button>
            <button onClick={()=>{
                handleVote(-1)
            }}>Down vote</button>
            <button disabled={comment.author != loggedIn.username}
            onClick={()=>{
                handleDelete()
            }}>Delete</button>
    </section>


}