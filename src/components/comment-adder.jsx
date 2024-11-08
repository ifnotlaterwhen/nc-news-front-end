import { useContext, useState } from "react";
import { postCommentByArticleId } from "../api/api";
import { UserContext } from "../contexts/user-context";

export default function CommentAdder({article_id, addComment}){
    const [userComment, setUserComment] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState(null)
    const loggedIn = useContext(UserContext)
    return (
        <>
        {isPosting && <p>posting comment</p>}
        <form 
        className="comment-adder"
        onSubmit={(e)=>{
            e.preventDefault();
            setIsPosting(true);
            postCommentByArticleId(article_id, {body: userComment, username: loggedIn.username })
            .then(data=>{
                setIsPosting(false);
                addComment(data);
            })
            .catch(error=>{
                setError("post unsuccessful")
                setIsPosting(false);
            });
            setUserComment("");
        }}>
            <label htmlFor="new-comment">Share your thoughts...</label>
            <div>
                <input
                id="new-comment"
                type="text"
                value={userComment}
                onChange={({target: {value}})=>{
                    setUserComment(value);
                }}
                />
                <button disabled={error != null}>
                    {error === null ? "Comment": "Posting unavailable"}
                </button>
            </div>
        </form>
        </>
    )
}