import React, { useState, useEffect } from 'react';
import { getBookByIdApi } from '../api/book';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import PageHeader from '../components/PageHeader';
import styles from '../css/BookDetail.module.css';
import { Image, Modal, message } from 'antd';
import Discuss from '../components/Discuss';
import { updateUserApi } from '../api/user';
import { updateUserInfo } from '../redux/userSlice';

export default function BookDetail() {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState({});
  const { userInfo } = useSelector(state => state.user);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBookDetail(_id) {
      const { data } = await getBookByIdApi(_id);
      setBookInfo(data);
    }
    if (id) {
      fetchBookDetail(id);
    }
  }, []);

  const handleOk = () => {
    // 打开链接页面
    // 当前用户扣除相应的积分
    const result = userInfo.points - bookInfo.requirePoints;
    if (result >= 0) {
      updateUserApi(userInfo._id, { points: result }); // 修改用户积分
      // 更新本地仓库用户信息
      dispatch(updateUserInfo({points: result}));
      message.info('积分已扣除');
      window.open(bookInfo.downloadLink);
    } else {
      message.warning('积分不足');
    }
    setShowModal(false);
  }

  return (
    <div className="wrapper">
      <PageHeader title="书籍详情" />
      <div className={styles.bookInfoContainer}>
        <div className={styles.leftSide}>
          <div className={styles.img}>
            <Image src={bookInfo.bookPic} height={350} />
          </div>
          <div className={styles.link}>
            <span>下载所需积分<span className={styles.requirePoints}> {bookInfo.requirePoints} </span>分</span>
            {
              userInfo && <div className={styles.downloadLink} onClick={() => setShowModal(true)}>百度云下载地址</div>
            }
          </div>
        </div>
        <div className={styles.rightSide}>
          <h1 className={styles.title}>《 {bookInfo.bookTitle} 》</h1>
          <div dangerouslySetInnerHTML={{ __html: bookInfo.bookIntro }}></div>
        </div>
      </div>
      <div className={styles.comment}>
        <Discuss commentType={2} info={bookInfo} />
      </div>
      <Modal title="重要提示" open={showModal} onOk={handleOk} onCancel={() => setShowModal(false)}>
        <p>是否使用 <span className={styles.requirePoints}>{bookInfo?.requirePoints}</span> 积分下载此书籍？</p>
      </Modal>
    </div>
  )
}
