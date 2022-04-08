import _ from 'underscore';

//Can move this to config
const api = 'http://localhost:4000'

export default class BaseApi {
    /**
     * 
     * @param {Request} request 
     */
    async _execute(request) {
        const url = this._url(request);

        const options = {
            method: request.method(),
            headers: {
                'Content-Type': 'application/json'
              }
        }
        if (!_.isEmpty(request.payload)) {
            options.body = JSON.stringify(request.payload)
        }

        try {
            const result = await fetch(url, options);
            if (result.ok) {
                const parsedResult = await result.json();
                return {
                    data: parsedResult,
                    ok: true
                }
            }
            else{
                return {
                    error: result.statusText,
                    ok: false
                }
                
            }
        }
        catch (error) {
            console.error(error);
            return {
                ok: false,
                excption: 'xhr',
                description: error
            }
        }
    }
    /**
    * 
    * @param {Request} request 
    */
    _url(request) {
        let url = `${api}/${request.path()}`;
        const parameters = _.map(request.requestParameters, param => (`${param.name}=${param.value}`)).join('&');
        if (parameters) {
            url = `${url}?${parameters}`;
        }
        return url;
    }

}