import { conn } from "./bot_var.js";



let select_todo = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from my_todo where id = ?', [id], (err, res, fields) => {
            if (err) {
                console.log('error:', err);
                return reject(err);
            }
            resolve(res);
        })
    });
};




let select_all_todo = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM my_todo', (err, res, fields) => {
            if (err) {
                console.log('error:', err);
                return reject(err);
            }
            resolve(res);
        });
    });
};


let insert_todo = (title, description) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO my_todo (title, description) VALUES (?, ?)', [title, description], (err, res, fields) => {
            if (err) {
                console.log('error:', err);
                return reject(err);
            }
            resolve(res);
        });
    });
};


let delete_todo = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM my_todo WHERE id = ?', [id], (err, res, fields) => {
            if (err) {
                console.log('error:', err);
                return reject(err);
            }
            resolve(res);
        });
    });
};


export { select_todo, select_all_todo, insert_todo, delete_todo }