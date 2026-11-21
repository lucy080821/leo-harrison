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
