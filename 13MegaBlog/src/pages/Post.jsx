import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Button } from "../components";
import parse from "html-react-parser";

function Post() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={databaseService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>
        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css text-[20px]">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
