$(document).ready(function(){
	function main(){
		function randomNumber(min, max) {
			return Math.floor(Math.random() * (1 + max - min) + min);
		}

		var wallet = 100;

		//Fruit Price
		var applePrice = 4;
		var bananaPrice = 1;
		var pearPrice = 5;
		var orangePrice = 2;

		//Fruit Quantity
		var appleQuantity = 0;
		var bananaQuantity = 0;
		var pearQuantity = 0;
		var orangeQuantity = 0;

		//Amount Spent
		var appleSpent = 0;
		var bananaSpent = 0;
		var pearSpent = 0;
		var orangeSpent = 0;

		//Average Prices
		var appleAvgPrice = 0;
		var bananaAvgPrice = 0;
		var pearAvgPrice = 0;
		var orangeAvgPrice = 0;

		function changePrice(curPrice){
			var randomPrice = randomNumber(-50, 50);
			var newPrice = Math.round(curPrice * 100 + randomPrice)/100;

			if(newPrice < 0.5) {
				newPrice = 0.5;
			}

			if(newPrice > 9.99){
				newPrice = 9.99;
			}

			return newPrice;
			console.log(newPrice);	
		}


		//Calling function at interval
		function updatePrices(){
			applePrice = changePrice(applePrice);
			bananaPrice = changePrice(bananaPrice);
			pearPrice = changePrice(pearPrice);
			orangePrice = changePrice(orangePrice);

			$("#apple-price").text("$" + applePrice);
			$("#banana-price").text("$" + bananaPrice);
			$("#pear-price").text("$" + pearPrice);
			$("#orange-price").text("$" + orangePrice);
			console.log(applePrice);
		}
		updatePrices();
		setInterval(updatePrices, 1000);

		$(".wallet").text("Wallet $" + wallet);  

		$(".apple-product").on("click", function(){
			appleQuantity++;
			wallet -= applePrice;
			appleSpent += applePrice;
			appleAvgPrice = appleSpent/appleQuantity;
			$(".apple-quantity .quantity").text("Quantity: " + appleQuantity);
			$(".apple-quantity .avg-price").text("Average Price : $" + appleAvgPrice);
			$(".wallet").text("Wallet $" + wallet);
		});

		$(".banana-product").on("click", function(){
			bananaQuantity++;
			wallet -= bananaPrice;
			bananaSpent += bananaPrice;
			bananaAvgPrice = bananaSpent/bananaQuantity;
			$(".banana-quantity .quantity").text("Quantity: " + bananaQuantity);
			$(".banana-quantity .avg-price").text("Average Price : $" + bananaAvgPrice);
			$(".wallet").text("Wallet $" + wallet);

		});

		$(".pear-product").on("click", function(){
			pearQuantity++;
			wallet -= pearPrice;
			pearSpent += pearPrice;
			pearAvgPrice = pearSpent/pearQuantity;
			$(".pear-quantity .quantity").text("Quantity: " + pearQuantity);
			$(".pear-quantity .avg-price").text("Average Price : $" + pearAvgPrice);
			$(".wallet").text("Wallet $" + wallet);
		});

		$(".orange-product").on("click", function(){
			orangeQuantity++;
			wallet -= orangePrice;
			orangeSpent += orangePrice;
			orangeAvgPrice = orangeSpent/orangeQuantity;
			$(".orange-quantity .quantity").text("Quantity: " + orangeQuantity);
			$(".orange-quantity .avg-price").text("Average Price : $" + orangeAvgPrice);
			$(".wallet").text("Wallet $" + wallet);
		});

	};
	main();




});

