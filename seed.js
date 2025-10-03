const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 4248000, image: 'images/laptop.jpg', description: 'A high-performance laptop for all your needs.' },
    { id: 2, name: 'T-shirt', category: 'fashion', price: 88500, image: 'images/tshirt.jpg', description: 'A comfortable and stylish t-shirt.' },
    { id: 3, name: 'Sofa', category: 'home', price: 1770000, image: 'images/sofa.jpg', description: 'A modern and comfortable sofa for your living room.' },
    { id: 4, name: 'Lipstick', category: 'beauty', price: 53100, image: 'images/lipstick.jpg', description: 'A long-lasting and vibrant lipstick.' },
    { id: 5, name: 'Dumbbells', category: 'sports', price: 177000, image: 'images/dumbbells.jpg', description: 'A set of dumbbells for your home workout.' },
    { id: 6, name: 'Smartphone', category: 'electronics', price: 2832000, image: 'images/smartphone.jpg', description: 'A powerful smartphone with a stunning display.' },
    { id: 7, name: 'Jeans', category: 'fashion', price: 212400, image: 'images/jeans.jpg', description: 'A pair of classic and comfortable jeans.' },
    { id: 8, name: 'Coffee Maker', category: 'home', price: 283200, image: 'images/coffeemaker.jpg', description: 'A programmable coffee maker for your daily brew.' },
];

const users = [
    { name: 'John Doe', email: 'john.doe@example.com', phone_number: '1234567890', date_of_birth: '1990-01-01', password: 'password123' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone_number: '0987654321', date_of_birth: '1992-05-10', password: 'password456' }
];

module.exports = function(db) {
    db.serialize(() => {
        const productStmt = db.prepare("INSERT INTO products (name, category, price, image, description) VALUES (?, ?, ?, ?, ?)");
        products.forEach(product => {
            productStmt.run(product.name, product.category, product.price, product.image, product.description);
        });
        productStmt.finalize();
        console.log('Products table populated.');

        const userStmt = db.prepare("INSERT INTO users (name, email, phone_number, date_of_birth, password) VALUES (?, ?, ?, ?, ?)");
        let usersProcessed = 0;
        users.forEach(user => {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    console.error(err);
                    return;
                }
                userStmt.run(user.name, user.email, user.phone_number, user.date_of_birth, hash, () => {
                    usersProcessed++;
                    if (usersProcessed === users.length) {
                        userStmt.finalize();
                        console.log('Users table populated.');
                    }
                });
            });
        });
    });
};