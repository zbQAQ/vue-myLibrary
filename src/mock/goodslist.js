const Mock = require("mockjs")

const Random = Mock.Random

const res = () => {
    let mockData = [] 
    let len = 15 //15个商品

    const catePool = ['衣服','鞋子','玩具','家具','零食','手表','眼镜']


    for(let i = 0; i < len; i++) {
        let str = Random.csentence(18, 29)
        str = str.replace(str.substr(-1, 1), "")
        let data = {
            goods_cate_id: i + 1,
            goods_cate_name: catePool[ Math.floor( Math.random()*7 ) ],
            goods_content: [Random.image('800x200'), Random.image('800x300')],
            goods_description: Random.csentence(12, 18),
            goods_id: i + 1,
            goods_name: str,
            goods_price: Random.float(60, 500, 2, 2),
            goods_stock: Random.integer(10, 50),
            goods_thumb: Random.dataImage('800x800', 'goods Image'),
            goods_time: Random.date('yyyy-MM-dd'),
            goods_title: Random.csentence(12, 18),
            goods_view: Random.integer(0, 200),
        }
        mockData.push(data)
    }

    //根据id进行排序  
    mockData.sort((a, b) => a.goods_id - b.goods_id)

    return {
        data: mockData,
        msg: "success",
        status: 1
    }

}
Mock.mock('/mock/goodslist', 'get', res)
