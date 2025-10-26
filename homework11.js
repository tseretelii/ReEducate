const fs = require('fs');
const path = require('path');
const http = require('http');

// 1
function task1() {
    console.log("Task 1 - Creating folders and files, then deleting only folders...");
    
    fs.mkdirSync('folder1', { recursive: true });
    fs.mkdirSync('folder2', { recursive: true });
    
    fs.writeFileSync('file1.txt', 'Content of file 1');
    fs.writeFileSync('file2.txt', 'Content of file 2');
    fs.writeFileSync('file3.txt', 'Content of file 3'); 
    
    console.log("Created 2 folders and 3 files");
    
    const items = ['folder1', 'folder2', 'file1.txt', 'file2.txt', 'file3.txt'];
    
    items.forEach(item => {
        try {
            const stats = fs.lstatSync(item);
            if (stats.isDirectory()) {
                fs.rmdirSync(item);
                console.log(`Deleted folder: ${item}`);
            } else if (stats.isFile()) {
                console.log(`Kept file: ${item}`);
            }
        } catch (error) {
            console.log(`Error processing ${item}:`, error.message);
        }
    });
}

// 2
function task2() {
    console.log("\nTask 2 - Creating nested folder structure...");
    
    const mainFolder = 'mainFolder';
    fs.mkdirSync(mainFolder, { recursive: true });
    
    const mainJsContent = `
const fs = require('fs');
const path = require('path');

fs.mkdirSync('subfolder', { recursive: true });

const indexJsContent = \`
const fs = require('fs');

const message = "Hello World! This is a test message.";
fs.writeFileSync('../message.txt', message);

const readMessage = fs.readFileSync('../message.txt', 'utf8');
const reversedMessage = readMessage.split('').reverse().join('');
fs.writeFileSync('../message.txt', reversedMessage);

console.log("Message reversed and saved!");
\`;

fs.writeFileSync('subfolder/index.js', indexJsContent);
console.log("Created subfolder and index.js");
`;

    fs.writeFileSync(path.join(mainFolder, 'main.js'), mainJsContent);
    
    const mainJsPath = path.join(mainFolder, 'main.js');
    require(mainJsPath);
    
    console.log("Task 2 completed - nested structure created and message.txt processed");
}

// 3
function task3() {
    console.log("\nTask 3 - Creating folder with mixed files and merging .txt files...");
    
    const folderName = 'mixedFiles';
    fs.mkdirSync(folderName, { recursive: true });
    
    fs.writeFileSync(path.join(folderName, 'file1.txt'), 'Content from file 1');
    fs.writeFileSync(path.join(folderName, 'file2.txt'), 'Content from file 2');
    fs.writeFileSync(path.join(folderName, 'file3.txt'), 'Content from file 3');
    
    fs.writeFileSync(path.join(folderName, 'script1.js'), 'console.log("Script 1");');
    fs.writeFileSync(path.join(folderName, 'script2.js'), 'console.log("Script 2");');
    fs.writeFileSync(path.join(folderName, 'script3.js'), 'console.log("Script 3");');
    
    console.log("Created folder with 6 files (3 .txt, 3 .js)");
    
    const files = fs.readdirSync(folderName);
    const txtFiles = files.filter(file => file.endsWith('.txt'));
    
    let mergedContent = '';
    txtFiles.forEach(file => {
        const content = fs.readFileSync(path.join(folderName, file), 'utf8');
        mergedContent += `--- ${file} ---\n${content}\n\n`;
    });
    
    fs.writeFileSync(path.join(folderName, 'all.txt'), mergedContent);
    
    console.log("Found .txt files:", txtFiles);
    console.log("Merged content saved to all.txt");
}

// 4
function task4() {
    console.log("\nTask 4 - Creating HTTP server with 3 endpoints...");
    
    const server = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        
        let responseData = {};
        
        switch (req.url) {
            case '/animals':
                responseData = {
                    message: "Animals endpoint",
                    data: [
                        { name: "Lion", type: "Mammal", habitat: "Savanna" },
                        { name: "Eagle", type: "Bird", habitat: "Mountains" },
                        { name: "Shark", type: "Fish", habitat: "Ocean" },
                        { name: "Elephant", type: "Mammal", habitat: "Forest" }
                    ]
                };
                break;
                
            case '/cars':
                responseData = {
                    message: "Cars endpoint",
                    data: [
                        { brand: "Toyota", model: "Camry", year: 2023, color: "Silver" },
                        { brand: "BMW", model: "X5", year: 2022, color: "Black" },
                        { brand: "Tesla", model: "Model 3", year: 2023, color: "White" },
                        { brand: "Mercedes", model: "C-Class", year: 2022, color: "Blue" }
                    ]
                };
                break;
                
            case '/motorcycle':
                responseData = {
                    message: "Motorcycle endpoint",
                    data: [
                        { brand: "Honda", model: "CBR600RR", year: 2023, type: "Sport" },
                        { brand: "Harley-Davidson", model: "Street 750", year: 2022, type: "Cruiser" },
                        { brand: "Yamaha", model: "YZF-R1", year: 2023, type: "Sport" },
                        { brand: "Kawasaki", model: "Ninja 650", year: 2022, type: "Sport" }
                    ]
                };
                break;
                
            default:
                responseData = {
                    message: "Welcome to the server!",
                    availableEndpoints: ["/animals", "/cars", "/motorcycle"]
                };
        }
        
        res.statusCode = 200;
        res.end(JSON.stringify(responseData, null, 2));
    });
    
    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log("Available endpoints:");
        console.log("- http://localhost:3000/animals");
        console.log("- http://localhost:3000/cars");
        console.log("- http://localhost:3000/motorcycle");
    });
    
    setTimeout(() => {
        console.log("Server will continue running. Press Ctrl+C to stop.");
    }, 1000);
}

console.log("Starting Advanced Node.js Tasks...\n");

task1();
setTimeout(() => {
    task2();
    setTimeout(() => {
        task3();
        setTimeout(() => {
            task4();
        }, 1000);
    }, 1000);
}, 1000);
