import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getIssueListApi } from '../api/issue';
import { getBookByPageApi } from '../api/book';
import PageHeader from '../components/PageHeader';
import Recommend from '../components/Recommend';
import RankList from '../components/RankList';
import styles from '../css/SearchPage.module.css';
import IssueItem from '../components/IssueItem';
import BookItem from '../components/BookItem';
import { Pagination } from 'antd';
/**
 * 搜索结果列表组件（问答/书籍关键字搜索列表+分页）
 */
export default function SearchPage() {
  const location = useLocation();
  const { searchOptions, value } = location.state; // 页面刷新后搜索框中的value就不显示了
  console.log(location.state)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
    issueStatus: true
  })
  const [renderList, setRenderList] = useState(null);

  useEffect(() => {
    let params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      issueStatus: true
    }
    const fetchData = async (_params) => {
      let list = null;
      switch (searchOptions) {
        case 'issue':
          _params.issueTitle = value;
          const res = await getIssueListApi(_params);
          list = res.data.data.map(item => <IssueItem {...item} key={item._id} />)
          setRenderList(list);
          setPagination({
            ...pagination,
            total: res.data.count
          })
          break;
        case 'book':
          _params.bookTitle = value;
          const {data} = await getBookByPageApi(_params);
          list = data.data.map(item => <BookItem {...item} key={item._id} />)
          setRenderList(list);
          setPagination({
            ...pagination,
            total: data.count
          })
          break;
      }
      // if (resData.data) {
      //   setList(resData.data.data);
      //   setPagination({
      //     ...pagination,
      //     total: resData.data.count
      //   })
      // }
    }
    fetchData(params);
  }, [value, location.state, pagination.current]);

  return (
    <div className="wrapper">
      <PageHeader title="搜索结果" />
      <div className={styles.searchPageContainer}>
        <div className={styles.leftSide}>
          {renderList ?
            (<div>
              {renderList}
              <Pagination {...pagination} />
            </div>)
            :
            (<div className={styles.noResult}>未搜索到符合条件的条目</div>)}
        </div>
        <div className={styles.rightSide}>
          <div style={{ marginBottom: 30 }}>
            <Recommend />
          </div>
          <div style={{ marginBottom: 30 }}>
            <RankList />
          </div>
        </div>
      </div>
    </div>
  )
}
