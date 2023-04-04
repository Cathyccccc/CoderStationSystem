import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIssueByIdApi, updateIssueApi } from '../api/issue';
import { getUserByIdAPi } from '../api/user';
import Recommend from '../components/Recommend';
import RankList from '../components/RankList';
import PageHeader from '../components/PageHeader';
import styles from '../css/IssueDetail.module.css';
import { Avatar } from 'antd';
import { formatDate } from '../util/handler';
import Discuss from '../components/Discuss';

/**
 * 问答详情页面（问答的具体内容）
 */
export default function IssueDetail() {
  const { id } = useParams();
  const [issueInfo, setIssueInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function fetchIssueDetail(_id) {
      const { data } = await getIssueByIdApi(_id);
      const res = await getUserByIdAPi(data.userId);
      setIssueInfo(data);
      setUserInfo(res.data);
      // 浏览数 +1
      updateIssueApi(id, {
        scanNumber: ++data.scanNumber // 这里不能使用issueInfo，因为初始state中issueInfo为空对象
      });
    }
    if (id) {
      fetchIssueDetail(id);
    }
  }, [])

  return (
    <div className="wrapper">
      <PageHeader title="问题详情" />
      <div className={styles.detailContainer}>
        <div className={styles.leftSide}>
          {/* 问题 */}
          <div className={styles.question}>
            <h1>{issueInfo.issueTitle}</h1>
            <div className={styles.questioner}>
              <Avatar size="small" src={userInfo.avatar} />
              <span className={styles.user}>{userInfo.nickname}</span>
              <span>发布于{formatDate(issueInfo.issueDate)}</span>
            </div>
            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ __html: issueInfo.issueContent }}></div>
            </div>
          </div>
          {/* 评论 */}
          <Discuss commentType={1} info={issueInfo} />
        </div>
        <div className={styles.rightSide}>
          {/* 推荐内容 */}
          <div style={{ marginBottom: 30 }}>
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
