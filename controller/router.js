/**
 * 动态路由
 */

module.exports = {
    //统计每个加油站的加油次数和钱数，同时返回加油站经纬度
    getRouter(req, res){
        res.json({
            code: 200,
            data: [{
                "path": "/tabNave",
                "name": "tabNave",
                "component": "/tab/index",
                "children": [
                    {
                        "path": "vue0",
                        "component": "/nav/0",
                        "name": "vue0",
                        "meta":[1,2,3]
                    },
                    {
                        "path": "vue1",
                        "component": "/nav/1",
                        "name": "vue1",
                        "children": [
                            {
                                "path": "vue11",
                                "component": "/nav/11",
                                "name": "vue11"
                            },
                            {
                                "path": "vue12",
                                "component": "/nav/12",
                                "name": "vue12"
                            }
                        ]
                    },
                    {
                        "path": "vue2",
                        "component": "/nav/2",
                        "name": "vue2",
                        "children": [
                            {
                                "path": "vue21",
                                "component": "/nav/21",
                                "name": "vue21"
                            },
                            {
                                "path": "vue22",
                                "component": "/nav/22",
                                "name": "vue22"
                            }
                        ]
                    }
                ]
            }],
        })
    }
}