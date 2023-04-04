import React from 'react';
import styles from '../css/RankItem.module.css';
import { Avatar } from 'antd';
const classNames = require('classnames');

/**
 * 积分排行每一项的显示组件
 */
export default function RankItem(props) {
  const classCollection = classNames(styles.rank, 'iconfont', 'icon-jiangbei');
  let rankNum = null;
  switch(props.rank) {
    case 0:
      rankNum = (
        <div className={classCollection} style={{ color: '#ffda23', fontSize: '22px'}}></div>
      )
      break;
    case 1:
      rankNum = (
        <div className={classCollection} style={{ color: '#c5c5c5', fontSize: '22px'}}></div>
      )
      break;
    case 2:
      rankNum = (
        <div className={classCollection} style={{ color: '#cd9a62', fontSize: '22px'}}></div>
      )
      break;
    default:
      rankNum = (
        <div className={styles.rank}>{props.rank + 1}</div>
      )
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {rankNum}
        <div className={styles.avatar}>
          <Avatar src={props.avatar} size="small" />
        </div>
        <div>{props.nickname}</div>
      </div>
      <div className={styles.right}>{props.points}</div>
    </div>
  )
}
