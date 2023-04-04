import React from 'react';
import styles from '../css/PageHeader.module.css';

/**
 * 每个页面基本都会显示的大标题、标签列表
 */
export default function PageHeader(props) {
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>{props.title}</div>
      {props.children}
    </div>
  )
}
