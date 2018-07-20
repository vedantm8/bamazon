var mysql = require('mysql');
var inquirer = require('inquirer');

var numbers =
    {
        pickleNum: 400,
        meatNum: 400,
        beNum: 400,
        starzNum: 400,
        wallENum: 400,
        orderNum: 400
    };
var productsPurchased = [];

var cmnnection = mysql.createConnection
    ({
        host: 'localhost',
        port: 8889,
        user: 'root',
        password: 'root',
        database: 'bamazonDB',
    });

coneection.createConnection()
{
    if (err) throw err;

    start();
}

function start() {
    inquirer
        .prompt
        ({
            name: "BuyorAdd",
            type: "rawlist",
            message: "Would you like to buy or add something to Bamazon?",
            choices: ["Buy", "Add"]
        })
        .then(function (answer) {
            if (answer.BuyorAdd.toUpperCase() === "Buy") {
                buySomething();
            }
            else {
                addSomething();
            }
        });
}
function addSomething() {
    // prompt for info about the item being put up for auction
    inquirer.prompt
        ([
            {
                name: "product_name",
                type: "input",
                message: "What is the item you would like to submit?"
            },
            {
                name: "price",
                type: "input",
                message: "How much will it cost?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            },
            {
                name: 'stock',
                type: 'input',
                message: 'How many do you have in stock?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    item_id: answer.item_id,
                    product_name: answer.product_name,
                    price: answer.price,
                    stock_quantity: answer.stock_quantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Product added");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}
function buySomething() {
    connection.query("SELECT * FROM auctions", function (err, results) {
        if (err) throw err;

        inquirer.prompt
            ([
                {
                    type: 'rawlist',
                    name: 'buyChoice',
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i, res.length; i++) {
                            choiceArray.push(res[i].item_name);
                        }
                        return choiceArray;
                    }
                },
                {
                    type: 'input',
                    name: 'howMany',
                    message: 'How many do you want to'
                }
            ])
            .then(function (answer) {
                var chosenItem;

                for (var i = 0; i < res.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
            })
        var orders = parseInt(answer.howMany);
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
                chosenItem = results[i];
            }
        }
        if (chosenItem = results[i])
        {
            parseInt(answers.howMany) -= orders;

            connection.query("UPDATE auctions SET ? WHERE ?"
            [
                {
                    howMany: howMany
                },
                {
                    id: chosenItem.id
                }
            ],
            function (err)
            {
                if (err) throw err;

                console.log('Order placed successfully!');
                start();
            }
        )
        }
        else{
            if (howMany <= 0)
            {
                console.log('There were no more left!');
            }
            else{
                console.log(err);
            }
        }
    })
}
