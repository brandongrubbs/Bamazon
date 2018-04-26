/*npm installs*/

var mysql = require('mysql');
var inquirer = require('inquirer');

//initialize connection//

var connection = mysql.createConnection({
	host:"localhost",
	port: 8888,
	user:"root",
	password:"root",
	database:"Bamazon_db"
})

//error message if code connection not made//

connection.connect(function)(err){
	if(err) throw err;
	console.log("connection successful");
})

//create visible list of products being sold//

//name of function//
showInventory();

//Creating function//
var showInventory = function(){
	connection.query ("SELECT * FROM products", function(err,res){
		for(var i=0; i<res.length; i++){
			console.log(res[i].item_id+" || "+res[i].product_name+" || "+
				res[i].department_name+" || "+res[i].price+" || "+res[i].
				quantiy+"\n");
		}
custInput();
	})
}

var custInput = function(res){
	inquirer.prompt([{
		type: 'input',
		name: 'choice',
		message: "What would you like to buy? [Cancel with C]"
	}]).then(function(answer){
		var correct = false;

		if(answer.choice.toUpperCase()=="C"){
			process.exit()
			}


		for(var i=0;i<res.length;i++){
			if(res[i].procuct_name==answer.choice){
				correct=true;
				var product=answer.choice;
				var id = i; 
				inquirer.prompt({
					type:"input",
					name:"number",
					message: "How many would you like to purchase?",
					validate: function(number){
						if(isNAN(value)==false){
							return true;
						} else {
							return false;
						}
					}
				}).then(function(answer){
					if((res[id].quantiy-answer.number)>0){
						connection.query("UPDATE products SET   
							quantiy='"+(res[item_id].quantiy-
							answer.number)+"'WHERE product_name='"+product
							+"'", function(err,res2){
								console.log("Purchase Complete");
								showInventory();
							}}})
					}else {
						console.log("Not a valid selection");
						custInput(res);
					}
				}
			}
		}
	})
}

