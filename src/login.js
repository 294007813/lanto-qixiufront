import router from './router'
import store from './store/store'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("ACCESSTOKEN")) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      if(store.getters.isDisabled){
        //如果是企业用户，还未填写资料的
        next({
          path: '/completeInfo',
        })
      }else{
        next()
      }

    }
  } else {
    next() // 确保一定要调用 next()
  }
})
