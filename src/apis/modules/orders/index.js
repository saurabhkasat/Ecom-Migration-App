import Request from '../../request';
import BaseApi from '../../base-api';

class OrdersApi extends BaseApi {
    getOrders = async (pn, ps) => {
        const request = new Request({
            path: 'orders',
            method: 'GET'
        })
        request.addRequestParameter('pn', pn);
        request.addRequestParameter('ps', ps);
        return await this._execute(request);
    }

    saveOrders = async (data) => {
        const request = new Request({
            path: 'orders',
            method: 'POST'
        })
        request.setPayLoad(data);

        return await this._execute(request);
    }
}

const api = new OrdersApi();
export default api;