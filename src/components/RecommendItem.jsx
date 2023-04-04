import React from 'react';
import styles from '../css/RecommendItem.module.css';

export default function RecommendItem({recommendInfo}) {
  return (
    <a className={styles.container} href={recommendInfo.href} target="_blank" rel='noreferrer'>
      <div className={styles.leftSide}>{recommendInfo.num}</div>
      <div className={styles.rightSide}>{recommendInfo.title}</div>
    </a>
  )
}
