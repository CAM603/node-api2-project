import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Comments = ({post}) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${post.id}/comments`)
            .then(res => {
                console.log(res)
                setComments(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{width: "100%"}}>
            {comments.map(comment => (
                <div className="comment-container" key={comment.id}>
                    <span className="commentor">🧔🏼</span>
                    <h4 className="commentor-text">{comment.text}</h4>
                    <p>{comment.created_at}</p>
                </div>
            ))}
        </div>
    )
}

export default Comments;