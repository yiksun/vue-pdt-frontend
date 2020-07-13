<template>
    <div>
        <div>
            <el-table
                :data="tableData"
                show-summary
                size="mini"
                style="width: 100%"
                >
                <el-table-column
                    prop="staff_id"
                    label="编号">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="大名">
                </el-table-column>
                <el-table-column
                    prop="total_consume"
                    sortable
                    label="消费">
                </el-table-column>
                <el-table-column
                    prop="total_expense"
                    sortable
                    label="支出">
                </el-table-column>
                <el-table-column
                    prop="balance"
                    sortable
                    label="差额">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <app-echarts></app-echarts>
        </div>
    </div>
</template>

<script>
import Echarts from './Echarts'
export default {
    components: {
        appEcharts: Echarts
    },
    data() {
        return {
            tableData: []
        }
    },
    methods: {
    },
    created() {
        this.axios.get('/api/v1/summary').then((res) => {
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

<style scoped>
.el-table 
{
    margin: 5px auto;
}
</style>
