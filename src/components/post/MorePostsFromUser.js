import { Typography } from '@material-ui/core';
import React from 'react';
import { LoadingLargeIcon } from '../../icons';
import { useMorePostsFromUserStyles } from '../../styles';
import { getDefaultPost, defaultUser } from '../../data';
import GridPost from '../shared/GridPost';
import { Link } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { GET_POST, GET_MORE_POSTS_FROM_USER } from '../../graphql/queries';
import { UserContext } from '../../App';

function MorePostsFromUser({ postId }) {
  const variables = { postId };
  console.log(variables);
  const { data, loading } = useQuery(GET_POST, { variables });
  console.log(data);
  const [
    getMorePostsFromUser,
    { data: morePosts, loading: loadingMorePosts },
  ] = useLazyQuery(GET_MORE_POSTS_FROM_USER);
  const classes = useMorePostsFromUserStyles();

  React.useEffect(() => {
    if (loading) return;
    const postId = data.posts_by_pk.id;
    const userId = data.posts_by_pk.user.id;
    const variables = { userId, postId };
    getMorePostsFromUser({ variables });
  }, [data, loading, getMorePostsFromUser]);

  return (
    <div className={classes.container}>
      {loading || loadingMorePosts ? (
        <LoadingLargeIcon />
      ) : (
        <>
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="h2"
            gutterBottom
            className={classes.typography}
          >
            More Posts from{' '}
            <Link
              to={`/${data.posts_by_pk.user.username}`}
              className={classes.link}
            >
              @{data.posts_by_pk.user.username}
            </Link>
          </Typography>
          <article className={classes.article}>
            <div className={classes.postContainer}>
              {morePosts?.posts.map((post) => (
                <GridPost key={post.id} post={post} />
              ))}
            </div>
          </article>
        </>
      )}
    </div>
  );
}

export default MorePostsFromUser;
