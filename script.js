$(document).ready(function() {
   
    var current = "0";
    var memory = 0;
    var operator = null;
    
    isNumber = function(value) {
      if (isNaN(value) === false) return true;
    }
    
    isOperator = function(value) {
      if (value === "+" || value === "-" || value === "*" || value === "/") return true;
    }
    
    operation = function(num1, num2, operator) {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
    
      if (operator === "+") return num1 + num2;
      if (operator === "-") return num1 - num2;
      if (operator === "*") return num1 * num2;
      if (operator === "/") return num1 / num2;
    }
    
    screenUpdate = function(value) {
      var value = value.toString();
    
      $('.screen').html(value.substring(0, 10));
    }
    
    $('.button').on('click', function() {
      var pressed = $(this).attr('value');
      console.log(pressed);
    
      if (pressed === "C") {
        current = "0";
        screenUpdate(current);
      } else if (pressed === "CE") {
        current = "0";
        memory = 0;
        operator = null;
        screenUpdate(current);
      } else if (pressed === "back") {
        current = current.substring(0, current.length - 1);
        screenUpdate(current);
      } else if (pressed === "+/-") {
        current *= -1;
        screenUpdate(current);
      } else if (pressed === ".") {
        current += '.';
        screenUpdate(current);
      } else if (isNumber(pressed)) {
    
        if (current === "0") current = pressed;
    
        else current = current + pressed;
        screenUpdate(current);
      } else if (isOperator(pressed)) {
    
        if (memory === 0) {
          memory = parseFloat(current);
          current = "";
        } else {
          memory = operation(memory, current, operator);
          current = "";
        }
    
        operator = pressed;
        screenUpdate(operator);
      } else if (pressed === "=") {
        if (current == "") {
          current = operation(memory, memory, operator);
        } else {
          current = operation(memory, current, operator);
        }
    
        operator = null;
        memory = 0;
        screenUpdate(current);
      }
    });
    
});