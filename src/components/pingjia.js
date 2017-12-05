// 请求
var req ={
  "companyId": 0,  // 企业ID
  "repairQuality": 1,   //维修质量 20%
  "repairSpeed": 2,  // 维修速度 5%
  "repairPrice": 3,   // 维修价格 5%
  "repairPrice": 4,   // 服务质量 10%
  "promise": 5,   // 履约情况 60%
  "appraise": ''  // 综合评价(文字)
}

// (1 * 0.2 + 2 * 0.05 + 3 * 0.05 + 4 * 0.1 + 5 * 0.6) / 5

// 返回
var res = {
  status: ''   // 返回评论状态是否成功
}
