import React, { useState, useEffect } from 'react'
import databaseService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'
import { set } from 'react-hook-form';

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const {slug} = useParams();

  useEffect(() => {
    if(slug) {
      databaseService.getPost(slug)
      .then((post) => {
        console.log(post);
        if(post) setPost(post);
      })
    } else {
      navigate("/");
    }

  }, [slug, navigate])
  return post ? (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ): null;
}

export default EditPost