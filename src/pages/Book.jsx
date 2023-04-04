import React, { useState, useEffect } from 'react';
import styles from '../css/Book.module.css';
import PageHeader from '../components/PageHeader';
import TagList from '../components/TagList';
import { getBookByPageApi } from '../api/book';
import { Pagination, Card } from 'antd';
import { useNavigate } from 'react-router';

export default function Book() {
  const [bookList, setBookList] = useState([]);
  const [type, setType] = useState('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    let params = {
      current: pagination.current,
      pageSize: pagination.pageSize
    }
    if (type !== 'all') {
      params.typeId = type;
    }
    async function fetchBookList(_params) {
      const {data} = await getBookByPageApi(_params);
      setBookList(data.data);
      setPagination({
        ...pagination,
        total: data.count
      })
    }
    fetchBookList(params);
  }, [pagination.current, type]);

  let blankDiv = [];
  if (bookList.length % 5 !== 0) {
    const blank = 5 - bookList.length % 5;
    for (let i = 0; i < blank; i++) {
      blankDiv.push(<div key={Math.random()} style={{ width: 220, marginBottom: 20 }}></div>);
    }
  }

  const handlePageChange = (page) => {
    setPagination({
      ...pagination,
      current: page
    });
  }

  return (
    <div className="wrapper">
      <PageHeader title="最新资源">
        <TagList setType={setType} />
      </PageHeader>
      <div className={styles.bookContainer}>
        {bookList.map(item => (
          <Card
          key={item._id}
          hoverable
          style={{
            width: 200,
            marginBottom: 30
          }}
          cover={<img src={item.bookPic} style={{
            width: 160,
            height: 200,
            margin: 'auto',
            marginTop: 10
          }} />}
          onClick={() => navigate(`/books/${item._id}`)}
        >
          <Card.Meta title={item.bookTitle} description={
            <div className={styles.numberContainer}>
              <div>浏览数：{item.scanNumber}</div>
              <div>评论数：{item.commentNumber}</div>
            </div>
          } />
          </Card>
        ))}
        {blankDiv.length > 0 && blankDiv}
      </div>
      <div className="paginationContainer">
        {bookList.length > 0 ?
          (<Pagination showQuickJumper {...pagination} onChange={handlePageChange} />)
          :
          (<div style={{fontSize: "26px", fontWeight:"200"}}>该分类下暂无书籍</div>)
        }
      </div>
    </div>
  )
}
