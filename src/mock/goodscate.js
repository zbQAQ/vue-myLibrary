const Mock = require("mockjs")

const Random = Mock.Random

const res = () => {
    let mockData = [] 
    const catePool = ['衣服','鞋子','玩具','家具','零食','手表','眼镜'] // 7个商品分类

    for(let i = 0; i < catePool.length; i++) {
        let data = {
            gcate_id: i + 1,
            gcate_name: catePool[i],
            gcate_title: Random.cparagraph(12, 18)
        }
        mockData.push(data)
    }

    return {
        data: mockData,
        msg: "success",
        status: 1
    }

}
Mock.mock('/mock/goodscate', 'get', res)
