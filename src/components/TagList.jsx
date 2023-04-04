import React, { useEffect } from 'react';
import { colorArr } from '../util/constant';
import { Tag } from 'antd';
import { fetchTypeList } from '../redux/typeSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function TagList(props) {
  const dispatch = useDispatch();
  const { typeList } = useSelector(state => state.type);

  useEffect(() => {
    dispatch(fetchTypeList());
  }, [])

  const changeType = (type) => {
    props.setType(type); // 这里为了触发改变问答的数据显示
  }

  return (
    <div>
      <Tag
        color="magenta"
        value="all"
        style={{ cursor: "pointer" }}
        onClick={() => changeType("all")}
      >全部</Tag>
      {typeList.map((item, index) => (
        <Tag key={item._id} color={colorArr[index % colorArr.length]} style={{ cursor: "pointer" }} onClick={() => changeType(item._id)}>{item.typeName}</Tag>
      ))}
    </div>
  )
}
