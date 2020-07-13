<template>
    <el-form class="logger-form" :rules="loggerFormRules" ref="form" :model="form" label-width="100px" label-position="right">
        <el-form-item label="实际消费" prop="totalSpend">
            <el-input 
            v-model="form.totalSpend" 
            placeholder="实际消费金额(RMB)"
            oninput="value=value.replace(/[^\d.\n]/g, '')">
                <template slot="append">¥</template>
            </el-input>
        </el-form-item>
        <el-form-item label="付款人" prop="payer">
            <el-select v-model="form.payer" filterable placeholder="选择付款人">
                <el-option
                v-for="(user, index) in users"
                :key="index"
                :label="user.username"
                :value="user.username">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="消费项目" prop="item">
            <el-input 
            type="textarea" 
            v-model="form.item" 
            placeholder="消费项目" 
            autosize>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">输入明细</el-button>
            <!-- <el-drawer
            title="原始消费金额（折扣前金额）"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="rtl"
            custom-class="logger-drawer"
            ref="drawer">
                <div class="logger-drawer__content">
                    <el-form :model="subForm">
                        <el-form-item 
                        v-for="(user, index) in users" 
                        :key="index">
                            <el-input v-model="user.before_price" placeholder="0" autocomplete="off" oninput="value=value.replace(/[^\d.\n]/g, '')">
                                <template slot="prepend">{{ user.username }}</template>
                                <template slot="append">¥</template>                                
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div class="logger-drawer__footer">
                        <el-button @click="dialog = false">取消</el-button>
                        <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
                    </div>
                </div>
            </el-drawer> -->
            <span class="logger-dialog">
            <el-dialog
            title="原始消费金额（折扣前金额）"
            :visible.sync="dialog"
            :show-close = false
            :close-on-click-modal = false>
                <div class="logger-dialog__content">
                    <el-form :model="subForm">
                        <el-form-item 
                        v-for="(user, index) in users" 
                        :key="index">
                            <el-input v-model="user.before_price" placeholder="0" autocomplete="off" oninput="value=value.replace(/[^\d.\n]/g, '')">
                                <template slot="prepend">{{ user.username }}</template>
                                <template slot="append">¥</template>                                
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="logger-dialog__footer">
                    <el-button @click="dialog = false">取消</el-button>
                    <el-button type="primary" @click="handleClose" :loading="loading">{{ loading ? '提交中 ...' : '确定' }}</el-button>
                </div>
            </el-dialog>
            </span>
            <el-button @click="resetForm('form')">重置表格</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            loading: false,
            users: [],
            form: {
                totalSpend: '',
                payer: '',
                item: ''
            },
            loggerFormRules: {
                totalSpend: [
                    { required: true, message: '请输入实际消费金额', trigger: 'blur' },
                ],
                payer: [
                    { required: true, message: '请选择付款人', trigger: 'change' }
                ],
                item: [
                    { required: true, message: '请输入消费项目', trigger: 'blur'}
                ]
            },
            subForm: {
            },
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialog = true
                } else {
                    this.$message({
                        showClose: true,
                        message: '信息填写不正确！',
                        type: 'warning',
                    })
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        logging() {
            let userlist = []
            let origin_sum = 0.0
            this.users.forEach(element => {
                if (element.before_price.trim() != '') {
                    origin_sum += parseFloat(element.before_price)
                    userlist.push(element)
                }
            })
            if (origin_sum > 0.0) {
                this.axios.post('/api/v1/logging', {
                    total_spend: this.form.totalSpend,
                    payer: this.form.payer,
                    item: this.form.item,
                    origin_sum: origin_sum,
                    userlist: userlist
                }).then((res) => {
                    if (res.data.result == 'success') {
                        this.loading = false
                        this.$message({
                            showClose: true,
                            message: 'log数成功!',
                            type: 'success'
                        })
                    } else {
                        this.loading = false
                        this.$message({
                            showClose: true,
                            message: res.data.result,
                            type: 'error'
                        })
                    }
                }).catch((error) => {
                    this.loading = false
                    this.$message({
                        showClose: true,
                        message: 'log数失败! ' + error,
                        type: 'error'
                    })
                })
            } else {
                this.loading = false
                this.$message({
                        showClose: true,
                        message: '信息填写不正确！',
                        type: 'warning'
                })
            }
        },
        handleClose(done) {
            let msg = '确定要提交表单吗？'
            // let title = '提示'
            this.$confirm(msg, {
                // title: title,
                // confirmButtonText: '确定',
                // cancelButtonText: '取消',
                type: 'warning',
                center: true    // 居中
            }).then(_ => {
                this.loading = true
                this.logging()
                this.resetForm('form')  // 提交后重置form
                done()
            }).catch(_ => {
                this.dialog = false
            })
        }
    },
    created() {
        this.axios.post('/api/v1/get_users').then((res) => {
            this.users = res.data
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

<style>
.logger-form {
    /* margin: 0 auto; */
    margin-top: 22px;
    /* width: 450px; */
}

@media only screen and (min-width: 300px) {
	.logger-form, 
    .logger-dialog .el-dialog__wrapper .el-dialog {
		width: 90vw;
	}
}

@media only screen and (min-width: 700px) {
	.logger-form,
    .logger-dialog .el-dialog__wrapper .el-dialog {
		width: 50vw;
	}
}

@media only screen and (min-width: 1200px) {
	.logger-form,
    .logger-dialog .el-dialog__wrapper .el-dialog {
		width: 30vw;
	}
}

.el-input,
.el-textarea,
.el-select {
    width: 100%;
}

@media only screen and (min-width: 300px) {
    .logger-dialog__content .el-input-group__prepend {
        width: 28vw;
    }
}

@media only screen and (min-width: 700px) {
	.logger-dialog__content .el-input-group__prepend {
        width: 12vw;
    }
}

@media only screen and (min-width: 1200px) {
	.logger-dialog__content .el-input-group__prepend {
        width: 8vw;
    }
}

.logger-dialog__footer {
    padding: 20px 0;
    display: flex;
}

.logger-dialog__footer .el-button {
    flex: 1;
}

.el-form-item__content .el-button--primary {
    margin-right: 10px;
}
</style>
