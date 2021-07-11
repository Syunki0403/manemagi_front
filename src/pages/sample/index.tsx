import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TPostState } from '../../types/Post';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BaseButton } from '../../components/common/uiParts/atoms';
import { fetchPosts } from '../../reducks/services/Post';

// TODO いずれこちらのページは削除。表示角煮尿として使用
const Sample: React.FC = () => {
  const dispatch = useDispatch();
  const { post, posts } = useSelector((state: { postState: TPostState }) => state.postState);

  console.log('postのstateは', post);
  console.log('postsのstateは', posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <CommonWrapTemplate>
      <hr className="my-10" />
      <h3>ボタンサンプル</h3>
      <BaseButton
        color="primary"
        onClick={() => console.log('click')}
        startIcon="addCircleOutline"
        variant="contained"
      >
        登録
      </BaseButton>
      <BaseButton
        color="primary"
        onClick={() => console.log('click')}
        startIcon="arrowBack"
        variant="contained"
      >
        戻る
      </BaseButton>
      <BaseButton
        color="primary"
        onClick={() => console.log('click')}
        startIcon="search"
        variant="contained"
      >
        検索
      </BaseButton>
      <BaseButton
        color="inherit"
        onClick={() => console.log('click')}
        startIcon="update"
        variant="contained"
      >
        更新
      </BaseButton>
      <BaseButton
        color="secondary"
        onClick={() => console.log('click')}
        startIcon="delete"
        variant="contained"
      >
        削除
      </BaseButton>
      <hr className="my-10" />
      <h3>Reduxのサンプル実装</h3>
      {posts?.map((post, index) => (
        <p key={index}>{post.title}</p>
      ))}
      <hr className="my-10" />
    </CommonWrapTemplate>
  );
};

export default Sample;
