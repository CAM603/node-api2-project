import React, { useState } from 'react'

const AddPost = ({addPost}) => {
    const [post, setPost] = useState({
        title: '',
        contents: ''
    })
    const handleChange = event => {
        setPost({
            ...post,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = event => {
        event.preventDefault()
        addPost(post)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={post.title}
                name="title"
                onChange={handleChange}
                />
                <input
                type="text"
                value={post.contents}
                name="contents"
                onChange={handleChange}
                />
                <button>Add</button>
            </form>
        </div>

    )
}

export default AddPost;
