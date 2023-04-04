import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import styles from '../css/Personal.module.css';
import PersonalCard from '../components/PersonalCard';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Upload, Modal, Form, message, Button, Input } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { getBase64 } from '../util/handler';
import { checkPasswordApi } from '../api/user';
import { updateUserApi } from '../api/user';
import { updateUserInfo } from '../redux/userSlice';

export default function PersonalCenter() {
  const { userInfo } = useSelector(state => state.user);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('个人中心');
  const [form] = Form.useForm(); // 通过Form.useForm方便调用表单的方法
  const [formInfo, setFormInfo] = useState({
    // oldPassword: null,
    newPassword: null,
    nickname: null,
    mail: null,
    qq: null,
    wechat: null,
    intro: null,
  });
  const dispatch = useDispatch();
  const basicInfo = [
    { label: '登录账号', value: userInfo?.loginId },
    // { label: '账号密码', value: userInfo?.loginPwd }, // 这个密码被加密了，需要解密；如果想显示为****，逻辑上应该直接不显示
    { label: '用户昵称', value: userInfo?.nickname },
    { label: '用户积分', value: userInfo?.points },
    { label: '注册时间', value: userInfo?.registerDate, type: 'date' },
    { label: '上次登录时间', value: userInfo?.lastLoginDate, type: 'date' },
  ]
  const socialAccout = [
    { label: '邮箱', value: userInfo?.mail },
    { label: 'QQ号', value: userInfo?.qq },
    { label: '微信号', value: userInfo?.wechat },
    // { label: 'Github', value: userInfo?.intro }, // 请求过来的数据中没有github字段
  ]

  // ???这里图片传不上去，总是报超过2M的错。。
  const handleChange = (info) => {
    console.log('onchange', info)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      message.success('头像上传成功');
      // setImageUrl(url);
      // });
    }
  }

  const updateInfo = (e, field) => {
    setFormInfo({
      ...formInfo,
      [field]: e.target.value
    })
  }

  let ModalForm = null;
  switch (modalType) {
    case '基本信息':
      ModalForm = (
        <>
          <Form.Item label="登录密码" name="oldPassword" rules={[
            {
              validator: async (rule, value) => {
                //验证登录密码输入是否正确
                if (!value) {
                  return
                }
                const { data } = await checkPasswordApi({ userId: userInfo._id, loginPwd: value });
                if (!data) {
                  return Promise.reject('密码不正确');
                }
              },
              validateTrigger: 'onBlur'
            }
          ]}>
            <Input.Password value={formInfo.oldPassword} />
          </Form.Item>
          <Form.Item label="新密码" name="newPassword" rules={[
            {
              validator: (rule, value) => {
                const oldPassword = form.getFieldValue('oldPassword');
                if (!oldPassword) {
                  return Promise.reject('如果要修改密码，请先输入旧密码')
                }
                if (oldPassword === value) {
                  return Promise.reject('新密码和旧密码一致')
                }
                return Promise.resolve();
              },
              validateTrigger: 'onChange'
            }
          ]}>
            <Input.Password value={formInfo.newPassword} onChange={(e) => updateInfo(e, 'loginPwd')} />
          </Form.Item>
          <Form.Item label="确认密码" name="confirmPassword" rules={[
            {
              validator: (rule, value) => {
                const newPassword = form.getFieldValue('newPassword');
                if (newPassword !== value) {
                  return Promise.reject('两次输入的密码不一致')
                }
                return Promise.resolve();
              },
              validateTrigger: 'onBlur'
            }
          ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="用户昵称" name="nickname">
            <Input value={formInfo.nickname} onChange={(e) => updateInfo(e, 'nickname')} />
          </Form.Item>
        </>
      );
      break;
    case "社交账号":
      ModalForm = (
        <>
          <Form.Item label="邮箱" name="mail">
            <Input value={formInfo.mail} onChange={(e) => updateInfo(e, 'mail')} />
          </Form.Item>
          <Form.Item label="QQ" name="qq">
            <Input value={formInfo.qq} onChange={(e) => updateInfo(e, 'qq')} />
          </Form.Item>
          <Form.Item label="微信" name="wechat">
            <Input value={formInfo.wechat} onChange={(e) => updateInfo(e, 'wechat')} />
          </Form.Item>
        </>
      );
      break;
    case "个人简介":
      ModalForm = (
        <Form.Item name="intro" wrapperCol={{ span: 20, offset: 2 }}>
          <Input.TextArea rows={6} placeholder="写点什么吧~" onChange={(e) => updateInfo(e, 'intro')} />
        </Form.Item>
      )
  }

  const handleCancel = () => {
    form.resetFields(); // 清空表单
    setFormInfo({ // 关闭modal时清空formInfo。提交其他表单内容时，之前表单内容应保持为null
      newPassword: null,
      nickname: null,
      mail: null,
      qq: null,
      wechat: null,
      intro: null,
    });
    setShowModal(false);
  }

  const handleSubmit = () => {
    // 判断有值，再进行提交（修改且有值的项）
    let obj = {};
    for (const prop in formInfo) {
      if (formInfo[prop]) {
        obj[prop] = formInfo[prop];
      }
    }
    updateUserApi(userInfo._id, obj); // 发送请求更新数据库的用户信息
    dispatch(updateUserInfo(obj)); // 更新仓库中的用户信息
    message.success('用户信息更新成功');
    handleCancel(); // 一站式清空表单
  }

  return (
    <div className="wrapper">
      <PageHeader title="个人中心" />
      <div className={styles.container}>
        <div className={styles.row}>
          <PersonalCard title="基本信息" list={basicInfo} setShowModal={setShowModal} setModalType={setModalType}>
            <div style={{ fontWeight: 100, height: 45, lineHeight: '45px' }}>当前头像：</div>
            <Image style={{ width: 100, border: '1px solid #eee' }} src={userInfo?.avatar} />
            <div style={{ fontWeight: 100, height: 45, lineHeight: '45px' }}>上传新头像：</div>
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              action="/api/upload"
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: '100%' }}
                />
              ) : (<div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>)}
            </Upload>
          </PersonalCard>
        </div>
        <div className={styles.row}>
          <PersonalCard title="社交账号" list={socialAccout} setShowModal={setShowModal} setModalType={setModalType} />
        </div>
        <div className={styles.row}>
          <PersonalCard title="个人简介" setShowModal={setShowModal} setModalType={setModalType}>
            <p className={styles.intro}>
              {userInfo.intro || "未填写"}
            </p>
          </PersonalCard>
        </div>
      </div>
      <Modal title={modalType} open={showModal} onCancel={handleCancel} footer={false}>
        <Form
          form={form}
          initialValues={userInfo}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          validateTrigger={['onBlur', 'onChange']}
          onFinish={handleSubmit}
        >
          {ModalForm}
          <Form.Item wrapperCol={{ span: 16, offset: 7 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>确认修改</Button>
            <Button htmlType="reset">重置</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
