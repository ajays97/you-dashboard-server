import * as csv from 'csv-parser';
import * as fs from 'fs';

import * as pg from 'pg';

const Pool = pg.Pool;
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'youdb',
  port: 5432
});

pool.connect().then(() => {
  console.log('Connected to DB...!!!');
  exportToDatabase();
  //   pool.query(`select * from products;`, [], (err, results) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       console.log(results.rows);
  //     }
  //   });
});

export const exportToDatabase = () => {
  fs.createReadStream(
    '/home/millennial97/Documents/klook_october_month_data.csv'
    // '/home/millennial97/Documents/sample.csv'
  )
    .pipe(csv())
    .on('data', row => {
      pool.query(
        `INSERT INTO products (uid, id, date, product_title, currency, price, total_booking_count, destination, location, segments, ota) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          row.uid,
          parseFloat(row.id),
          row.date,
          row['product_title'],
          row.currency,
          parseFloat(row.price),
          parseInt(row['total_booking_count']),
          row.destination,
          row['lat_long'],
          [...JSON.parse(row.segments)],
          row.ota
        ],
        (err, results) => {
          if (err) {
            console.log('Error inserting:', row.uid, err);
          } else {
            console.log('Added product UID:', row.uid, results.rowCount);
          }
        }
      );
      //   console.log(row);
    })
    .on('end', () => {
      console.log('File processing completed succcessfully.');
    });
};
