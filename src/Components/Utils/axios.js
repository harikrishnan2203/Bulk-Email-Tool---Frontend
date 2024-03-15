import axios from "axios";

const API = "http://localhost:5000";

export const signUp = (values) => {
    return axios({
        url: `${API}/user/signup`,
        method: "post",
        data: values
    });
};

export const login = (values) => {
    return axios({
        url: `${API}/user/login`,
        method: "post",
        data: values
    });
};

export const emailverify = (id) => {
    return axios ({
        url: `${API}/user/verifyemail/${id}`,
        method: "get"
    })
}

export const resetPassword = (values) => {
    return axios({
        url: `${API}/user/resetpassword`,
        method: "post",
        data: values
    })
}

export const checkUser =  (value)=>{
    return axios({
          url:`${API}/user/resetpassword/${value}`,
          method:"get"
        })
}

export const changePassword =  (values , string)=>{
    // console.log(values, string)
    return axios({
          url:`${API}/user/changepassword/${string}`,
          method:"post",
          data:values
        })
}

export const DeleteCred =  ()=>{
    return axios({
          url:`${API}/mail/deletion-cred`,
          method:"delete",
          headers:{
            "Auth-Token":localStorage.getItem("Auth-Token"),
            'user':localStorage.getItem("user")
        }
        })
}
  
export const GetLogs =  ()=>{
    return axios({
          url:`${API}/mail/get-logs`,
          method:"get",
          headers:{
            "Auth-Token":localStorage.getItem("Auth-Token"),
            'user':localStorage.getItem("user")
        }
        })
}

export const CreateCred =  (values)=>{
    // console.log(values)
    return axios({
          url:`${API}/mail/create-cred`,
          method:"post",
          data:values,
          headers:{
            "Auth-Token":localStorage.getItem("Auth-Token"),
            'user':localStorage.getItem("user")
        }
        })
}
  
export const GetCred =  ()=>{
    return axios({
          url:`${API}/mail/get-cred`,
          method:"get",
          headers:{
            "Auth-Token":localStorage.getItem("Auth-Token"),
            'user':localStorage.getItem("user")
        }
        })
}
  
export const SendEmail = (values) => {
    console.log(values)
    return axios({
        url: `${API}/mail/sendmail`,
        method: "post",
        data: values,
        headers: {
            "Auth-Token": localStorage.getItem("Auth-Token"),
            "user": localStorage.getItem('user')
        }
    })
}

export const ChartLogs = (values) => {
    console.log(values)
    return axios({
        url: `${API}/mail/chart`,
        method: "post",
        data: values,
        headers: {
            "Auth-Token": localStorage.getItem("Auth-Token"),
            "user": localStorage.getItem('user')
        }
    })
}

export const ChartAcceptanceData = (values) => {
    console.log(values)
    return axios({
        url: `${API}/mail/chart`,
        method: "post",
        data: values,
        headers: {
            "Auth-Token": localStorage.getItem("Auth-Token"),
            "user": localStorage.getItem('user')
        }
    })
}

