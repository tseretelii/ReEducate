const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const { Command } = require('commander');

// 1
function createUtilsHelper() {
    console.log("Task 1 - Creating utils/helper.js with string functions...");
    
    fs.mkdirSync('utils', { recursive: true });
    
    const helperContent = `
const fs = require('fs');

function toCapital(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    return str.toUpperCase();
}

function isPalindrome(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    const cleanStr = str.replace(/\\s/g, '').toLowerCase();
    const reversed = cleanStr.split('').reverse().join('');
    
    return cleanStr === reversed;
}

function findLongestWord(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    const words = str.split(' ');
    let longestWord = '';
    let maxLength = 0;
    
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > maxLength) {
            maxLength = words[i].length;
            longestWord = words[i];
        }
    }
    
    return longestWord;
}

function read(filename, parse = false) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return parse ? JSON.parse(data) : data;
    } catch (error) {
        console.error('Error reading file:', error.message);
        return null;
    }
}

function write(filename, data, stringify = false) {
    try {
        const content = stringify ? JSON.stringify(data, null, 2) : data;
        fs.writeFileSync(filename, content);
        console.log('File written successfully:', filename);
    } catch (error) {
        console.error('Error writing file:', error.message);
    }
}

module.exports = {
    toCapital,
    isPalindrome,
    findLongestWord,
    read,
    write
};
`;

    fs.writeFileSync('utils/helper.js', helperContent);
    console.log("Created utils/helper.js");
    
    const helper = require('./utils/helper.js');
    
    const capitalTest = helper.toCapital("hello world");
    console.log("Capital test:", capitalTest);
    
    const palindromeTest1 = helper.isPalindrome("ana");
    const palindromeTest2 = helper.isPalindrome("hello");
    console.log("Palindrome 'ana':", palindromeTest1);
    console.log("Palindrome 'hello':", palindromeTest2);
    
    const longestWordTest = helper.findLongestWord("I love JavaScript very much");
    console.log("Longest word:", longestWordTest);
}

