function greedyCoinChange(coins, amount) {
    coins.sort((a, b) => b - a); // Sort coins in descending order

    let remainingAmount = amount;
    const change = [];

    for (let coin of coins) {
        while (remainingAmount >= coin) {
            change.push(coin); // Add coin to the change
            remainingAmount -= coin; // Update remaining amount
        }
    }

    if (remainingAmount !== 0) {
        console.log("Cannot make exact change.");
        return [];
    }

    return change;
}

// Example usage
const coins = [25, 10, 5, 1]; // Available coin denominations
const amount = 63; // Amount to make change for
console.log("Coins used to make change:", greedyCoinChange(coins, amount));
