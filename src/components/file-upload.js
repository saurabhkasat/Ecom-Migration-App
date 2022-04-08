
import React, { useState } from 'react';
import Papa from "papaparse";
import _ from 'underscore';
import OrdersApi from '../apis/modules/orders'


const validateObject = (obj, keys) => {
    const emptyKeys = keys.find(key => (obj[key] === ''))
    return emptyKeys && emptyKeys.length >= 0 ? false : true;
}

const Fileupload = (props) => {

    const [orderCount, setOderCount] = useState({valid : 0, invalid : 0});

    const changeHandler = (event) => {
        props.setLoading(true);

        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                const keys = _.filter(Object.keys(results.data[0]), item => item !== "")
                const validData = _.filter(results.data, item => validateObject(item, keys))
                setOderCount({valid :  validData.length, invalid : results.data.length - validData.length})
                //Added chunk size upload to handle large JSON error.
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

                props.setLoading(false);
                setOderCount({valid : 0, invalid : 0})
                event.target.value = null;
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
                style={{ display: "block", margin: "10px auto" }}
            />
            <label htmlFor="file" className="btn-2">Upload</label>
            {(orderCount.valid  + orderCount.invalid) > 0 && <div>{`Valid orders #${orderCount.valid} being uploaded & invalid orders #${orderCount.invalid} `}</div>}
        </div>
    )
}
export default Fileupload;

