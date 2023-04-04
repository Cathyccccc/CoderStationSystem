import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { getRankListApi } from '../api/user';
import RankItem from './RankItem';

/**
 * 积分排行组件
 */
export default function RankList() {
  const [rankList, setRankList] = useState([]);
  useEffect(() => {
    async function fetchRankList() {
      const { data } = await getRankListApi();
      setRankList(data);
    }
    fetchRankList();
  }, []);
  return (
    <Card title="积分排行">
      {rankList.map((item, index) => <RankItem {...item} rank={index} key={index} />)}
    </Card>
  )
}
