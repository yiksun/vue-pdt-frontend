<template>
    <header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router @select="handleSelect">
            <el-tooltip content="≡ω≡: meow?" placement="bottom">
                <el-menu-item index="" @click="meow"><img class="logo" src="..\..\src\assets\cat.png" alt="CAT"></el-menu-item>
            </el-tooltip>
            <el-tooltip content="消费明细" placement="bottom">
                <el-menu-item index="/detail"><span class="el-icon-tickets"></span></el-menu-item>
            </el-tooltip>
            <el-tooltip content="点我log数！" placement="bottom">
                <el-menu-item index="/logger"><span class="el-icon-edit"></span></el-menu-item>
            </el-tooltip>
            <el-tooltip content="触目惊心！" placement="bottom">
                <el-menu-item index="/summary"><span class="el-icon-bank-card"></span></el-menu-item>
            </el-tooltip>
            <el-menu-item index="" v-if="username" @click="logout" style="float: right"><span class="el-icon-switch-button"></span></el-menu-item>
            <!-- <el-menu-item index="" v-if="username" @click="logout" style="float: right">{{ username }}</el-menu-item> -->
        </el-menu>
        <div class="line"></div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '0',
                username: ''
            }
        },
        mounted() {
            this.updateUsername()
        },
        watch: {
            '$route': 'updateUsername', // 路由每次跳转时触发updateUsername()
            username(newName) {
                if (newName != '' && newName != null && newName != 'null') {
                    sessionStorage.setItem('username', newName)
                }
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath)
            },
            updateUsername() {
                sessionStorage.getItem('username') != '' ? this.username = sessionStorage.getItem('username') : this.username = ''
            },
            logout() {
                this.axios.post('/api/v1/logout').then((res) => {
                    if (res.data.result == 'success') {
                        this.$message({
                            showClose: true,
                            message: '注销成功!',
                            type: 'success',
                        })
                        sessionStorage.clear()
                        this.$router.push('/login')
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.result,
                            type: 'error',
                        })
                    }
                }).catch((error) => {
                    this.$message({
                        showClose: true,
                        message: '注销失败! ' + error,
                        type: 'error',
                    })
                })
            },
            meow() {
                this.$message({
                    showClose: true,
                    message: '≡ω≡~~喵喵喵~好痒~喵喵喵~',
                    center: true,
                    type: 'success'
                })
            }
        }
    }
</script>

<style scoped>
.logo {
    width: 35px;
}

a {
    text-decoration: none;
}
</style>
