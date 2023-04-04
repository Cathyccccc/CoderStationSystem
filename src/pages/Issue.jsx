import React, { useState, useEffect } from 'react';
import styles from '../css/Issue.module.css';
import PageHeader from '../components/PageHeader';
import TagList from '../components/TagList';
import IssueItem from '../components/IssueItem';
import Recommend from '../components/Recommend';
import Question from '../components/Question';
import RankList from '../components/RankList';
import { getIssueListApi } from '../api/issue';
import { Pagination } from 'antd';

export default function Issue() {
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 10
  });
  const [type, setType] = useState('all'); // 默认展示全部的issue
  const [issueList, setIssueList] = useState([]); // 根据typeid查找问答数据时，需要更新issueList

  useEffect(() => {
    let params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      issueStatus: true
    }
    async function fetchIssueList(_params) {
      const { data } = await getIssueListApi(_params);
      setPagination({
        ...pagination,
        total: data.count,
      });
      setIssueList(data.data);
    }
    if (type !== 'all') { // 点击标签后，重新根据类型id请求issue列表
      params.typeId = type; // 这里yapi上api写的有问题，没有写typeId这个参数
    }
    fetchIssueList(params);
  }, [type, pagination.current, pagination.pageSize]); // 标签类型改变、当前页改变、页容量改变都需要重新请求渲染数据

  // 分页修改
  const handlePageChange = (page, pageSize) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize,
    })
  }

  return (
    <div className="wrapper">
      {/* 标题和标签 */}
      <PageHeader title="问答列表">
        <TagList setType={setType} />
      </PageHeader>
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}>
          {/* 问答列表 */}
          {issueList.map(item => <IssueItem {...item} key={item._id} />)}
          {/* 分页 */}
          {issueList.length > 0 ?
            (<div className='paginationContainer'>
              <Pagination {...pagination} showSizeChanger pageSizeOptions={[5, 10, 15, 20]} onChange={handlePageChange} />
            </div>) : (<div className={styles.noIssue}>有问题，就来 coder station！</div>)
          }
        </div>
        <div className={styles.rightSide}>
          {/* 我要发问按钮 */}
          <Question />
          {/* 推荐内容 */}
          <div style={{ margin: '30px 0' }}>
            <Recommend />
          </div>
          {/* 积分排行 */}
          <div style={{ marginBottom: 30 }}>
            <RankList />
          </div>
        </div>
      </div>
    </div>
  )
}
