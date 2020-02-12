import React, { useState, useEffect} from 'react';
import axios from 'axios'
import Comments from './Comments';
import AddPost from './AddPost';
import './App.css';

function App() {
  const [posts, setPosts] = useState([])

  const getPosts = () => {
    axios.get(`http://localhost:5000/api/posts`)
      .then(res => {
        console.log(res)
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getPosts()
  }, [])

  const addPost = (post) => {
    axios.post(`http://localhost:5000/api/posts`, post)
      .then(res => {
        getPosts()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h1>Posts</h1>
      <AddPost
      addPost={addPost}
      />
      {posts.map(post => (
        <div className="post-container" key={post.id}>
          <div className="poster-container">
            <span className="poster">👩🏽</span>
            <h2>{post.title}</h2>
            <h2>{post.contents}</h2>
          </div>
          
            <Comments post={post}/>
          
        </div>
      ))}
    </div>
  );
}

export default App;
