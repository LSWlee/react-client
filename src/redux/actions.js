/*
  作用：包含多个用来创建action的action creators
  类别：
    1. 同步action creator
      返回值是action对象
    2. 异步action creator
      返回值是函数 dispatch => {xxx}
 */
import {reqRegister, reqLogin , reqUpdate,reqGetUserInfo,reqGetUserList} from '../api';
import {AUTH_SUCCESS, AUTH_ERROR,RESET_USERINFO,UPDATE_USERINFO,RESET_USERLIST,UPDATE_USERLIST} from './action-types';
//定义同步action creator
export const authSuccess = data => ({type: AUTH_SUCCESS, data});
export const authError = data => ({type: AUTH_ERROR, data});

export const upDateUserInfo = data => ({type:UPDATE_USERINFO,data});
export const resetUserInfo = data => ({type:RESET_USERINFO,data});

export const upDateUserList = data => ({type:UPDATE_USERLIST,data});
export const resetUserList = () => ({type:RESET_USERLIST});

//定义异步action creator
export const register = ({username, password, rePassword, type}) => {
  //表单验证
  if (!username) {
    //变成同步action creator
    return authError({errMsg: '请输入用户名'});
  } else if (!password) {
    return authError({errMsg: '请输入密码'});
  } else if (password !== rePassword) {
    return authError({errMsg: '两次密码输入不一致'});
  }
  
  return dispatch => {
    //做异步任务，发送ajax请求
    reqRegister({username, password, type})
      .then(({data}) => {
        //请求成功~
        if (data.code === 0) {
          //注册成功~
          //更新状态, 分发成功的action对象
          dispatch(authSuccess(data.data));
        } else {
          //注册失败，更新状态，分发失败的action对象
          dispatch(authError({errMsg: data.msg}));
        }
      })
      .catch(err => {
        //请求失败~
        dispatch(authError({errMsg: '网络不稳定，请刷新试试~'}));
      })
  }
}

export const login = ({username, password}) => {
  //表单验证
  if (!username) {
    return authError({errMsg: '请输入用户名'});
  } else if (!password) {
    return authError({errMsg: '请输入密码'});
  }
  
  return dispatch => {
    //发送请求
    reqLogin({username, password})
      .then(({data}) => {
        if (data.code === 0) {
          //登录成功
          dispatch(authSuccess(data.data));
        } else {
          //登录失败
          dispatch(authError({errMsg: data.msg}));
        }
      })
      .catch(err => {
        dispatch(authError({errMsg: '网络错误，请刷新试试~'}));
      })
    
  }
  
}

export const update = ({header,post,company,salary,info,type}) => {
  //表单验证
  if(!header){
    return authError({errMsg:'请选择头像'})
  }else if(!post){
    return authError({errMsg: '请填写招聘职位'});
  }else if(type === 'laoban' && !company){
    return authError({errMsg: '请填写公司简介'});
  }else if(type === 'laoban' && !salary){
    return authError({errMsg: '请填写职位薪资'});
  }else if(!info){
    return authError({errMsg: '请填写职位要求'});
  }

  return dispatch => {
    reqUpdate({header,post,company,salary,info})
      .then(({data}) => {
        if(data.code === 0){
          dispatch(authSuccess(data.data))
        }else{
          dispatch(authError({errMsg:data.msg}))
        }
      })
      .catch(err => {
        dispatch(authError({errMsg:'网络不好请重试'}))
      })
  }
}

export const getUserInfo = () => {

  return dispatch => {
    reqGetUserInfo()
      .then(({data}) => {
        if(data.code === 0){
          dispatch(upDateUserInfo(data.data))
        }else{
          dispatch(resetUserInfo({errMsg:data.msg}))
        }
      })
      .catch(err => {
        dispatch(resetUserInfo({errMsg:'网络出问题了请刷新试试'}))
      })
  }
}

export const getUserList = type => {
  return dispatch => {
    reqGetUserList(type)
      .then(({data}) => {
        if(data.code === 0){
          dispatch(upDateUserList(data.data))
        }else{
          dispatch(resetUserList())
        }
      })
      .catch(err => {
        dispatch(resetUserList())
      })

  }
}