//Business Logic
//Pizza Includes, small, medium and small, 
//each pizza has 3 types of toppings chicken beef and pork
//each pizza has 3 types of crust crisp, stuffrd and Gluten free
//each topping has a name and individual price
//each crust has a type and price

//construct to create crust objects
function Crust(type, price) {
  this.Type = type;
  this.Price = price;
}
//construct to create topping objects
function Topping(name, price) {
  this.Name = name;
  this.Price = price;
}
//construct to create pizza objects
function Pizza(size, price) {
  this.Size = size;
  this.Price = price;
  this.Toppings = [];
  this.Crusts = [];
  this.Total = 0;
}
//get total price for a selected pizza
Pizza.prototype.pizzaTotal = function () {
  return (this.Price + this.Toppings[0].Price + this.Crusts[0].Price)
}
//get crust type
Pizza.prototype.pizzaCrust = function () {
  return (this.Crusts[0].Type)
}
//get topping chosen
Pizza.prototype.pizzaTopping = function () {
  return (this.Toppings[0].Name)
}
//user Logic
//declaring global variables
var locStatement = '';
var pizzaChosenPrice = 0;
$(document).ready(function () {
  $('form#pizzaorder').submit(function (event) {
    event.preventDefault();
    //Collecting input from form
    var pizzasize = $('select#size').val();
    var pizzatopping = $('input[name="topping"]:checked').val();
    var pizzacrust = $('select#crust').val();
    //determine crust price
    var crustPrice = function(){
      if (pizzacrust == 'crisp') {
        return 120
      } else if (pizzacrust == 'stuffed') {
        return 190
      } else if (pizzacrust == 'glutenFree') {
        return 220
      }
    }
    //create objects using construct
    var crustSelect = new Crust(pizzacrust, crustPrice())

    //determine toppings price
    var topPrice = function () {
      if (pizzatopping == 'chicken') {
        return 200
      } else if (pizzatopping == 'beef') {
        return 250
      } else if (pizzatopping == 'pork') {
        return 320
      }
    }//create topping object
    var toppingSelect = new Topping(pizzatopping, topPrice())

    //create Pizza object
    //determince pizza price
    var pizzaPrice = function () {
      if (pizzasize == 'small') {
        return 180
      } else if (pizzasize == 'medium') {
        return 220
      } else if (pizzasize == 'large') {
        return 330
      }
    }
    var pizzaSelect = new Pizza(pizzasize, pizzaPrice());
    
    //add toppings and crust objects to Pizza object
    pizzaSelect.Toppings.push(toppingSelect);
    pizzaSelect.Crusts.push(crustSelect);
    pizzaSelect.Total = (pizzaSelect.pizzaTotal())

    //adding selected pizza price to pizzaChosenArray
    pizzaChosenPrice+=pizzaSelect.Total
    // var pizzaChosen = function(){
    //   return pizzaChosenPrice+=pizzaSelect.Total
    // }
    console.log(pizzaChosenPrice);
    
    $('#calculator').append('<p>Order: '+pizzaChosenPrice+'</p>');
    $('#calculator p').first().remove();
    //show order to HTML
    if (pizzaSelect.Size == 'select size' || pizzaSelect.pizzaCrust() == 'Choose crust type' || pizzaSelect.pizzaTopping() == null) {
      alert('Select a valid option');
    } else {
      $('#orderSummary').append('<div class="summaries"><h5>Pizza Selected : </h5><p>' + pizzaSelect.Size + '</p>' +
                                '<h5>Toppings: </h5><p>' + pizzaSelect.pizzaTopping() + '</p>' +
                                '<h5>Crust Type: </h5><p>' + pizzaSelect.pizzaCrust() + '</p>' +
                                '<h4>SUB-TOTAL</h4><p>' + pizzaSelect.pizzaTotal() + '</p></div>')
      $('.seeSummary').hide()
    }
    //show popup for adding another order
    $('#addPopup').show();
    $('#anotherOne').click(function () {
      var anotherAns = $("input[name='anotherOrder']:checked").val();
      if (anotherAns == 'addYes') {
        $('#addPopup').hide();
        $('input#anotherOrder').trigger('reset');
        $('#pizzaorder').trigger('reset');
        $('.seeSummary').show()
      } else if (anotherAns == 'addNo') {
        $('#addPopup').hide();
        $('#selectDelivery').show();
      } else ($('.error').show())
    })
  })
  $('#checkout').click(function (event) {
    event.preventDefault();
    //calculate delivery
    var delivery = $('input[name="delivery"]:checked').val();
    var deliveryPrice = function () {
      if (delivery == 'delivery') {
        $('.location input').css('border', '2px solid red')
        return 350
      } else if (delivery == 'no-delivery') {
        $('.location').hide()
        return 0
      }
    }
    var locStatements = function () {
      if (delivery == 'delivery') {
        return locStatement = '<p>Your Delivery will be done to : '
      } else if (delivery == 'no-delivery') {
        return locStatement = '<p>Your Order will be ready '
      }
    }
    //incase of multiple pizza orders, find a total price for all pizzas

    var totalAmount = pizzaChosenPrice+deliveryPrice();
    var location = $('input#location').val();
    //checking if location is added
    if (delivery == 'delivery' && (location == null || location == '')) {
      alert('Please enter a location')
    };
    //display total at checkout
    $('#deliveryDetails').append(locStatements() + '<h3>' + location + '</h3>in 30 minutes</p>' +
                                  '<p> Delivery cost : ' + deliveryPrice() + '</p>')
    $('#totalAmount').append('<h1>TOTAL AMOUNT :' + totalAmount + '</h1>')
    $('#checkout').hide();
    $('#seeOrder').show();
    $('.thankyou').show();
  })

})
