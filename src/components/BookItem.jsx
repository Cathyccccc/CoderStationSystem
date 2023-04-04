import React from 'react';
import styles from '../css/BookItem.module.css';
import { Image } from 'antd';
import { useNavigate } from 'react-router';

/**
 * 搜索后书籍列表的每一项
 */
export default function BookItem(props) {
  const reg = /<[^<>]+>/g; // 这个没明白
  const bookIntro = props.bookIntro.replace(reg, '');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${props._id}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.bookNum}>
        <div>{props.commentNumber}</div>
        <div>评论</div>
      </div>
      <div className={styles.bookNum}>
        <div>{props.scanNumber}</div>
        <div>浏览</div>
      </div>
      <div className={styles.bookContainer}>
        <div className={styles.left}>
          <Image className={styles.bookPic} src={props.bookPic} />
        </div>
        <div className={styles.right}>
          <div className={styles.top} onClick={handleClick}>{props.bookTitle}</div>
          <div className={styles.bottom}>
            {bookIntro.slice(0, 60)}...
          </div>
        </div>
      </div>
    </div>
  )
}
