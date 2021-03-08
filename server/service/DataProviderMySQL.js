'use strict';
module.exports.DataProviderMySQL = function () {

    this.getMySqlUserALL = async function (connection, res) {

        try {
            const [rows, fields] = await connection.execute("SELECT * FROM `users`");
            res.json(rows);
        } catch (e) {
            console.log('caught exception!', e.message);
            res.json({ result: "error", msg: `"Mysql error:" ${e.message}` });
        }

    }

    this.getMySqlUserFile = async function (connection, res, req) {
     
        try {
            let sql_user = 'SELECT * FROM `user_files` WHERE `user_id` = ?';
            let value_user = [req.params.user_id];
            const [rows_user, fields] = await connection.execute(sql_user, value_user);
            return rows_user;
        } catch (e) {
            console.log('caught exception!', e.message);
            res.json({ result: "error", msg: `"Mysql error:" ${e.message}` });
        }

    }

    this.getMySqlUserSearch = async function (connection, res, req) {
        try {
            let sql;
            let value;
            if (typeof req.body.firstName === 'string'
                && typeof req.body.email === 'string'
                && typeof req.body.birth_date === 'string'
                && typeof req.body.status === 'string'
                && Object.keys(req.body).length === 4) {

                sql = 'SELECT * FROM `users` WHERE `first_name` = ? AND `email` = ? AND `birth_date` = ? AND `status` = ? LIMIT 1';
                value = [req.body.firstName, req.body.email, req.body.birthDate, req.body.status];

            } else if (typeof req.body.firstName === 'string'
                || typeof req.body.email === 'string'
                || typeof req.body.birth_date === 'string'
                || typeof req.body.status === 'string'
                && Object.keys(req.body).length === 4) {

                sql = 'SELECT * FROM `users` WHERE `first_name` = ? OR `email` = ? OR `birth_date` = ? OR `status` = ?';
                value = [req.body.firstName, req.body.email, req.body.birthDate, req.body.status];

            } else {
                //отстутствуют данные для запроса
                return res.json({ result: "error", msg: "there is no data for request" });
            }

            const [rows, fields] = await connection.execute(sql, value);

            if (rows.length === 0) {
                //в базе данных отсутсвуют данные по такому запросу
                return res.json({ result: "error", msg: "there is no data in the database for such a request" });

            } else if (rows.length > 1) {
                //по такому запросу существует несколько пользователей
                return res.json({ result: "error", msg: "there are several users for this request" });

            } else if (rows.length === 1) {

                let sql_user = 'SELECT * FROM `user_files` WHERE `user_id` = ?';
                let value_user = [rows[0].id];
                const [rows_user, fields] = await connection.execute(sql_user, value_user);

                if (rows.length === 0) {
                    //у этого пользователя нет сохраненных файлов
                    return res.json({ result: "error", msg: "this user has no saved files" });
                }

                return res.json({ result: "user_files", msg: JSON.stringify(rows_user) });
            }

            res.json({ result: "error", msg: "Что-то пошло не так" });

        } catch (e) {
            console.log('caught exception!', e.message);
            res.json({ result: "error", msg: `"Mysql error:" ${e.message}` });
        }
    }

    this.setMySqlUserCreate = async function (connection, res, req) {
        try {
            const [rows, fields] = await connection.execute('INSERT INTO `users` (first_name, last_name, email, ip_adress, birth_date, status) VALUES(?,?,?,?,?,?)',
                [req.body.firstName, req.body.lastName, req.body.email, inet_aton("127.0.0.1"), req.body.birthDate, req.body.status],
                (error, results) => {
                    if (error) return res.json({ error: error });
                });
            res.send(JSON.stringify(rows));
        } catch (e) {
            console.log('caught exception!', e.message);
            res.json({ result: "error", msg: `"Mysql error:" ${e.message}` });
        }
    }


    this.setMySqlUserFilesCreate = async function (connection, res, req) {
        const rowsAr = [];
        try {
            for (const file of req.files) {
                const sql = 'INSERT INTO `user_files` SET file_name=?, original_name=?, mime=?, size=?, destination=?, user_id=?';
                const value = [file.filename, file.originalname, file.mimetype, file.size, file.destination, req.body.userId];
                const [rows, fields] = await connection.execute(sql, value,
                    (error, results) => {
                        if (error) return res.json({ error: error });
                    });
                rowsAr.push(rows);
            }
            res.send(JSON.stringify(rowsAr));
        } catch (e) {
            console.log('caught exception!', e.message);
            res.json({ result: "error", msg: `"Mysql error:" ${e.message}` });
        }

    }

    function inet_aton(a) {
        let d = a.split('.');
        return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
    }

};