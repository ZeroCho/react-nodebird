import { AxiosResponse } from 'axios';
import React, { useState, useCallback, VFC } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';

const { TextArea } = Input;

interface Props {
  postData: string;
  editMode?: boolean;
  onChangePost: (e: any) => Promise<AxiosResponse>;
  onCancelUpdate: () => void;
}
const PostCardContent: VFC<Props> = ({ postData, editMode, onChangePost, onCancelUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [editText, setEditText] = useState(postData);

  const onChange = useCallback(() => {
    setLoading(true);
    onChangePost(editText)
      .then(() => {
        onCancelUpdate();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [editText, onCancelUpdate, onChangePost]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    // 첫 번째 게시글 #해시태그 #해시태그
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={loading} onClick={onChange}>
              수정
            </Button>
            <Button danger onClick={onCancelUpdate}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((v: string, i: number) => {
          if (v.match(/(#[^\s#]+)/)) {
            return (
              <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
                <a>{v}</a>
              </Link>
            );
          }
          return v;
        })
      )}
    </div>
  );
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
