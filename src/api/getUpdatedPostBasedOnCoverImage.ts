import { EditPostFormValues } from '../types/form';
import { Post, UpdatedPost } from '../types/post';
import uploadFileInStorage from './uploadFileInStorage';

type EditDataWithPostCover = {
  editData: EditPostFormValues;
  post: Post;
};
const getUpdatedPostBasedOnCoverImage = async (
  data: EditDataWithPostCover
): Promise<UpdatedPost> => {
  const {
    editData: { postCover },
  } = data;
  let updatedPost: UpdatedPost;

  if (postCover.length === 0) {
    updatedPost = {
      body: data.editData.postBody,
      title: data.editData.postTitle,
      coverImage: data.post.coverImage,
    };
  } else {
    const url = await uploadFileInStorage(
      postCover[0],
      `${data.post.author.id}/postCoverImages/${postCover[0].name}`
    );
    updatedPost = {
      body: data.editData.postBody,
      title: data.editData.postTitle,
      coverImage: url,
    };
  }

  return updatedPost;
};

export default getUpdatedPostBasedOnCoverImage;
