import api from '../api'

//TODO: Convert store to typescript

export const state = () => ({
    layout : 'default',
    menus : [],
    page : { },
    blog : { },
    contents : [],
    editorial : 'mundo',
})

export const mutations = {
    SET_LAYOUT(state, data) {
        state.layout = data
    },
    SET_MENUS(state, data) {
        state.menus = data
    },
    SET_PAGE(state, data) {
        state.page = data
    },
    SET_HEADER_COLOR(state, data) {
        state.editorial = data
    },
    SET_BLOG(state, data) {
        state.blog = data
    },
    ADD_CONTENT(state, data) {
        state.contents = [ ...state.contents, data ]
    },
    CLEAR_CONTENT(state) {
        state.contents = [ ]
    },
}

export const actions = {
    async nuxtServerInit( { commit }, { route } ) {
        await api.get('blog.json').then (async blog => {
            await commit('SET_BLOG', blog) 
        })

        const menus = await api.get('menus.json')
        await commit('SET_MENUS', menus)
    },
  }