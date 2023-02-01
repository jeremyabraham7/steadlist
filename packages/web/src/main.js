import { createApp, provide, h } from 'vue'
import { apolloClient, DefaultClient } from './plugins/apollo'
import { createPinia } from 'pinia'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

import './assets/index.css'
const app = createApp({
    setup () {
        provide(DefaultClient, apolloClient)
    },
  
    render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
