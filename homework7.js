// 1
class Triangle {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getPerimeter() {
        return this.a + this.b + this.c;
    }

    getArea() {
        const s = this.getPerimeter() / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    isRightTriangle() {
        const sides = [this.a, this.b, this.c].sort((a, b) => a - b);
        const [shortest, middle, longest] = sides;
        
        return Math.abs(Math.pow(shortest, 2) + Math.pow(middle, 2) - Math.pow(longest, 2)) < 0.001;
    }
}


const triangle1 = new Triangle(3, 4, 5);
console.log(`Perimeter: ${triangle1.getPerimeter()}`);
console.log(`Area: ${triangle1.getArea().toFixed(2)}`);
console.log(`Is Right Triangle: ${triangle1.isRightTriangle()}`);

const triangle2 = new Triangle(5, 5, 5);
console.log(`\nEquilateral Triangle - Perimeter: ${triangle2.getPerimeter()}, Area: ${triangle2.getArea().toFixed(2)}`);

// 2
class Smartphone {
    constructor(brand, model, releaseYear) {
        this.brand = brand;
        this.model = model;
        this.releaseYear = releaseYear;
    }

    getInfo() {
        return `${this.brand} ${this.model} (${this.releaseYear})`;
    }
}

// 3
class GamingPhone extends Smartphone {
    constructor(brand, model, releaseYear, gpuScore, batteryCapacity) {
        super(brand, model, releaseYear);
        this.gpuScore = gpuScore;
        this.batteryCapacity = batteryCapacity;
    }

    performanceIndex() {
        const gpuWeight = 0.7;
        const batteryWeight = 0.3;
        
        const normalizedGpu = (this.gpuScore / 10000) * 100;
        const normalizedBattery = (this.batteryCapacity / 5000) * 100;
        
        return Math.round((normalizedGpu * gpuWeight) + (normalizedBattery * batteryWeight));
    }
}

const smartphone = new Smartphone("Apple", "iPhone 15", 2023);
console.log(smartphone.getInfo());

const gamingPhone = new GamingPhone("ASUS", "ROG Phone 7", 2023, 8500, 6000);
console.log(`${gamingPhone.getInfo()}`);
console.log(`Performance Index: ${gamingPhone.performanceIndex()}`);

// 4
class CryptoWallet {
    constructor(owner) {
        this.owner = owner;
        this.balance = 0;
        this.history = [];
    }

    deposit(amount, description = "Deposit") {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        
        this.balance += amount;
        this.history.push({
            type: "deposit",
            amount: amount,
            description: description,
            timestamp: new Date(),
            balance: this.balance
        });
        
        return this.balance;
    }

    withdraw(amount, description = "Withdrawal") {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        
        this.balance -= amount;
        this.history.push({
            type: "withdrawal",
            amount: amount,
            description: description,
            timestamp: new Date(),
            balance: this.balance
        });
        
        return this.balance;
    }

    transfer(amount, recipient, description = "Transfer") {
        if (amount <= 0) {
            throw new Error("Transfer amount must be positive");
        }
        
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        
        this.balance -= amount;
        this.history.push({
            type: "transfer",
            amount: amount,
            description: `${description} to ${recipient}`,
            timestamp: new Date(),
            balance: this.balance
        });
        
        return this.balance;
    }

    getHistory() {
        return this.history;
    }

    getBalance() {
        return this.balance;
    }
}

const wallet = new CryptoWallet("John Doe");
console.log(`Initial balance: ${wallet.getBalance()}`);

wallet.deposit(1000, "Initial deposit");
console.log(`After deposit: ${wallet.getBalance()}`);

wallet.withdraw(200, "Shopping");
console.log(`After withdrawal: ${wallet.getBalance()}`);

wallet.transfer(300, "Alice", "Payment for services");
console.log(`After transfer: ${wallet.getBalance()}`);

console.log("\nTransaction History:");
wallet.getHistory().forEach((transaction, index) => {
    console.log(`${index + 1}. ${transaction.type.toUpperCase()}: ${transaction.amount} - ${transaction.description} (Balance: ${transaction.balance})`);
});

// 5
class Wishlist {
    constructor(name) {
        this.name = name;
        this.items = [];
        this.nextId = 1;
    }

