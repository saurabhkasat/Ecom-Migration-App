import _ from 'lodash';

export default class Request {

    constructor(info) {
        this._path = info.path;
        this._method = info.method;
        this.requestParameters = [];
    }

    path = () => {
        if (!this._path) {
            throw new Error('Request Path is not defined');
        }
        return this._path;
    }

    setPayLoad = payload => {
        this.payload = payload;
    }

    addRequestParameter = (name, value) => {
        this.requestParameters.push({ name: name, value: encodeURIComponent(value) });
    }
    method = () => {
        if (!this._method) {
            throw new Error('Request Method is not defined');
        }
        return this._method;
    }
    
    setHeaders(headers) {
        this.headers = headers;
    }
}