<template>
    <el-form class="register-form" :rules="rules" ref="registerForm" :model="registerForm" label-width="auto" @submit.native.prevent>
        <div class="register">
            <el-form-item prop="userId">
                <el-input prefix-icon="el-icon-s-custom" v-model="registerForm.userId" placeholder="Staff ID"></el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input prefix-icon="el-icon-s-custom" v-model="registerForm.username" placeholder="Username"></el-input>
            </el-form-item>
            <el-form-item prop="pass1">
                <el-input prefix-icon="el-icon-lock" type="password" placeholder="Password" v-model="registerForm.pass1"></el-input>
            </el-form-item>
            <el-form-item prop="pass2">
                <el-input prefix-icon="el-icon-lock" type="password" placeholder="Repeat Password" v-model="registerForm.pass2"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit" @click="onSubmit('registerForm')">注册</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                userId: '',
                username: '',
                pass1: '',
                pass2: ''
            },
            rules: {
                userId: [
                    { required: true, message: '请输入 Staff ID', trigger: 'blur' },
                ],
                username: [
                    { required: true, message: '请输入 Username', trigger: 'blur' },
                ],
                pass1: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                pass2: [
                    { required: true, message: '请确认密码', trigger: 'blur' }
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
                    this.axios.post('/api/v1/register', {
                        userId: this.registerForm.userId,
                        username: this.registerForm.username,
                        password1: this.registerForm.pass1,
                        password2: this.registerForm.pass2
                }).then((res) => {
                    if (res.data.result == 'success') {
                        let msg = this.registerForm.userId + ' 注册成功！'
                        this.$message({
                            showClose: true,
                            message: msg,
                            type: res.data.result
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.result,
                            type: 'error'
                        })
                    }
                    loading.close()
                }).catch((error) => {
                    let msg = '注册失败！' + error
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
    }
}
</script>

<style scoped>
.register-form {
    margin: 0 auto;
    margin-top: 22px;
    width: 300px;
}
.register {
    width: 300px;
}
.el-input,
.el-button {
    width: 100%;
}
</style>
