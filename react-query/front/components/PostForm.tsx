import { AxiosError } from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { InfiniteData, useMutation, useQuery, useQueryClient } from 'react-query';
import { addPostAPI, uploadImagesAPI } from '../apis/post';
import { loadMyInfoAPI } from '../apis/user';

import useInput from '../hooks/useInput';
import Post from '../interfaces/post';
import User from '../interfaces/user';

const PostForm = () => {
  const queryClient = useQueryClient();
  const { data: me } = useQuery<User>('user', loadMyInfoAPI);
  const [loading, setLoading] = useState(false);
  // const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput<string>('');
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const mutation = useMutation<Post, AxiosError, FormData>('posts', addPostAPI, {
    onMutate() {
      if (!me) return;
      setLoading(true);
      queryClient.setQueryData<InfiniteData<Post[]>>('posts', (data) => {
        const newPages = data?.pages.slice() || [];
        newPages[0].unshift({
          id: 0,
          User: me,
          content: text,
          Images: imagePaths.map((v, i) => ({ src: v, id: i })),
          Comments: [],
          Likers: [],
          createdAt: new Date().toString(),
        });
        return {
          pageParams: data?.pageParams || [],
          pages: newPages,
        };
      });
    },
    onSuccess() {
      setText('');
      setImagePaths([]);
      queryClient.refetchQueries('posts');
    },
    onSettled() {
      setLoading(false);
    },
  });
  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    mutation.mutate(formData);
  }, [mutation, text, imagePaths]);

  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, []);

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    uploadImagesAPI<string>(imageFormData).then((result) => {
      setImagePaths((prev) => prev.concat(result));
    });
  }, []);

  const onRemoveImage = useCallback(
    (index: number) => () => {
      setImagePaths((prev) => {
        return prev.filter((v, i) => i !== index);
      });
    },
    [],
  );

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button loading={loading} type="primary" style={{ float: 'right' }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v.replace(/\/thumb\//, '/original/')} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
