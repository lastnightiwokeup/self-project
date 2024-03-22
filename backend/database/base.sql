-- create budget item table 
CREATE TABLE BudgetItem (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(255) CHARACTER SET UTF8MB4 NOT NULL,
    amount INTEGER NOT NULL,
    date VARCHAR(255) NOT NULL,
    category VARCHAR(255) CHARACTER SET UTF8MB4 NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL,
);