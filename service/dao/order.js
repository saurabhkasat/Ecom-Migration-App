const { Pool } = require("pg");
const credentials = require("../config/server-config")

module.exports = class Order {
    getOrders = async (pn, ps) => {
        const pool = new Pool(credentials);
        try {
            let query = `SELECT * from dbo.get_orders(${pn},${ps})`;
            const result = await pool.query(query);
            query = `SELECT count(*) from dbo.orders`;
            const resultCount = await pool.query(query);
            await pool.end();
            return { rows: result.rows, totalRows: resultCount.rows[0].count };
        }
        catch (error) {
            await pool.end();
            throw error;
        }
    }

    saveOrders = async (rows) => {
        rows = JSON.stringify(rows).replaceAll("'", "''");

        const pool = new Pool(credentials);
        let result;
        try {
            const query = `select * From dbo.save_orders('${rows}')`;
            result = await pool.query(query);
            await pool.end();
            return true;
        }
        catch (error) {
            await pool.end();
            throw error;
        }
    }
}

