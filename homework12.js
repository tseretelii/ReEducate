const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Command } = require('commander');

// 1
function createUtilsHelper() {
    console.log("Task 1 - Creating utils/helper.js...");
    
    fs.mkdirSync('utils', { recursive: true });
    
    const helperContent = `
const fs = require('fs');

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

function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

module.exports = {
    read,
    write,
    calculateSum,
    reverseString
};
`;

    fs.writeFileSync('utils/helper.js', helperContent);
    console.log("Created utils/helper.js");
    
    const helper = require('./utils/helper.js');
    
    const userData = {
        name: "Gio",
        age: 25,
        email: "gio@gmail.com",
        hobbies: ["coding", "reading", "gaming"]
    };
    helper.write('user.json', userData, true);
    
    const textData = "Hello World! This is a sample text file.";
    helper.write('sample.txt', textData);
    
    const numbers = [1, 2, 3, 4, 5];
    const sum = helper.calculateSum(numbers);
    console.log("Sum of numbers:", sum);
    
    const reversed = helper.reverseString("Hello World");
    console.log("Reversed string:", reversed);
    
    const readUser = helper.read('user.json', true);
    const readText = helper.read('sample.txt');
    console.log("Read user data:", readUser);
    console.log("Read text data:", readText);
}

// 2
async function fetchApiData() {
    console.log("\nTask 2 - Fetching data from APIs...");
    
    const api1 = 'https://jsonplaceholder.typicode.com/users';
    const api2 = 'https://jsonplaceholder.typicode.com/posts';
    
    try {
        console.log("2.1) Running both APIs simultaneously...");
        const [usersResponse, postsResponse] = await Promise.all([
            axios.get(api1),
            axios.get(api2)
        ]);
        
        console.log("Users count:", usersResponse.data.length);
        console.log("Posts count:", postsResponse.data.length);
        
        console.log("\n2.2) Running both APIs and showing first response...");
        const promises = [
            axios.get(api1).then(response => ({ type: 'users', data: response.data })),
            axios.get(api2).then(response => ({ type: 'posts', data: response.data }))
        ];
        
        const firstResponse = await Promise.race(promises);
        console.log("First response type:", firstResponse.type);
        console.log("First response data length:", firstResponse.data.length);
        
        console.log("\n2.3) Running both APIs with resolution tracking...");
        const results = await Promise.allSettled([
            axios.get(api1),
            axios.get(api2)
        ]);
        
        results.forEach((result, index) => {
            const apiName = index === 0 ? 'Users API' : 'Posts API';
            if (result.status === 'fulfilled') {
                console.log(`${apiName}: Resolved successfully - ${result.value.data.length} items`);
            } else {
                console.log(`${apiName}: Rejected - ${result.reason.message}`);
            }
        });
        
    } catch (error) {
        console.error("Error fetching API data:", error.message);
    }
}

// 3
function createPhoneCLI() {
    console.log("\nTask 3 - Creating phone-cli with commander...");
    
    const program = new Command();
    
    let phones = [];
    
    try {
        const data = fs.readFileSync('phones.json', 'utf8');
        phones = JSON.parse(data);
    } catch (error) {
        phones = [];
    }
    
    function savePhones() {
        fs.writeFileSync('phones.json', JSON.stringify(phones, null, 2));
    }
    
    program
        .name('phone-cli')
        .description('Phone number management CLI')
        .version('1.0.0');
    
    program
        .command('add')
        .description('Add a new phone number')
        .argument('<name>', 'Contact name')
        .argument('<number>', 'Phone number')
        .option('--america', 'Add America prefix (011)')
        .action((name, number, options) => {
            let phoneNumber = number;
            
            if (options.america) {
                phoneNumber = '011' + number;
                console.log(`Added America prefix: ${phoneNumber}`);
            }
            
            const phone = {
                id: phones.length + 1,
                name: name,
                number: phoneNumber,
                timestamp: new Date().toISOString()
            };
            
            phones.push(phone);
            savePhones();
            console.log(`Added phone: ${name} - ${phoneNumber}`);
        });
    
    program
        .command('delete')
        .description('Delete a phone number by ID')
        .argument('<id>', 'Phone ID to delete')
        .action((id) => {
            const phoneId = parseInt(id);
            const phoneIndex = phones.findIndex(phone => phone.id === phoneId);
            
            if (phoneIndex !== -1) {
                const deletedPhone = phones.splice(phoneIndex, 1)[0];
                savePhones();
                console.log(`Deleted phone: ${deletedPhone.name} - ${deletedPhone.number}`);
            } else {
                console.log(`Phone with ID ${id} not found`);
            }
        });
    
    program
        .command('get')
        .description('Get a phone number by ID')
        .argument('<id>', 'Phone ID to get')
        .action((id) => {
            const phoneId = parseInt(id);
            const phone = phones.find(phone => phone.id === phoneId);
            
            if (phone) {
                console.log(`Phone found: ${phone.name} - ${phone.number} (ID: ${phone.id})`);
            } else {
                console.log(`Phone with ID ${id} not found`);
            }
        });
    
    program
        .command('list')
        .description('List all phone numbers')
        .action(() => {
            if (phones.length === 0) {
                console.log('No phones found');
            } else {
                console.log('All phones:');
                phones.forEach(phone => {
                    console.log(`ID: ${phone.id}, Name: ${phone.name}, Number: ${phone.number}`);
                });
            }
        });
    
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
        program.parse();
    } else {
        console.log("Phone CLI Usage:");
        console.log("  phone-cli add <name> <number> [--america]  - Add a new phone");
        console.log("  phone-cli delete <id>                     - Delete phone by ID");
        console.log("  phone-cli get <id>                        - Get phone by ID");
        console.log("  phone-cli list                            - List all phones");
        console.log("\nExample:");
        console.log("  phone-cli add giorgi 574221355 --america");
        console.log("  phone-cli add nika 555123456");
        console.log("  phone-cli list");
        console.log("  phone-cli get 1");
        console.log("  phone-cli delete 1");
    }
}

async function runAllTasks() {
    console.log("Starting Advanced Node.js Tasks...\n");
    
    createUtilsHelper();
    
    await fetchApiData();
    
    createPhoneCLI();
}

try {
    require('commander');
} catch (error) {
    console.log("Commander not found. Installing...");
    console.log("Please run: npm install commander axios");
    console.log("Then run this script again.");
    process.exit(1);
}

runAllTasks().catch(console.error);
