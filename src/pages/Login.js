import { Col, Row, Typography, Card, Space, Image, Divider, Form, Input, Button, Checkbox, Modal, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../service'

export default function Login() {
    let nav = useNavigate()


    async function doLogin({adminName,adminPwd,remember}){
        if(remember){
            localStorage['adminName'] = adminName
            localStorage['adminPwd'] = adminPwd
            localStorage['remember'] = remember
        } else {
            delete localStorage['adminName']
            delete localStorage['adminPwd']
            delete localStorage['remember']
        }

        adminName = adminName.trim();
        if(adminName.length<4 || adminName.length>24){
            message.error("用户名格式不正确!",4)
            return;
        }
        adminPwd = adminPwd.trim();
        if(adminPwd.length<6 || adminPwd.length>24){
            message.error("password length is not right!",4)
            return;
        }

        let data = await adminLogin(adminName,adminPwd);
        //4.处理登录结果
        if(data.code === 2000){//登录成功
          //--存储令牌
          localStorage['adminToken'] = data.token
          //--提示 欢迎回来 -- 放到首页中提示
          //--跳转到主页
          nav('/admin')
          return;
        }else{//登录失败
          //--模态对话框,提示错误消息
          Modal.error({
            title:"登录失败!",
            content:"登录失败！服务器返回消息："+data.msg,
            okText:"确定"
          })
          return;
        }
    }
    return (
        <div style={{
            backgroundImage: 'url(img/bg.jpg)',
            height: "100vh",
            backgroundSize: '100% 100%'
        }}>
            <Row style={{paddingTop: '17vh'}}>
                <Col style={{width: '550px', margin: '0 auto'}}>
                    <Typography.Title level={2} style={{textAlign: 'center',color:'#fff'}}>
                            Administration Stytem
                    </Typography.Title>
                    <Card>
                        <Space>
                            <Image src='img/u794.jpg' width={200} preview={false}/>
                            <Divider type='vertical' style={{backgroundColor: '#3f9bde', height: '40vh'}}/>
                            <Form 
                                labelCol={{span:16}}
                                wrapperCol={{span:8}}
                                style={{paddingTop: '35px'}}
                                onFinish={doLogin}
                                initialValues={{
                                    adminName:localStorage['adminName'],
                                    adminPwd:localStorage['adminPwd'],
                                    remember:localStorage['remember']
                                }}
                                >
                                    <Form.Item 
                                        label="Username"
                                        name="adminName"
                                        rules={[{required: true}]}
                                    >
                                        <Input placeholder="plz input username"/>
                                    </Form.Item>
                                    <Form.Item 
                                        label="Password"
                                        name="adminPwd"
                                        rules={[{required: true}]}
                                    >
                                        <Input placeholder="plz input password"/>
                                    </Form.Item>
                                    <Form.Item 
                                        wrapperCol={{span:14,offset:0}}
                                        name='remember'
                                        valuePropName='checked'
                                        >
                                            <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <Form.Item 
                                        wrapperCol={{span:12,offset:5}}
                                    >
                                        <Button style={{width:'100%'}} type='primary' htmlType='submit'>
                                            Sign In
                                        </Button>
                                    </Form.Item>
                            </Form>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
