const Mock = require("mockjs")

const Random = Mock.Random

const res = () => {
    let mockData = [] 
    let len = 10 //10条新闻
    for(let i = 0; i < len; i++) {
        let data = {
            art_content: Random.csentence(150, 400),
            art_description: Random.csentence(60, 120),
            art_editor: Random.cname(),
            art_id: i + 1,
            art_thumb: Random.dataImage('410x380', 'news Image'),
            // art_time: Random.datetime('T'),
            art_time: Random.date('yyyy-MM-dd'),
            art_title: Random.ctitle(15, 25),
            art_view: Random.integer(0, 1000),
        }
        mockData.push(data)
    }

    //根据id进行排序  
    mockData.sort((a, b) => a.art_id - b.art_id)

    return {
        data: mockData,
        msg: "success",
        status: 1
    }

}
Mock.mock('/mock/newslist', 'get', res)
