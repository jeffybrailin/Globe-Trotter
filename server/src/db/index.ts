
import * as sqlite3 from 'sqlite3';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../../dev.db');

export const getDb = () => {
    return new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error('Could not connect to database', err);
        }
    });
};

export const run = (sql: string, params: any[] = []): Promise<void> => {
    const db = getDb();
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            db.close();
            if (err) reject(err);
            else resolve();
        });
    });
};

export const get = (sql: string, params: any[] = []): Promise<any> => {
    const db = getDb();
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            db.close();
            if (err) reject(err);
            else resolve(row);
        });
    });
};

export const all = (sql: string, params: any[] = []): Promise<any[]> => {
    const db = getDb();
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            db.close();
            if (err) reject(err);
            else resolve(rows);
        });
    });
};
