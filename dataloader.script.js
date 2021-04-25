"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.exportToDatabase = void 0;
var csv = require("csv-parser");
var fs = require("fs");
var pg = require("pg");
var Pool = pg.Pool;
var pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'youdb',
    port: 5432
});
pool.connect().then(function () {
    console.log('Connected to DB...!!!');
    exports.exportToDatabase();
    //   pool.query(`select * from products;`, [], (err, results) => {
    //     if (err) {
    //       throw err;
    //     } else {
    //       console.log(results.rows);
    //     }
    //   });
});
exports.exportToDatabase = function () {
    fs.createReadStream('/home/millennial97/Documents/klook_october_month_data.csv'
    // '/home/millennial97/Documents/sample.csv'
    )
        .pipe(csv())
        .on('data', function (row) {
        pool.query("INSERT INTO products (uid, id, date, product_title, currency, price, total_booking_count, destination, location, segments, ota) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [
            row.uid,
            parseFloat(row.id),
            row.date,
            row['product_title'],
            row.currency,
            parseFloat(row.price),
            parseInt(row['total_booking_count']),
            row.destination,
            row['lat_long'],
            __spreadArrays(JSON.parse(row.segments)),
            row.ota
        ], function (err, results) {
            if (err) {
                console.log('Error inserting:', row.uid, err);
            }
            else {
                console.log('Added product UID:', row.uid, results.rowCount);
            }
        });
        //   console.log(row);
    })
        .on('end', function () {
        console.log('File processing completed succcessfully.');
    });
};