// 2
function createHttpServer() {
    console.log("\nTask 2 - Creating HTTP server with routes and pagination...");
    
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35 },
        { id: 4, name: "Alice Brown", email: "alice@example.com", age: 28 },
        { id: 5, name: "Charlie Wilson", email: "charlie@example.com", age: 32 },
        { id: 6, name: "Diana Davis", email: "diana@example.com", age: 27 },
        { id: 7, name: "Eve Miller", email: "eve@example.com", age: 29 },
        { id: 8, name: "Frank Garcia", email: "frank@example.com", age: 31 },
        { id: 9, name: "Grace Lee", email: "grace@example.com", age: 26 },
        { id: 10, name: "Henry Taylor", email: "henry@example.com", age: 33 }
    ];
    
    const posts = [
        { id: 1, title: "First Post", content: "This is the first post", userId: 1 },
        { id: 2, title: "Second Post", content: "This is the second post", userId: 2 },
        { id: 3, title: "Third Post", content: "This is the third post", userId: 1 },
        { id: 4, title: "Fourth Post", content: "This is the fourth post", userId: 3 },
        { id: 5, title: "Fifth Post", content: "This is the fifth post", userId: 2 },
        { id: 6, title: "Sixth Post", content: "This is the sixth post", userId: 4 },
        { id: 7, title: "Seventh Post", content: "This is the seventh post", userId: 3 },
        { id: 8, title: "Eighth Post", content: "This is the eighth post", userId: 5 },
        { id: 9, title: "Ninth Post", content: "This is the ninth post", userId: 4 },
        { id: 10, title: "Tenth Post", content: "This is the tenth post", userId: 5 }
    ];
    
    const server = http.createServer((req, res) => {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const query = parsedUrl.query;
        
        let responseData = {};
        
        try {
            switch (pathname) {
                case '/':
                    responseData = {
                        message: "Welcome to the API Server",
                        availableRoutes: ["/users", "/posts"],
                        features: ["pagination", "search by id", "search by name (users only)"]
                    };
                    break;
                    
                case '/users':
                    let filteredUsers = [...users];
                    
                    if (query.id) {
                        filteredUsers = filteredUsers.filter(user => user.id === parseInt(query.id));
                    }
                    
                    if (query.name) {
                        filteredUsers = filteredUsers.filter(user => 
                            user.name.toLowerCase().includes(query.name.toLowerCase())
                        );
                    }
                    
                    const page = parseInt(query.page) || 1;
                    const limit = parseInt(query.limit) || 5;
                    const startIndex = (page - 1) * limit;
                    const endIndex = startIndex + limit;
                    
                    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
                    
                    responseData = {
                        data: paginatedUsers,
                        pagination: {
                            currentPage: page,
                            totalPages: Math.ceil(filteredUsers.length / limit),
                            totalItems: filteredUsers.length,
                            itemsPerPage: limit
                        }
                    };
                    break;
                    
                case '/posts':
                    let filteredPosts = [...posts];
                    
                    if (query.id) {
                        filteredPosts = filteredPosts.filter(post => post.id === parseInt(query.id));
                    }
                    
                    const postPage = parseInt(query.page) || 1;
                    const postLimit = parseInt(query.limit) || 5;
                    const postStartIndex = (postPage - 1) * postLimit;
                    const postEndIndex = postStartIndex + postLimit;
                    
                    const paginatedPosts = filteredPosts.slice(postStartIndex, postEndIndex);
                    
                    responseData = {
                        data: paginatedPosts,
                        pagination: {
                            currentPage: postPage,
                            totalPages: Math.ceil(filteredPosts.length / postLimit),
                            totalItems: filteredPosts.length,
                            itemsPerPage: postLimit
                        }
                    };
                    break;
                    
                default:
                    responseData = {
                        error: "Route not found",
                        availableRoutes: ["/", "/users", "/posts"]
                    };
                    res.statusCode = 404;
            }
            
            res.statusCode = res.statusCode || 200;
            res.end(JSON.stringify(responseData, null, 2));
            
        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }, null, 2));
        }
    });
    
    const PORT = 3001;
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log("Available routes:");
        console.log("- http://localhost:3001/");
        console.log("- http://localhost:3001/users?page=1&limit=5");
        console.log("- http://localhost:3001/users?id=1");
        console.log("- http://localhost:3001/users?name=john");
        console.log("- http://localhost:3001/posts?page=1&limit=5");
        console.log("- http://localhost:3001/posts?id=1");
    });
    
    return server;
}

