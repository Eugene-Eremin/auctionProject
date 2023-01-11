import {createStore} from "vuex";
import Auth from "@/helpers/Auth"
export default createStore({
    state: () => ({
        inOut: 'Войти',
        login: '',
        applicationId: null,
    }),
    getters: {
    },
    mutations: {
        login(state, payload) {
            state.login = payload.login
            state.inOut = 'Выйти'
            Auth.login(payload.res, payload.login)
        },
        logOut(state) {
            state.inOut = 'Войти'
            Auth.logOut()
        },
        initializeStore(state) {
            state.login = Auth.initializeStore().replace(/[""]+/g, '')
            if (state.login) {
                state.inOut = 'Выйти'
            } else {
                state.inOut = 'Войти'
            }
        },
        setApplicationId(state, applicationId) {
            state.applicationId = applicationId
        }
    },
    actions: {

    },
    modules: {

    }
})

