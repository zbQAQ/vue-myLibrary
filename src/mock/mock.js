
// 在这里可以做一些通用的配置
const Mock = require("mockjs")

// 将所有的mock文件引入
require('./newslist')
require('./goodslist')
require('./goodscate')

// 设置所有请求的超时时间，模拟网络传输耗时
Mock.setup({
    timeout: 0-300
})
