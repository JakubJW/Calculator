$(document).ready(function() {
   
    //aktualnie wpisana liczba
    var current = "0";

    //pamięć przechowująca poprzednio wpisaną liczbę
    var memory = 0;

    //operator ustawiony na null
    var operator = null;

    //sprawdź, czy wciśnięty przycisk jest cyfrą
    isNumber = function(value)
    {
        if(isNaN(value) === false) return true;
    }

    //sprawdź, czy wciśnięty przycisk jest operatorem
    isOperator = function(value)
    {
        if(value === "+" || value === "-" || value === "*" || value === "/") return true;
    }

    //wykonuje określiną operację i zwraca wynik
    operation = function(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        if (operator === "+") return num1 + num2;
        if (operator === "-") return num1 - num2;
        if (operator === "*") return num1 * num2;
        if (operator === "/") return num1 / num2;
    }
    
    //aktualizuje wyświetlacz
    screenUpdate = function(value) {
        var value = value.toString();

        $('.screen').html(value.substring(0,10));
    }

    //segment realizujący wciskanie przycisków i związane z nimi akcje
    $('.button').on('click', function() {
        var pressed = $(this).attr('value');
        console.log(pressed);

        //zeruje aktualnie wpisaną liczbę
        if (pressed === "C") {
            current = "0"; 
            screenUpdate(current);
        }

        //zeruje wszystko
        else if (pressed === "CE") {
            current = "0";
            memory = 0;
            operator = null;
            screenUpdate(current);
        }

        //usuwa ostanią cyfrę w stringu
        else if (pressed === "back") {
            current = current.substring(0,current.length-1);
            screenUpdate(current);
        }

        //zmienia znak na przeciwny
        else if (pressed === "+/-") {
            current *= -1;
            screenUpdate(current);
        }

        //umożliwia wpisanie cyfr po przecinku
        else if (pressed === ".") {
            current += '.';
            screenUpdate(current);
        }

        else if (isNumber(pressed)) {

            //pierwsze uruchomienie kalkulatora lub zresetowanie poprzez CE lub C, wtedy current przyjmuje wartość 0
            if (current === "0") current = pressed;
        
            //dopisywanie kolejnych cyfr do stringa current, jeśli jest niezerowy
            else current = current + pressed;
            screenUpdate(current);
        }

        else if (isOperator(pressed)) {
            
            //ustawia operator, przekazuje wpisaną liczbę do pamięci i czyści aktualną liczbę
            operator = pressed;
            memory = parseFloat(current);
            current = "";
        }

        else if (pressed === "=") {
            current = operation(memory, current, operator);
            operator = null; 
            screenUpdate(current);
        }
    });
});