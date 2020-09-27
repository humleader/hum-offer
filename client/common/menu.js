const menus = [
  {
    name: 'Admin',
    icon: 'appstore-o',
    children: [
      {
        name: '首页',
        path: '/home',
        icon: 'home'
      },
      {
        name: '候选人',
        path: '/candidate',
        icon: 'contacts'
      },
      {
        name: '项目管理',
        path: '/project',
        icon: 'project'
      },
      {
        name: '客户管理',
        path: '/company',
        icon: 'global'
      }
    ]
  }
]

// 格式化菜单 设置 id 和 parent
function formatter(data = [], parent) {
  data.forEach((data, index) => {
    data.parent = parent
    // 设置默认 id
    if (!data.id) {
      data.id = parent ? `${parent.id}_${index}` : index.toString()
    } else {
      data.id = data.id.toString()
    }
    if (data.path) {
      // XXX: 获取 pathname 处理路径中存在 ?、# 的情况
      let pathname = data.path.split('?')[0]
      pathname = pathname.split('#')[0]
      data.pathname = pathname
    }
    formatter(data.children, data)
  })

  return data
}

export default formatter(menus)
