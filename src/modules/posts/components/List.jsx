import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Card } from './Card';
import { PostContext } from '../../../context/PostContext';

export const List = () => {
  const navigate = useNavigate();
  const { setCurrentPost } = useContext(PostContext)
  const [posts, setPosts] = useState([])

  const routeChange = (post) => {
    let path = '/dashboard';
    navigate(path);
    setCurrentPost(post)
  }

  const handleGetAllPost = () => {
    axios.get('http://localhost:8000/posts').then(response => {
      setPosts(response.data.posts)
    }).catch(() => {
      setPosts([])
    })
  }

  useEffect(() => {
    handleGetAllPost()
  }, [])

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {
        posts.map((post, index) => (
          <div className="col">
            <div
              onClick={() => routeChange(post)}
              style={{ cursor: 'pointer' }}
            >
              <Card
                key={index}
                image={post.image}
                tag={post.tag}
                title={post.title}
                text={`${post.text.substring(0, 150)}...`}
                date={post.createdAt.split('T')[0]}
              />
            </div>
          </div>
        ))
      }
    </div>
  )
}
