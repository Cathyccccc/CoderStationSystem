import React, { useState, useEffect } from 'react';
import { fetchInterviewTitleList } from '../redux/interviewSlice';
import { fetchTypeList } from '../redux/typeSlice';
import {useDispatch, useSelector} from 'react-redux';
import PageHeader from '../components/PageHeader';
import styles from '../css/Interview.module.css';
import { Tree } from 'antd';
import {getInterviewByIdApi} from '../api/interview';

export default function Interview() {
  const {interviewTitleList} = useSelector(state => state.interview);
  const {typeList} = useSelector(state => state.type);
  const [treeData, setTreeData] = useState([]);
  const [interviewInfo, setInterviewInfo] = useState(null);
  const dispatch = useDispatch();

  // 获取某个面试题详细信息
  const fetchInterviewDetail = async (_id) => {
    const {data} = await getInterviewByIdApi(_id);
    setInterviewInfo(data);
  }

  useEffect(() => {
    if (!typeList.length) {
      dispatch(fetchTypeList());
    }
    if (!interviewTitleList?.length) {
      dispatch(fetchInterviewTitleList());
    }
    // typeList和interviewTitleList一一对应，这里interviewTitleList有些项为空数组，说明对应分类下没有面试题
    // 将typeList和interviewTitleList进行拼接
    let arr = [];
    typeList.forEach((item, index) => {
      arr.push({
        title: <h3 style={{fontWeight:"200"}}>{item.typeName}</h3>,
        key: index
      })
    })
    interviewTitleList?.forEach((itemArr, i) => {
      let childrenArr = [];
      itemArr.forEach((item, j) => {
        childrenArr.push({
          title: <h4 style={{fontWeight: 200}} onClick={() => fetchInterviewDetail(item._id)}>{j+1}. {item.interviewTitle}</h4>,
          key: `${i}-${j}`
        })
      })
      arr[i].children = childrenArr;
    })
    setTreeData(arr); // 将拼接后的数据设置为treeData作为渲染的treeNode
    if(interviewTitleList) {
      fetchInterviewDetail(interviewTitleList[0][0]._id); // 初始页面显示第一条面试题
    }
  }, [typeList, interviewTitleList]);

  let interviewRightSide = null;
  if (interviewInfo) {
    interviewRightSide = (
      <div className={styles.content}>
        <h1 className={styles.interviewRightTitle}>{interviewInfo.interviewTitle}</h1>
        <div className={styles.contentContainer}>
          <div dangerouslySetInnerHTML={{__html: interviewInfo.interviewContent}}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <PageHeader title="面试题大全" />
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          <Tree treeData={treeData} />
        </div>
        <div className={styles.rightSide}>
          {interviewRightSide}
        </div>
      </div>
    </div>
  )
}
