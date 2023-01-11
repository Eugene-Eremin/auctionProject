import { createApp } from 'vue'
import App from './App'
import router from "@/router/router"
import components from '@/components/UI'
import store from '@/store/index'
import VIntersection from '@/directives/VIntersection'

const app = createApp(App);

Object.values(components).forEach(component => {
    app.component(component.name, component)
})

app.directive('intersection', VIntersection)

app
    .use(router)
    .use(store)
    .mount('#app')