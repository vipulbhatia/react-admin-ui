module.exports = {
    PORT: 8000,
    SECRET: 'THIS IS THE SECRET',
    DB: 'home_automation',
    DB_HOST: 'localhost',
    DB_PORT: 3306,
    DB_USER: 'root',
    DB_PASSWORD: 'ubuntu'
}

module.exports.CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        status ENUM('active', 'inactive', 'new', 'disabled') DEFAULT 'disabled',
        privilege ENUM('admin', 'user') DEFAULT 'user'
    )
`;
