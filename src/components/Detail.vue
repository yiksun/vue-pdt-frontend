<template>
    <el-table
        :data="tableData.filter(data => !search 
        || data.create_time.toLowerCase().includes(search.toLowerCase())
        || data.item.toLowerCase().includes(search.toLowerCase())
        || data.users.toLowerCase().includes(search.toLowerCase()))"
        size="mini"
        height="700"
        style="width: 100%"
        >
        <!-- :cell-class-name="tableCellClassName" -->
        <el-table-column label="时间" prop="create_time" sortable></el-table-column>
        <el-table-column label="项目" prop="item" sortable></el-table-column>
        <el-table-column label="金额" prop="total_spend" sortable>
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <div v-for="(user, index) in scope.row.user_details" :key="index">
                        <span>{{ user.username }}: </span>
                        <font> ¥ {{ user.after_price }}</font>
                    </div>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="mini">¥ {{ scope.row.total_spend }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="折扣" prop="discount" sortable></el-table-column>
        <el-table-column label="金主" prop="payer_name" sortable></el-table-column>
        <el-table-column label="记账" prop="operator_name" sortable></el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="medium" placeholder="Search"/>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            search: '',
        }
    },
    methods: {
        // tableCellClassName({row, column, rowIndex, columnIndex}) {
        //     if (columnIndex === 3) {
        //         let arr = row.discount.split('%')
        //         return (parseFloat(arr[0]) > 28) ? 'success-cell' : 'warning-cell'
        //     }
        // }
    },
    created() {
        this.axios.get('/api/v1/index').then((res) => {
            this.tableData = res.data
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
.demo-table-expand 
{
    font-size: 0;
}

.demo-table-expand label 
{
    width: 100px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item 
{
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.el-table .warning-row, 
.el-table .warning-cell
{
    background: oldlace;
}

.el-table .success-row, 
.el-table .success-cell 
{
    background: #f0f9eb;
}

.el-popover *
{
    display: flow-root;
}

.el-popover span 
{
    color: #99a9bf;
    float: left;
}

.el-popover font 
{
    text-align: right;
    float: right;
}
</style>
