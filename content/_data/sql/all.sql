CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  city TEXT,
  joined_date TEXT
);
INSERT INTO customers VALUES
 (1, 'An Nguyen',   'an@example.com',    'Hanoi',       '2024-01-15'),
 (2, 'Binh Tran',   'binh@example.com',  'Ho Chi Minh', '2024-02-20'),
 (3, 'Chi Le',      'chi@example.com',   'Da Nang',     '2024-03-05'),
 (4, 'Dung Pham',   'dung@example.com',  'Hanoi',       '2024-03-18'),
 (5, 'Em Hoang',    NULL,                'Hue',         '2024-04-02'),
 (6, 'Phuong Vu',   'phuong@example.com','Ho Chi Minh', '2024-05-11'),
 (7, 'Giang Do',    'giang@example.com', 'Hanoi',       '2024-06-23'),
 (8, 'Hoa Bui',     'hoa@example.com',   'Can Tho',     '2024-07-07');

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL
);
INSERT INTO products VALUES
 (1,  'Laptop',     'Electronics', 15000000, 12),
 (2,  'Phone',      'Electronics',  8000000, 30),
 (3,  'Headphones', 'Electronics',  1200000, 50),
 (4,  'Desk',       'Furniture',    2500000,  8),
 (5,  'Chair',      'Furniture',    1800000, 15),
 (6,  'Notebook',   'Stationery',     25000, 200),
 (7,  'Pen',        'Stationery',      8000, 500),
 (8,  'Backpack',   'Accessories',   650000, 40),
 (9,  'Monitor',    'Electronics',  4500000,  0),
 (10, 'Lamp',       'Furniture',     350000, 25);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  order_date TEXT NOT NULL,
  status TEXT NOT NULL
);
INSERT INTO orders VALUES
 (1,  1, '2024-08-01', 'completed'),
 (2,  1, '2024-08-15', 'completed'),
 (3,  2, '2024-08-03', 'completed'),
 (4,  3, '2024-08-10', 'pending'),
 (5,  4, '2024-08-12', 'completed'),
 (6,  2, '2024-09-01', 'cancelled'),
 (7,  6, '2024-09-03', 'completed'),
 (8,  1, '2024-09-10', 'completed'),
 (9,  7, '2024-09-12', 'pending'),
 (10, 3, '2024-09-20', 'completed'),
 (11, 4, '2024-10-01', 'completed'),
 (12, 6, '2024-10-05', 'completed'),
 (13, 2, '2024-10-11', 'completed'),
 (14, 7, '2024-10-15', 'completed');

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL
);
INSERT INTO order_items (order_id, product_id, quantity) VALUES
 (1, 1, 1), (1, 3, 1),
 (2, 6, 10), (2, 7, 20),
 (3, 2, 1),
 (4, 4, 1), (4, 5, 2),
 (5, 8, 1), (5, 6, 5),
 (6, 3, 2),
 (7, 1, 1),
 (8, 5, 1), (8, 10, 2),
 (9, 2, 1), (9, 3, 1),
 (10, 6, 3), (10, 7, 10),
 (11, 9, 1),
 (12, 8, 2), (12, 10, 1),
 (13, 1, 1), (13, 2, 1),
 (14, 4, 1);
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO departments VALUES (1, 'Engineering'), (2, 'Sales'), (3, 'HR'), (4, 'Marketing');

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  salary INTEGER NOT NULL,
  manager_id INTEGER REFERENCES employees(id),
  hire_date TEXT NOT NULL
);
INSERT INTO employees VALUES
 (1,  'Lan',    1, 4000, NULL, '2020-01-10'),
 (2,  'Minh',   1, 3200, 1,    '2021-03-15'),
 (3,  'Nam',    1, 3000, 2,    '2022-06-01'),
 (4,  'Oanh',   1, 2800, 2,    '2023-02-20'),
 (5,  'Phong',  2, 2500, 1,    '2021-09-09'),
 (6,  'Quynh',  2, 2300, 5,    '2022-11-11'),
 (7,  'Son',    2, 2300, 5,    '2023-05-05'),
 (8,  'Thao',   3, 2100, 1,    '2022-01-17'),
 (9,  'Uyen',   3, 2000, 8,    '2023-08-30'),
 (10, 'Viet',   NULL, 1800, 1, '2024-01-02');
