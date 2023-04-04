import React from 'react';
import styles from '../css/PersonalCard.module.css';
import { Card } from 'antd';
import { formatDate } from '../util/handler';

export default function PersonalCard({ title, list, children, setShowModal, setModalType }) {
  const handleClick = (title) => {
    setModalType(title);
    setShowModal(true);
  }
  return (
    <>
      <Card title={title} extra={<div className={styles.edit} onClick={() => handleClick(title)}>编辑</div>}>
        {list?.map(item => (<div className={styles.infoContainer} key={item.label}>
          <div className={styles.left}>
            <div>{item.label}：</div>
            <div>
              {item.type === 'date' ? (formatDate(item.value, 'year-time') || '未填写') : (item.value || '未填写')}
            </div>
          </div>
        </div>))}
        {children}
      </Card>
    </>
  )
}
