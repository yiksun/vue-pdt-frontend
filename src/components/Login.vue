<template>
    <el-form class="login-form" :rules="rules" ref="loginForm" :model="loginForm" label-width="auto" @submit.native.prevent>
        <div class="login">
            <el-form-item prop="userId">
                <el-input prefix-icon="el-icon-s-custom" v-model="loginForm.userId" placeholder="Staff ID"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input prefix-icon="el-icon-lock" type="password" placeholder="Password" v-model="loginForm.pass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" @click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                userId: '',
                pass: ''
            },
            rules: {
                userId: [
                    { required: true, message: '请输入 Staff ID', trigger: 'blur' },
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    this.axios.post('/api/v1/login', {
                        userId: this.loginForm.userId,
                        password: this.loginForm.pass
                }).then((res) => {
                    if (res.data.result == 'success') {
                        sessionStorage.setItem('username', res.data.username)
                        let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                        this.$router.push({path:redirect})   
                    }
                    this.$message({
                        showClose: true,
                        message: res.data.info,
                        type: res.data.result,
                    })
                    loading.close()
                }).catch((error) => {
                    let msg = '登录失败！' + error
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: 'error'
                    })
                    loading.close()
                })
                } else {
                    this.$message({
                        showClose: true,
                        message: '信息填写不正确！',
                        type: 'warning',
                    })
                    return false;
                }
            })
        }
    },
    created() {
        this.axios.get('/api/v1/session').then((res) => {  // check if session still available
            if (res.data.username != '') {
                sessionStorage.setItem('username', res.data.username)
                let redirect = decodeURIComponent(this.$route.query.redirect || '/')
                this.$router.push({path:redirect})
            }
        }).catch((error) => {
            this.$message({
                showClose: true,
                message: error,
                type: 'error'
            })
        })
    }
}
</script>

<style scoped>
.login-form {
    margin: 0 auto;
    margin-top: 22px;
    width: 300px;
}
.login {
    width: 300px;
}
.el-input,
.el-button {
    width: 100%;
}
</style>
