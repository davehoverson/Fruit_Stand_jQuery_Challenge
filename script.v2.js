$(document).ready(function(){
	function main(){

		var wallet = 100;
		$(".wallet").text("Wallet $" + wallet);

		function Fruit(name, price, quantity, spent, average){
			this.name = name;
			this.price = price;
			this.quantity = quantity;
			this.amountSpent = spent;
			this.averagePrice = average;
		}

		var apple = new Fruit ("apple", 4, 0, 0, 0);
		var banana = new Fruit ("banana", 1, 0 , 0, 0);
		var pear = new Fruit ("pear", 5, 0, 0, 0);
		var orange = new Fruit ("orange", 2, 0, 0, 0);
		
		var fruitArray = [apple, banana, pear, orange];

		runLoop();

		function runLoop(){
			for(var i = 0; i < fruitArray.length; i++){
				updatePrices(fruitArray[i]);
			}
		};

		function updatePrices(object){
			object.price = changePrice(object.price);

			$("#" + object.name + "-price").text("$" + object.price);
		}

		function changePrice(curPrice){
			var randomPrice = randomNumber(-50, 50);
			var newPrice = Math.ceil(curPrice * 100 + randomPrice)/100;

			if(newPrice < 0.5) {
				newPrice = 0.5;
			}

			if(newPrice > 9.99){
				newPrice = 9.99;
			}
			return newPrice;
		}

		function randomNumber(min, max) {
			return Math.floor(Math.random() * (1 + max - min) + min);
		}  

		function fruitClick(object){
			$("." + object.name + "-product").on("click", function(){
				object.quantity++;
				wallet -= object.price;
				object.amountSpent += object.price;
				object.averagePrice = Math.ceil((object.amountSpent/object.quantity)*100)/100;
				$("." + object.name + "-quantity .quantity").text("Quantity: " + object.quantity);
				$("." + object.name + "-quantity .avg-price").text("Average Price : $" + object.averagePrice);
				$(".wallet").text("Wallet $" + wallet);
			});
		}

		fruitClick(fruitArray[0]);
		fruitClick(fruitArray[1]);
		fruitClick(fruitArray[2]);
		fruitClick(fruitArray[3]);

		setInterval(runLoop, 15000);
	};
	main();
});


