CREATE DATABASE IF NOT EXISTS company;

USE company;

CREATE table employees(
id INT(11) NOT NULL auto_increment,
name varchar(45) DEFAULT NULL,
salary INT(11) DEFAULT NULL,
primary key(id)
);

-- describe employees;

insert into employees values
(1, 'Caro Gonzlaez', 5000),
(2, 'Mario Sanchez', 6000),
(3, 'Omar Lopez', 7000);

select * from employees;


CREATE PROCEDURE employeeAddOrEdit(
IN _id INT,
IN _name VARCHAR(45),
IN _salary INT
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO employees (name, salary)
        VALUES (_name, _salary);
        
        SET _id = LAST_INSERT_ID();
	ELSE 
		UPDATE employees
        SET 
			name = _name,
			salary = _salary
			WHERE id = _id;
	END IF;
	SELECT _id AS id;
END

