class API {
    constructor( baseUrl, headers = { }, body = {}, contentType = 'application/x-www-form-urlencoded' ) {
        this.headers = headers
        this.contentType = contentType
        this.baseUrl = new URL(baseUrl)
        this.body = body
    }

    request (url, method, params) {
        if(typeof window !== 'undefined' &&  window.localStorage.getItem('token') ) {
            this.headers = { ...this.headers, "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
        }

        const data = { ...this.body,  ...params}
        
        var formBody = this.getFormBody(data)

        let proxyUrl =  process.browser ? 'https://afternoon-beyond-74473.herokuapp.com/' : ''
        let options = method == 'POST' ? { method, headers: this.headers, body : formBody } : { method, headers: this.headers }

        return new Promise( (resolve, reject) => {
            fetch(proxyUrl + this.baseUrl+url, options)
                .then( response => { 
                    return resolve( response.json().then( data => data ) )
                })
                .catch( response => reject( response ) )
        }) 
    }

    get (url, params = {} ) {
        return this.request(url, 'GET', params)
    }

    post ( url, params ) {
        return this.request(url, 'POST', params)    
    }

    getFormBody ( data ) {
        if( this.contentType == 'application/x-www-form-urlencoded' ) {
            let formBody = []

            for (var property in data) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(data[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }

            return formBody.join("&");
        } else {
            let form = new FormData();

            for( let key of Object.keys(data) ) {
                form.append(key, data[key])
            }

            return form
        }
    }
}

export const rest  = new API(`http://localhost:8000/`, { "Content-Type" : 'application/x-www-form-urlencoded', "Accept" : 'application/json' })
export const api  = new API(`http://localhost:8000/wp-content/data/`)

export default api