// 3
function createProductsCLI() {
    console.log("\nTask 3 - Creating products-cli with CRUD operations...");
    
    const program = new Command();
    
    let products = [];
    
    try {
        const data = fs.readFileSync('products.json', 'utf8');
        products = JSON.parse(data);
    } catch (error) {
        products = [];
    }
    
    function saveProducts() {
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    }
    
    function isExpired(date) {
        const productDate = new Date(date);
        const currentDate = new Date();
        return productDate < currentDate;
    }
    
    program
        .name('products-cli')
        .description('Product management CLI')
        .version('1.0.0');
    
    program
        .command('add')
        .description('Add a new product')
        .argument('<name>', 'Product name')
        .argument('<description>', 'Product description')
        .argument('<date>', 'Product date (YYYY-MM-DD)')
        .argument('<category>', 'Product category')
        .option('--isexpire', 'Check if product is expired')
        .action((name, description, date, category, options) => {
            const product = {
                id: products.length + 1,
                name: name,
                description: description,
                date: date,
                category: category,
                createdAt: new Date().toISOString()
            };
            
            if (options.isexpire) {
                product.isExpired = isExpired(date);
                console.log(`Product expiration status: ${product.isExpired ? 'EXPIRED' : 'VALID'}`);
            }
            
            products.push(product);
            saveProducts();
            console.log(`Added product: ${name} (ID: ${product.id})`);
        });
    
    program
        .command('read')
        .description('Read all products')
        .option('--isexpire', 'Show expiration status')
        .action((options) => {
            if (products.length === 0) {
                console.log('No products found');
            } else {
                console.log('All products:');
                products.forEach(product => {
                    let output = `ID: ${product.id}, Name: ${product.name}, Description: ${product.description}, Date: ${product.date}, Category: ${product.category}`;
                    
                    if (options.isexpire) {
                        const expired = isExpired(product.date);
                        output += `, Expired: ${expired ? 'YES' : 'NO'}`;
                    }
                    
                    console.log(output);
                });
            }
        });
    
    program
        .command('get')
        .description('Get a product by ID')
        .argument('<id>', 'Product ID to get')
        .option('--isexpire', 'Show expiration status')
        .action((id, options) => {
            const productId = parseInt(id);
            const product = products.find(product => product.id === productId);
            
            if (product) {
                let output = `Product found: ${product.name}, Description: ${product.description}, Date: ${product.date}, Category: ${product.category}`;
                
                if (options.isexpire) {
                    const expired = isExpired(product.date);
                    output += `, Expired: ${expired ? 'YES' : 'NO'}`;
                }
                
                console.log(output);
            } else {
                console.log(`Product with ID ${id} not found`);
            }
        });
    
    program
        .command('delete')
        .description('Delete a product by ID')
        .argument('<id>', 'Product ID to delete')
        .action((id) => {
            const productId = parseInt(id);
            const productIndex = products.findIndex(product => product.id === productId);
            
            if (productIndex !== -1) {
                const deletedProduct = products.splice(productIndex, 1)[0];
                saveProducts();
                console.log(`Deleted product: ${deletedProduct.name} (ID: ${deletedProduct.id})`);
            } else {
                console.log(`Product with ID ${id} not found`);
            }
        });
    
    program
        .command('update')
        .description('Update a product by ID')
        .argument('<id>', 'Product ID to update')
        .argument('<name>', 'New product name')
        .argument('<description>', 'New product description')
        .argument('<date>', 'New product date (YYYY-MM-DD)')
        .argument('<category>', 'New product category')
        .option('--isexpire', 'Check if product is expired')
        .action((id, name, description, date, category, options) => {
            const productId = parseInt(id);
            const productIndex = products.findIndex(product => product.id === productId);
            
            if (productIndex !== -1) {
                products[productIndex] = {
                    ...products[productIndex],
                    name: name,
                    description: description,
                    date: date,
                    category: category,
                    updatedAt: new Date().toISOString()
                };
                
                if (options.isexpire) {
                    products[productIndex].isExpired = isExpired(date);
                    console.log(`Product expiration status: ${products[productIndex].isExpired ? 'EXPIRED' : 'VALID'}`);
                }
                
                saveProducts();
                console.log(`Updated product: ${name} (ID: ${productId})`);
            } else {
                console.log(`Product with ID ${id} not found`);
            }
        });
    
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
        program.parse();
    } else {
        console.log("Products CLI Usage:");
        console.log("  products-cli add <name> <description> <date> <category> [--isexpire]  - Add a new product");
        console.log("  products-cli read [--isexpire]                                      - Read all products");
        console.log("  products-cli get <id> [--isexpire]                                  - Get product by ID");
        console.log("  products-cli delete <id>                                            - Delete product by ID");
        console.log("  products-cli update <id> <name> <description> <date> <category> [--isexpire] - Update product");
        console.log("\nExample:");
        console.log("  products-cli add 'Laptop' 'Gaming laptop' '2024-12-31' 'Electronics' --isexpire");
        console.log("  products-cli read --isexpire");
        console.log("  products-cli get 1 --isexpire");
        console.log("  products-cli update 1 'Gaming Laptop' 'High-end gaming laptop' '2024-12-31' 'Electronics' --isexpire");
        console.log("  products-cli delete 1");
    }
}

async function runAllTasks() {
    console.log("Starting Final Node.js Tasks...\n");
    
    createUtilsHelper();
    
    const server = createHttpServer();
    
    createProductsCLI();
    
    setTimeout(() => {
        console.log("\nServer will continue running. Press Ctrl+C to stop.");
    }, 1000);
}

try {
    require('commander');
} catch (error) {
    console.log("Commander not found. Installing...");
    console.log("Please run: npm install commander");
    console.log("Then run this script again.");
    process.exit(1);
}

runAllTasks().catch(console.error);
