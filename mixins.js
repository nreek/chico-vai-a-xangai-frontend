import api from "~/api"

export const pages = {
    methods : {
        async fetchJSON({ store, params, error }, url = false) {
            if(!url) {
                url = params.pathMatch

                if (url.endsWith("/")) {
                    url = url.substring(0, url.length - 1)
                }
            }

            try {
                const data = await api.get(`${url.charCodeAt(0)}/${url.charCodeAt(1)}/${url}.json`)
                await store.commit("SET_PAGE", data)

                return { page: store.state.page }
            } catch (e) {
                await store.commit("SET_PAGE", {  type : 'error' })
                error({ statusCode: 404, message: 'Post not found' })
                return { page : false }
            }
        }
    }
}

export const pagination = {
    data () {
        return {
            paged : 1,
            loading : false,
            hasMorePosts : true,
        }
    },
    methods : {
        nextPage () {
            this.paged += 1
            this.loading = true

            this.fetchPosts( { paged : this.paged } ).then ( response  => {
                this.loading = false
                this.hasMorePosts = Boolean(response.length)
                this.posts = [ ...this.posts, ...response ]
            })
        }
    }
}

export const head = {
    methods : {
        head(state) {
            const { page, blog } = state
            let meta_tags = [], meta_section = [];

            // if(page.tags) {
            //     meta_tags = page.tags.map ( t => {
            //         return {
            //             property : "article:tag",
            //             content : t.title,
            //         }
            //     } )
            // }

            // if(page.categories) {
            //     meta_section = page.categories.filter ( c => {
            //         return ['Saúde', 'Fitness', 'Nutrição'].indexOf(c.title) > -1 
            //         ?   {
            //                 property : "article:section",
            //                 content : c.title
            //             } 
            //         : false
            //     } )
            // }

            return {
                title: `${page.title} - ${blog.title}`,
                link : [
                    {
                        rel : 'canonical',
                        href : process.env.hostURL + page.permalink,
                    },
                    {
                        rel : "alternate", 
                        type : "application/rss+xml", 
                        title : `${blog.title} - ${page.title} - Feed`, 
                        href : `${blog.backend_url}${page.permalink}/feed/`,
                    }
                ],
                meta: [
                    { hid: "description", name: "description", content: page.excerpt },
                    { hid : 'robots', name : 'robots', content : 'max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
                    { property : "og:locale", content : "pt_BR" }, 
                    { property : "og:type", content : "article" }, 
                    ...state.page.yoast,
                    ...meta_tags,
                    ...meta_section,
                ]
            }
        }
    }
}

export const postInfos = {
    methods : {
        getDate(time) {
            return ;//moment.unix(time).format('DD/MM/YYYY')
        },
        getAuthor(post) {
            return post.colunista ? `<a href="${post.colunista.permalink}">${post.colunista.title}</a>` : (post.author || 'Redação')
        }
    },
    mounted () {
        //moment.locale('pt-br');
    },
}