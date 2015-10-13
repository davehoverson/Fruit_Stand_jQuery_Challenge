$(document).ready(function(){
	function main(){
        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
		

		var wallet = 100;

        var produce = {
            apple:new Fruit(),
            banana:new Fruit(),
            pear:new Fruit(),
            orange:new Fruit()

        };
        // for (var fruit in produce){
        //     addFruitToDom(fruit);
        // }
        //addFruitToDom('grape');
        $('.product').on('click', function() {
            var thisId = $(this).attr('id');
            buy(thisId,produce);
            updateCart(produce);
        });
        
		updatePrices(produce);
        updateCart(produce);
        
		var interval = setInterval(updatePrices, 15000,produce);

		$(".wallet span").text("$" + wallet);
        
        $('.sell').on('click', function() {
            elId = $(this).prev().attr('id');
            wallet = sell(elId,produce);
        });
        
        
        setInterval(finish,59000,interval,produce);
	};
	main();
});


function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function changePrice(curPrice){
    var randomPrice = randomNumber(-50, 50);
    var newPrice = Math.round(curPrice * 100 + randomPrice)/100;

    if(newPrice < 0.5) {
        newPrice = 0.5;
    }

    if(newPrice > 9.99){
        newPrice = 9.99;
    }
    //console.log("cur: "+curPrice+ ", new: "+newPrice);
    return newPrice;
    console.log(newPrice);	
}


//Calling function at interval
function updatePrices(produce){
    for (var fruit in produce) {
        produce[fruit].price = changePrice(produce[fruit].price);
        var selector = "#"+fruit+"-price";
        $(selector).text("$"+produce[fruit].price);
    }
}

function updateCart(produce){
    for (var fruit in produce){
        var selector = '.'+fruit+"-cart .quantity";
        $(selector).text(produce[fruit].qty);
        //console.log($(selector));
        //console.log(fruit+": "+produce[fruit].qty);
        var spent = 0;
        var purchases = produce[fruit].purchPrices;
        for (var i=0;i<purchases.length;i++){
            spent+= produce[fruit].purchPrices[i];
        }
        var avg = spent/purchases.length;
        selector = '.'+fruit+'-cart .avg-price';
        if(!isNaN(avg))
            updatePrice(avg,selector);
        else
            updatePrice(0,selector);
    }
}

function updatePrice(value,selector) {
    value = (Math.round(value*100))/100;
    $(selector).text('$'+value);
}

function Fruit(){
    this.spent = 0;
    this.qty = 0;
    this.price = (randomNumber(50,999))/100;
    this.purchPrices = [];
    this.sellPrices = [];
    this.buy = function() {
        this.qty += 1;
        this.purchPrices.push(this.price);
    };
    this.sell = function() {
        this.qty -=1;
        this.sellPrices.push(this.price);
    };
}

function getValue(elId){
    var text = $(elId).text();
    var newText = "";
    for (var i=1;i<text.length;i++){
        newText += text[i];
    }
    return parseFloat(newText);
}

function finish(interval,produce){
    //sell all stuff, change wallet, etc
    clearInterval(interval);
    console.log('Finishing');
    for(var fruit in produce){
        var myFruit = produce[fruit];
        while (myFruit.qty>0){
            console.log('starting with '+myFruit.qty+' '+fruit);
            sell(fruit,produce);
            //myFruit.sell();
            console.log('you now have '+myFruit.qty+' '+fruit+' remaining.');
        }
    updateCart();
    }
    netGain = getValue('.wallet span')-100;
    updatePrice(netGain,'.netgain > span');
    if (netGain < 0){
        $('.netgain span').css("color", "red");
    } else if (netGain > 0){
        $('.netgain span').css("color", "green");
    }
    $('.netgain').show();
}

function addFruitToDom(name){
    $productString = $('<div id="'+name+'" class="product '+name+'-product">'+
                       '<h3>'+name.capitalizeFirstLetter()+'</h3>'+
                       '<span class="price" id="'+name+'-price"></span>'+
                       '</div>'+
                       '<div class="sell" id="'+name+'-sell">Sell</div>'
                      
                      );
                       
    
                       
    $cartString = $('<div class="'+name+'-cart">'+
                   '<h3>'+name.capitalizeFirstLetter()+'</h3>'+
                   '<p class="quantity"></p>'+
                   '<p class="avg-price"></p>'+
                   '</div>');
    //var htmlString = 'test';
    $('.cart').append($cartString);
    $('section').append($productString);
    updateCart();
}

function buy(elId,produce){
    //console.log(elId+'bought');
    var money = getValue('.wallet span');
    var price = produce[elId].price;
    //console.log(price);
    if (money < price){
        //$('.wallet').animate({backgroundColor:'#ff0000'},100).animate({backgroundColor:'#ffffff'},1000);
        return false;
    }
    money -= price;
    produce[elId].buy();
    updatePrice(money,'.wallet span');
    return true;
}

function sell(fruit,produce){
    //console.log(fruit);
    var money = getValue('.wallet span');
    var price = produce[fruit].price;
    if (produce[fruit].qty==0){
        return false;
    }
    produce[fruit].sell();
    money += price;
    updatePrice(money,'.wallet span');
    updateCart(produce);
    //console.log(produce[fruit]);
    return true;
}