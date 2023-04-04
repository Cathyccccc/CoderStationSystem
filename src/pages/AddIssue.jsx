import React, { useRef, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTypeList } from '../redux/typeSlice';
import { addIssueApi } from '../api/issue';
import { useNavigate } from 'react-router';

export default function AddIssue() {
  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const {typeList} = useSelector(state => state.type);
  const {userInfo} = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTypeList());
  }, []);

  const handleSubmit = async (values) => {
    const data = {
      issueTitle: values.issueTitle,
      issueContent: editorRef.current.getInstance().getHTML(), //这个问题描述修改为空时，不会触发验证
      userId: userInfo._id,
      typeId: values.typeId
    }
    addIssueApi(data);
    message.success('问题已提交，审核通过后将会展示');
    form.resetFields();
    navigate('/');
  }
  return (
    <div style={{ padding: 50 }} className="wrapper">
      <Form
        form={form}
        wrapperCol={{ span: 20 }}
        labelCol={{ span: 2 }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item label="标题" name="issueTitle" rules={[{required: true, message: '请输入标题'}]}>
          <Input />
        </Form.Item>
        <Form.Item label="问题分类" name="typeId" rules={[{required: true, message: '请选择问题分类'}]}>
          <Select options={[...typeList.map(item => ({value: item._id, label: item.typeName}))]} />
        </Form.Item>
        <Form.Item label="问题描述" name="issueContent" rules={[{required: true, message: '请添加问题描述'}]}>
          <Editor
            ref={editorRef}
            initialValue=""
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            language='zh-CN'
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20, offset: 2 }}>
          <Button type="primary" style={{ marginRight: 15 }} htmlType="submit">确认新增</Button>
          <Button htmlType="reset">重置</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
