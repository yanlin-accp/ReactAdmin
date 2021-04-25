import React, { Component } from "react";
import "./login.less";
import logo from "./images/login.png";
import { Form, Input, Button, Checkbox ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from "../../api"
import memoryUntils from '../../untils/memoryUntils';
import storageUntils from '../../untils/storageUntils';
import { Redirect } from "react-router";



function Login(props){

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const {username,password}=values;
            const response= await reqLogin(username,password);
            if(response.status==0){
                memoryUntils.user=response.data; 
                storageUntils.saveUser(response.data);
                message.success('登录成功');
                props.history.replace("/");
            }else{
                message.error('登录失败');
            }
          
       
       
    };
    const user=memoryUntils.user;

    if(user){
        return <Redirect to="/admin"/>
    }
      
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} className="logo" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "请输入用户名!" },
                { min: 4, message: "用户名至少4位" },
                { max: 12, message: "用户名最多12位" },
                { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文、数字或下划线组成" }
              ]}
              validateFirst={true}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码!" },
                {
                    validator: (_, value) =>{
                        if(value.length<4){
                           return Promise.reject(new Error('密码至少4位'))
                        } else if(value.length>12){
                          return  Promise.reject(new Error('密码最多12位'))
                        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                           return Promise.reject(new Error('密码必须是英文、数字或下划线组成'))
                        }else{return Promise.resolve() }
                    }
                       
                  },
              ]}
              validateFirst={true}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
          
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
   
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }


export default Login;
