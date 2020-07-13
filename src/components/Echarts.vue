<template>
    <div>
        <el-divider><i class="el-icon-data-line"></i></el-divider>
        <!-- <div id="myChart" :style="{width: '100%', height: '20vw'}"></div> -->
        <div id="myChart" :style="{width: '100%'}"></div>
    </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入线性图组件
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
    data() {
        return {
            
        }
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'), 'light')
            // 绘制图表
            myChart.setOption({
                title: { 
                    show: false,
                    text: '消费趋势',
                    textStyle: { fontSize: 12 }
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    // data: ['Leo', 'Yon', 'Ethan']
                    data: []
                },
                xAxis: {
                    // data: ['2020-07-01','2020-07-02','2020-07-03','2020-07-04','2020-07-05','2020-07-06']
                    data: []
                },
                yAxis: {},
                // series: [
                //     {
                //         name: 'Leo',
                //         type: 'line',
                //         stack: '总量',
                //         data: [220, 182, 191, 234, 290, 330, 310]
                //     },
                //     {
                //         name: 'Yon',
                //         type: 'line',
                //         stack: '总量',
                //         data: [150, 232, 201, 154, 190, 330, 410]
                //     },
                //     {
                //         name: 'Ethan',
                //         type: 'line',
                //         stack: '总量',
                //         data: [120, 132, 101, 134, 90, 230, 210]
                //     }
                // ]
                series: []
            })
            // myChart.showLoading()
            this.axios.get('/api/v1/echarts').then((res) => {
                // myChart.hideLoading()
                myChart.setOption({
                    legend: { data : res.data.users },
                    xAxis: { data : res.data.dates },
                    series: res.data.series
                })
                }).catch((error) => {
                    this.$message({
                        showClose: true,
                        message: error,
                        type: 'error'
                    })
            })
        }
    },
    mounted() {
        this.drawLine()
    }
}
</script>

<style scoped>
@media only screen and (min-width: 300px) {
	#myChart {
		/* width: 300px; */
        height: 50vw;
	}
}

@media only screen and (min-width: 700px) {
	#myChart {
		/* width: 700px; */
        height: 40vw;
	}
}

@media only screen and (min-width: 1200px) {
	#myChart {
		/* width: 1200px; */
        height: 20vw;
	}
}
</style>
