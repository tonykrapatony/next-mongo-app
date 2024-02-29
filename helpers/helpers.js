import {
  useUpdateUserMutation,
  useDeletePostsMutation,
  useUpdatePostMutation,
  useAddCommentMutation,
  useGetUserQuery,
  useGetUserPostsQuery,
  useGetUsersQuery,
  useGetPostCommentsQuery
} from "@/redux";

export const useProfileQueries = () => {
  const [updateUser] = useUpdateUserMutation();
  const [deletePosts] = useDeletePostsMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addComment] = useAddCommentMutation();

  const getUsers = () => {
    const { data, isLoading } = useGetUsersQuery();
    return { data, isLoading };
  };

  const getUser = (slug) => {
    const { data: userInfo, isSuccess } = useGetUserQuery(slug);
    return { userInfo, isSuccess };
  };

  const useGetUserPosts = (slug) => {
    const { data: usrPosts } = useGetUserPostsQuery(slug);
    return { usrPosts };
  };

  const getPostComments = (_id) => {
    const { data: comments, isLoading } =  useGetPostCommentsQuery(_id);
    return { comments, isLoading }
  }

  return {
    addComment,
    getPostComments,
    getUser,
    getUsers,
    useGetUserPosts,
    updateUser,
    deletePosts,
    updatePost,
  };
};
