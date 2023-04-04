import React, {useState, useEffect} from 'react';
import styles from '../css/IssueItem.module.css';
import {useSelector} from 'react-redux';
import {Tag} from 'antd';
import {colorArr} from '../util/constant';
import {getUserByIdAPi} from '../api/user';
import {formatDate} from '../util/handler';
import {useNavigate} from 'react-router-dom';
/**
 * 问答列表展示组件
 * 需要传递过来的内容：问答列表数据
 */
export default function IssueItem(props) {
  const [userInfo, setUserInfo] = useState({});
  const {typeList} = useSelector(state => state.type);
  const type = typeList.filter(item => item._id === props.typeId)[0];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const {data} = await getUserByIdAPi(props.userId);
      setUserInfo(data);
    }
    fetchUser();
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.issueNum}>
        <div>{props.commentNumber}</div>
        <div>回答</div>
      </div>
      <div className={styles.issueNum}>
        <div>{props.scanNumber}</div>
        <div>浏览</div>
      </div>
      <div className={styles.issueContainer}>
        <div className={styles.top} onClick={() => navigate(`/issues/${props._id}`)}>{props.issueTitle}</div>
        <div className={styles.bottom}>
          <div>
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>{type.typeName}</Tag>
          </div>
          <div className={styles.right}>
            <Tag color="volcano">{userInfo?.nickname}</Tag>
            <span>{formatDate(props.issueDate, 'year')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
