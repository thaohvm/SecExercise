function createAccount(pin, amount = 0) {
    return {
        checkBalance : function(inputPin) {
            // check balance
            if (inputPin !== pin) {
                return "Invalid PIN."
            } else {
                return `$${amount}`;
            }
        },

        deposit : function(inputPin, depositAmount) {
            //deposit
            if (inputPin === pin && depositAmount) {
                amount += depositAmount;
                return `Succesfully deposited $${depositAmount}. Current balance: $${amount}.`
            } else {
                return "Invalid PIN."
            }
        },
        withdraw : function(inputPin, withdrawAmount) {
            //withdraw
            if (inputPin === pin && withdrawAmount) {
                if (amount > withdrawAmount) {
                    amount -= withdrawAmount;
                return `Succesfully withdrew $${withdrawAmount}. Current balance: $${amount}.`
                } else {
                    return "Withdrawal amount exceeds account balance. Transaction cancelled."
                }
            } else {
                return "Invalid PIN."
            }
        },
        changePin : function(oldPin, newPin) {
            //change pin
            if (oldPin === pin) {
                pin = newPin;
                return "PIN successfully changed!"
            } else {
                return "Invalid PIN."
            }
        },
    }
}

module.exports = { createAccount };
