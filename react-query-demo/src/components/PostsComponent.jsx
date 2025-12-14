import { useState } from 'react';
import { 
  useQuery,
  useQueryClient,
  keepPreviousData 
} from '@tanstack/react-query';
import { 
  useInfiniteQuery,
  useMutation 
} from '@tanstack/react-query';

// Function to fetch posts
const fetchPosts = async ({ pageParam = 1, pageSize = 10 }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${pageSize}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const totalCount = response.headers.get('x-total-count');
  const data = await response.json();
  return {
    posts: data,
    nextPage: pageParam + 1,
    totalPosts: parseInt(totalCount || '100'),
    hasMore: pageParam * pageSize < parseInt(totalCount || '100')
  };
};

// Function to fetch a single post
const fetchPostById = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch post ${postId}`);
  }
  return response.json();
};

export default function PostsComponent() {
  const [page, setPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const queryClient = useQueryClient();

  // Query for paginated posts with all specified options
  const { 
    data, 
    isLoading, 
    isError, 
    error,
    isFetching,
    isPlaceholderData
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts({ pageParam: page, pageSize: 10 }),
    
    // All the required options:
    cacheTime: 5 * 60 * 1000, // 5 minutes - how long data stays in cache after becoming inactive
    staleTime: 2 * 60 * 1000, // 2 minutes - how long data is considered fresh before refetching
    refetchOnWindowFocus: true, // Refetch when window regains focus
    keepPreviousData: true, // Keep previous data while fetching new data
    
    // Additional useful options:
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true, // Refetch when reconnecting to network
  });

  // Query for single post with caching
  const { 
    data: selectedPost,
    isLoading: isPostLoading
  } = useQuery({
    queryKey: ['post', selectedPostId],
    queryFn: () => fetchPostById(selectedPostId),
    enabled: !!selectedPostId, // Only run query when selectedPostId is truthy
    cacheTime: 10 * 60 * 1000, // 10 minutes cache for single posts
    staleTime: 5 * 60 * 1000, // 5 minutes stale time for single posts
  });

  // Infinite query example (alternative to pagination)
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => 
      lastPage.hasMore ? lastPage.nextPage : undefined,
    
    // Applying the same options
    cacheTime: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    if (data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['posts', page + 1],
        queryFn: () => fetchPosts({ pageParam: page + 1, pageSize: 10 }),
        staleTime: 2 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
      });
    }
  };

  // Invalidate and refetch posts
  const refreshPosts = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  // Clear cache example
  const clearCache = () => {
    queryClient.clear();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading posts...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Error loading posts</h3>
        <p className="text-red-600 mt-1">{error.message}</p>
        <button
          onClick={refreshPosts}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const { posts = [], totalPosts = 0, hasMore = false } = data || {};

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Posts</h1>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="text-gray-600">
            Showing {posts.length} of {totalPosts} posts
          </div>
          <div className="flex gap-2">
            <button
              onClick={refreshPosts}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isFetching}
            >
              {isFetching ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={clearCache}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Cache
            </button>
          </div>
        </div>
        
        {/* Cache Status Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <strong>Cache Status:</strong> Data cached for 5 minutes, stale after 2 minutes.
            Auto-refreshes on window focus.
            {isPlaceholderData && ' (Showing cached data while fetching)'}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPostId(post.id)}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-600 line-clamp-3">{post.body}</p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Post ID: {post.id} | User ID: {post.userId}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <span className="text-gray-700 font-medium">
          Page {page} {hasMore && `of ${Math.ceil(totalPosts / 10)}`}
        </span>
        
        <button
          onClick={() => {
            setPage((old) => old + 1);
            prefetchNextPage();
          }}
          disabled={!hasMore}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Selected Post Details */}
      {selectedPost && (
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Post Details</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">{selectedPost.title}</h3>
            <p className="text-gray-700">{selectedPost.body}</p>
            <button
              onClick={() => setSelectedPostId(null)}
              className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* Query Info Panel */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">React Query Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-700">Cache Settings</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• <code>cacheTime</code>: 5 minutes (300,000ms)</li>
              <li>• <code>staleTime</code>: 2 minutes (120,000ms)</li>
              <li>• <code>keepPreviousData</code>: true</li>
            </ul>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-700">Refetch Behavior</h4>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• <code>refetchOnWindowFocus</code>: true</li>
              <li>• <code>refetchOnMount</code>: true</li>
              <li>• <code>refetchOnReconnect</code>: true</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}