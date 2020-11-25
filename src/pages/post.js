import React from 'react';
import Post from '../components/post/Post';
import MorePostsFromUser from '../components/post/MorePostsFromUser';
import { useParams } from 'react-router-dom';
import Layout from '../components/shared/Layout';

function PostPage() {
  const { postId } = useParams();
  return (
    <Layout>
      <Post postId={postId} />
      <MorePostsFromUser postId={postId} />
    </Layout>
  );
}

export default PostPage;
