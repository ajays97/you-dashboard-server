-- Create products table
CREATE TABLE products (
    uid varchar,
    id float, 
    date date,
    product_title varchar, 
    currency varchar,
    price float,
    total_booking_count int,
    destination varchar,
    lat_long point,
    segments text[],
    ota varchar
);


-- Insert a new entry into products
INSERT INTO products (uid, id, date, product_title, currency, price, total_booking_count, destination, lat_long, segments, ota)
values ('594', 75, '2020-10-26', 'Title', 'HKD', 126.2, 12322, 'Honk Kong', '22.3,113.918', array['a', 'b'], 'klook');

-- Delete table products;
drop table products;