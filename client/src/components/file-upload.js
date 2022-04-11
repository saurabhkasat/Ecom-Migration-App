
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Papa from "papaparse";
import _ from 'underscore';
import OrdersApi from '../apis/modules/orders'
import { getOrders } from '../actions/order';

const validateObject = (obj, keys) => {
    const emptyKeys = keys.find(key => (obj[key] === ''))
    return emptyKeys && emptyKeys.length >= 0 ? false : true;
}

const Fileupload = (props) => {

    const [orderCount, setOderCount] = useState({ valid: 0, invalid: 0 });
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const changeHandler = (event) => {
        setIsLoading(true);
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const keys = _.filter(Object.keys(results.data[0]), item => item !== "")
                const validData = _.filter(results.data, item => validateObject(item, keys))
                setOderCount({ valid: validData.length, invalid: results.data.length - validData.length })
                //Uploading data in chunks to handle large JSON error, 
                const chunckSize = 500000;
                let iteration = 0;
                while ((chunckSize * iteration) < validData.length) {
                    const start = chunckSize * iteration;
                    const end = start + chunckSize;
                    const items = validData.slice(start, end);
                    const result = await OrdersApi.saveOrders(items)

                    if (!result.ok) {
                        //We can craete a genetric component to show all errors/messages.
                        alert(`failed iteration : ${iteration}`)
                        //Add retry logic or show error message here
                    }

                    iteration++;
                }
                dispatch(getOrders());
                setOderCount({ valid: 0, invalid: 0 })
                event.target.value = null;
                setIsLoading(false);
            },
            error: function (err, file, inputElem, reason) {
                //We can craete a genetric component to show all errors/messages.
                alert(`Parsing csv file failed : ${err}`)
            },
        });
    };

    return (
        <div className='file-upload-block'>

            {/* File Uploader */}
            <input
                type="file"
                name="file"
                id="file"
                onChange={changeHandler}
                accept=".csv"
                style={{ display: "block", margin: "5px auto" }}
                disabled={isLoading}
            />
            <label htmlFor="file" className="btn-3">Upload File
                {isLoading && <div className='file-upload-loader'>
                    <span className='loader-icon'>
                    </span>
                </div>
                }
            </label>
            {(orderCount.valid + orderCount.invalid) > 0 &&
                <div className="alert alert-info">{`Uploading ${orderCount.valid} / ${orderCount.valid + orderCount.invalid}, invaid record - # ${orderCount.invalid} `}</div>}
        </div>
    )
}
export default Fileupload;

