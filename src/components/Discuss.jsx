import React, { useState, useRef, useEffect } from 'react';
import { Comment, Avatar, Form, Button, Input, message, List, Pagination } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Editor } from '@toast-ui/react-editor';
import { useSelector } from 'react-redux';
import { addCommentApi, getIssueCommentApi, getBookCommentApi } from '../api/comment';
import { updateIssueApi } from '../api/issue';
import { updateUserApi, getUserByIdAPi } from '../api/user';
import { updateBookApi } from '../api/book';
import { useParams } from 'react-router';

/**
 * 添加评论+评论列表组件，用于问答详情和书籍详情页面的评论
 * commentType 评论类型（问答/书籍）
 * info 评论针对的对象（问答/书籍）
 */
export default function Discuss(props) {
  const { id } = useParams();
  const { userInfo } = useSelector(state => state.user);
  const editorRef = useRef();
  const [commentValue, setCommentValue] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0
  })
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchCommentList(id, params) {
      let listData = null;
      if (props.commentType === 1) {
        const { data } = await getIssueCommentApi(id, params);
        listData = data;
      } else {
        const { data } = await getBookCommentApi(id, params);
        listData = data;
      }
      // 将用户信息和用户评论合并（请求的评论列表数据中只有用户id，渲染时需要用到用户avatar）
      const newList = [];
      // list.forEach(async (item) => {
      //   const {data} = await getUserByIdAPi(item.userId)
      //   newList.push({...item, ...data});
      // })
      for (let i = 0; i < listData.data.length; i++) {
        const { data } = await getUserByIdAPi(listData.data[i].userId); // 这里使用for循环可以直接使用await
        newList.push({ ...listData.data[i], ...data });
      }
      setCommentList(newList);
      setPagination({
        ...pagination,
        total: listData.count
      })
    }
    fetchCommentList(id, { current: pagination.current, pageSize: pagination.pageSize }); // 这里不能使用props传递过来的_id, 因为有时候传递不过来
  }, [refresh, pagination.current]);

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  }

  const handleSubmit = () => {
    let newComment = null;
    if (props.commentType === 1) {
      newComment = editorRef.current.getInstance().getHTML()
    } else if (props.commentType === 2) {
      newComment = commentValue;
    }
    if (!newComment) {
      message.warn('请输入评论内容')
      return;
    }
    // 新增评论（问答评论和书籍评论公用一个接口）
    addCommentApi({
      userId: userInfo._id,
      typeId: props.info.typeId,
      commentContent: newComment,
      commentType: props.info.commentType,
      bookId: props.commentType === 2 ? id : undefined,
      issueId: props.commentType === 1 ? id : undefined
    });
    // 更新当前问答/书籍信息和用户信息
    if (props.commentType === 1) {
      // 这里应该是评论审核通过后评论数增加！！！否则评论数和实际显示评论数量不符
      // updateIssueApi(props._id, { commentNumber: ++props.commentNumber }); // 当前问答的评论数+1
      // updateUserApi(userInfo._id, { points: userInfo.points + 4 }); // 评论用户的积分+4(这里实际上应该是审核通过后，给用户积分+4)
      message.success('用户评论成功，积分+4');
      editorRef.current.getInstance().setHTML('');
    } else if (props.commentType === 2) {
      // 这里应该是评论审核通过后评论数增加！！！否则评论数和实际显示评论数量不符
      // updateBookApi(props._id, { commentNumber: ++props.commentNumber }); // 当前书籍的评论数+1
      // updateUserApi(userInfo._id, { points: userInfo.points + 2 }); // 评论用户的积分+2(这里实际上应该是审核通过后，给用户积分+2)
      message.success('用户评论成功，积分+2');
      setCommentValue(null);
    }
    // 提交评论后需要重新获取评论列表数据
    // setRefresh(!refresh);
  }

  // 点击分页改变当前页码
  const handlePageChange = (page) => {
    setPagination({
      current: page
    });
  }

  return (
    <div>
      <Comment
        avatar={userInfo ? <Avatar src={userInfo.avatar} alt="用户头像" /> : <Avatar icon={<UserOutlined />} />}
        content={
          <>
            <Form.Item>
              {props.commentType === 1 ?
                (<Editor
                  ref={editorRef}
                  previewStyle="vertical"
                  height="270px"
                  initialEditType="wysiwyg"
                  useCommandShortcut={true}
                  language='zh-CN'
                />) : (<Input.TextArea rows={5} value={commentValue} onChange={handleChange} placeholder={userInfo ? '' : '请登录后添加评论'} />)
              }
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" disabled={userInfo ? false : true} onClick={handleSubmit} type="primary">
                添加评论
              </Button>
            </Form.Item>
          </>
        }
      />
      {/* 评论列表 */}
      {commentList.length > 0 &&
        <List
          bordered
          header="当前评论"
          dataSource={commentList}
          renderItem={(item) => (
            <List.Item>
              <Comment
                avatar={item.avatar}
                content={
                  <div dangerouslySetInnerHTML={{ __html: item.commentContent }}></div>
                }
              />
            </List.Item>
          )}
        />
      }
      {/* 分页或暂无评论 */}
      {commentList.length > 0 ?
        (
          <div className="paginationContainer">
            <Pagination {...pagination} onChange={handlePageChange} />
          </div>
        ) : (
          <div style={{
            fontWeight: "200",
            textAlign: "center",
            margin: "50px"
          }}
          >暂无评论</div>
        )
      }
    </div>
  )
}
