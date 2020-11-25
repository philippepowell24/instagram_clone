import React, { useState } from 'react';
import { useFeedPageStyles } from '../styles';
import Layout from '../components/shared/Layout';
import UserCard from '../components/shared/UserCard';
import FeedSideSuggestions from '../components/feed/FeedSideSuggestions';
import FeedPostSkeleton from '../components/feed/FeedPostSkeleton';
import { Hidden } from '@material-ui/core';
import LoadingScreen from '../components/shared/LoadingScreen';
import { LoadingLargeIcon } from '../icons';
import { UserContext } from '../App';
import { useQuery } from '@apollo/react-hooks';
import { GET_FEED } from '../graphql/queries';
import usePageBottom from '../utils/usePageBottom';

const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

function FeedPage() {
  const classes = useFeedPageStyles();
  const { me, feedIds } = React.useContext(UserContext);
  const [isEndOfFeed, setEndOfFeed] = useState(false);
  const variables = { feedIds, limit: 2 };
  const { data, loading, fetchMore } = useQuery(GET_FEED, { variables });
  const isPageBottom = usePageBottom();

  const handleUpdateQuery = React.useCallback((prev, { fetchMoreResult }) => {
    if (fetchMoreResult.posts.length === 0) {
      setEndOfFeed(true);
      return prev;
    }
    return { posts: [...prev.posts, ...fetchMoreResult.posts] };
  }, []);

  React.useEffect(() => {
    if (!isPageBottom || !data) return;
    const lastTimestamp = data.posts[data.posts.length - 1].created_at;
    const updatedVariables = { ...variables, lastTimestamp };

    fetchMore({
      variables: updatedVariables,
      updateQuery: handleUpdateQuery,
    });
  }, [isPageBottom, data, fetchMore, handleUpdateQuery, feedIds]);

  if (loading) return <LoadingScreen />;

  return (
    <Layout>
      <div className={classes.container}>
        {/* Feed Posts */}
        <div>
          {data.posts.map((post, index) => (
            <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
              <FeedPost key={post.id} index={index} post={post} />
            </React.Suspense>
          ))}
        </div>
        {/* Sidebar */}
        <Hidden smDown>
          <div className={classes.sidebarContainer}>
            <div className={classes.sidebarWrapper}>
              <UserCard user={me} avatarSize={50} />
              <FeedSideSuggestions />
            </div>
          </div>
        </Hidden>
        {!isEndOfFeed && <LoadingLargeIcon />}
      </div>
    </Layout>
  );
}

export default FeedPage;