    addItem(name, price, description = "") {
        const item = {
            id: this.nextId++,
            name: name,
            price: price,
            description: description,
            addedDate: new Date()
        };
        
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error(`Item with ID ${id} not found`);
        }
        
        const deletedItem = this.items.splice(index, 1)[0];
        return deletedItem;
    }

    updateItem(id, updates) {
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new Error(`Item with ID ${id} not found`);
        }
        
        Object.assign(item, updates);
        return item;
    }

    getItems() {
        return this.items;
    }

    getTotalValue() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

const wishlist = new Wishlist("My Wishlist");
wishlist.addItem("MacBook Pro", 2000, "High-performance laptop");
wishlist.addItem("iPhone 15", 800, "Latest smartphone");
wishlist.addItem("AirPods Pro", 250, "Wireless earbuds");

console.log("Items in wishlist:");
wishlist.getItems().forEach(item => {
    console.log(`${item.id}. ${item.name} - $${item.price} (${item.description})`);
});

console.log(`Total value: $${wishlist.getTotalValue()}`);

wishlist.updateItem(2, { price: 750, description: "Latest smartphone with discount" });
console.log("\nAfter updating iPhone:");
const updatedItem = wishlist.getItems().find(item => item.id === 2);
console.log(`${updatedItem.id}. ${updatedItem.name} - $${updatedItem.price} (${updatedItem.description})`);

const deletedItem = wishlist.deleteItem(3);
console.log(`\nDeleted item: ${deletedItem.name}`);

// 6
class Freelancer {
    constructor(name, hourlyRate) {
        this.name = name;
        this.hourlyRate = hourlyRate;
        this.hoursWorked = 0;
        this.overtimeThreshold = 160;
        this.overtimeMultiplier = 1.5;
    }

    addHours(hours) {
        if (hours < 0) {
            throw new Error("Hours cannot be negative");
        }
        this.hoursWorked += hours;
    }

    calculateEarnings(bonus = 0) {
        let regularHours = Math.min(this.hoursWorked, this.overtimeThreshold);
        let overtimeHours = Math.max(0, this.hoursWorked - this.overtimeThreshold);
        
        let regularEarnings = regularHours * this.hourlyRate;
        let overtimeEarnings = overtimeHours * this.hourlyRate * this.overtimeMultiplier;
        let totalEarnings = regularEarnings + overtimeEarnings + bonus;
        
        return {
            regularHours: regularHours,
            overtimeHours: overtimeHours,
            regularEarnings: regularEarnings,
            overtimeEarnings: overtimeEarnings,
            bonus: bonus,
            totalEarnings: totalEarnings,
            hourlyRate: this.hourlyRate
        };
    }

    resetHours() {
        this.hoursWorked = 0;
    }
}

const freelancer = new Freelancer("Jane Smith", 50);


freelancer.addHours(180);
console.log(`Hours worked: ${freelancer.hoursWorked}`);

const earnings = freelancer.calculateEarnings(500);
console.log("\nEarnings breakdown:");
console.log(`Regular hours (${earnings.regularHours}): $${earnings.regularEarnings}`);
console.log(`Overtime hours (${earnings.overtimeHours}): $${earnings.overtimeEarnings}`);
console.log(`Bonus: $${earnings.bonus}`);
console.log(`Total earnings: $${earnings.totalEarnings}`);


freelancer.resetHours();
freelancer.addHours(120);
const regularEarnings = freelancer.calculateEarnings();
console.log(`\nRegular work (${regularEarnings.regularHours} hours): $${regularEarnings.totalEarnings}`);
