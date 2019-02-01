import { getMenuList } from './sysadmin'

const routerName = (function() {
  getMenuList().then(res => {
    let menuList = []
    const menuList = res.menuList
  })
  return menuList
})()

export default routerName
