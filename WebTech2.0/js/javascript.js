/* 

Name: Petru-Marian Burlacu
Module: Web Technologies
Course: Web Design and Development
Year: Second (2nd) Year Student
University: Edinburgh Napier University
Coursework: Assignment 1 | Ciphers
Description:  HTML Website to present Ciphers using javascript

/*

  97 is character code for 'a'. 122 is 'z'
  65 is character code for 'A'. 90 is 'Z'

-------------------------------------------
	JAVASCRIPT MAP
-------------------------------------------

** -- checkState functions call from the HTML code, from the two buttons to see if functions shoud encrypt or decrypt -- **


	1. Caesar Cipher
		1.1 Caesar Cipher main function
		1.2 checkState function
		

	2. Atbach Cipher
		2.1 Atbash Cipher main function
		

	3. Vigenere Cipher
        3.1 Vigenece Cipher main function
        3.2 Key filter for Vigenece Cipher passphrase
        3.3 checkState function
	
			
-------------------------------------------
*/



/* --------------------------------
    1. Caesar Cipher 
---------------------------------*/
    

function caesarCipher(text, rot) {
    
	var outcome = ""; // creates an empty string
    
    for (var l = 0; l <text.length; l++) { //goes through each letter
        var char = text.charCodeAt(l); // returns the unicode of character in a string
        
        if (65 <= char && char <= 90) {
            outcome += String.fromCharCode((char - 65 + rot) % 26 + 65); // checks for Uppercase
        }
        else if (97 <= char && char <= 122) {
            outcome += String.fromCharCode((char - 97 + rot) % 26 + 97);  // checks for Lowercase
        }
        else {
            outcome += text.charAt(l);  // keeps a copy in case it is not a letter
        }
    }
    return outcome; //returns the result
}

function checkStateCaesar(state) { //check from button press if it should Encrypt / Decrypt
    
    var rotText = document.getElementById("shiftBy").value; // stores string value for rot box (for shift)
    
    if (!/^-?\d+$/.test(rotText)) { //checks to see if the inputed value is an INTEGER ONLY for id="shiftBy"
        alert ("Must input an integer to shift by!"); // creates a pop up alert with the message
        return; // stops the execution
    }
    
    var rot = parseInt(rotText, 10); //parses the string values from rotText variable and returns an integer
    
    if (rot < 0 || rot >= 26) { //checks the range of rot text box, (0 - 25)
        alert ("Out of range shift!"); //creates a pop up alert with the message
        return; //stops the execution
    }
    
    if (state) { //on Decrypt button press
        rot = (26 - rot) % 26; //shifts
    }
    
    var textElement = document.getElementById("text"); //stores the text from textbox in a variable
    
    textElement.value = caesarCipher(textElement.value, rot); //sends textElement value to Caesar Cipher main function
    
}

/* --------------------------------
   Caesar Cipher END
---------------------------------*/


/* --------------------------------
    2. Atbash Cipher
---------------------------------*/

function atBash (text) {
    
    var normalCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //variable that stores capital letter alphabet
    var normalSmall = "abcdefghijklmnopqrstuvwxyz"; //var that stores small letter alphabet
    
    var reverseCapital = "ZYXWVUTSRQPONMLKJIHGFEDCBA"; //var that stores reversed capital letter alphabet
    var reverseSmall = "zyxwvutsrqponmlkjihgfedcba"; //var that stores reversed small letter alphabet
    
    var outcome = ""; //empty string initialized
    
    /*
    if (!text.match(/^[a-zA-Z]+$/)) {
        alert('Only alphabets are allowed');
        return;
    } // check to have only letters  */
    
    for (var l = 0; l <text.length; l++) { //goes through each letter
        var char = text.charCodeAt(l); // returns the character in a string
        
        if (65 <= char && char <= 90) { // checks for Uppercase
            var step1 = normalCapital.indexOf(String.fromCharCode(char)); //takes the index of the alphabetical unicode value and stores it in step1
            var step2 = reverseCapital.charAt(step1); //matches it with the reverse alphabet
            
            outcome += step2; //adds the letter to the outcome string
            console.log(outcome + " if");
        }
        else if (97 <= char && char <= 122) { // checks for Lowercase
            var step1 = normalSmall.indexOf(String.fromCharCode(char)); //takes the index of the alphabetical unicode value and stores it in step1
            var step2 = reverseSmall.charAt(step1); //matches it with the reverse alphabet
            
            outcome += step2; //adds the letter to the outcome string
            console.log(outcome + " else if");
        }
        else {
            outcome += text.charAt(l);  // keeps a copy for non letters
            console.log(outcome + " else");
        }
    }
    return outcome; //returns the result
    console.log(outcome + " final");

}

/* --------------------------------
    Atbash Cipher END
---------------------------------*/

/* --------------------------------
    Vigenere Cipher
---------------------------------*/

// returns the vigenere cipher results with the given key
function vigenereCipher (input, key){
    var outcome = ""; //empty string initialized
    
    for (var i = 0, j = 0; i < input.length; i++) { //increments through the textbox text, after changing a letter ONLY, increase the value of j to shift the letters with keys's unicode
        var char = input.charCodeAt(i); // returns the unicode of character in a string
        
        if (65 <= char && char <= 90) { // checks for upper case
            outcome += String.fromCharCode((char - 65 + key[j % key.length]) % 26 + 65);
            j++;
            console.log(outcome + " else if");
        }
        else if (97 <= char && char <= 122) { //checks for lower case
            outcome += String.fromCharCode((char - 97 + key[j % key.length]) % 26 + 97);
            j++;
            console.log(outcome + " else if");
        }
        else {
            outcome += input.charAt(i);
            console.log(outcome + " else");
        }
    }
    return outcome;
    console.log(outcome);
}

// Returns an array of numbers
function filter(key) {
    var outcome = []; //initialize an empty array
    
    for (var i = 0; i < key.length; i++) { //goes through key's characters
        var char = key.charCodeAt(i); /// returns the unicode of character in a string
        
        if ((65 <= char && char <= 90) || (97 <= char && char <= 122)) { //checks for letters
            outcome.push((char - 65) % 32); //pushes the unicode value
            console.log(outcome + " if");
        }
        console.log(outcome + " for");
    }
    return outcome;
    console.log(outcome);
}

// input/output for Vigenère cipher encryption/decription.
function checkStateVigenere(state) { //check from button press if it should Encrypt / Decrypt
    
    if (document.getElementById("shiftBy").value.length == 0) { //checks if the textbox for key is empty
        alert("Please input a key");
        return;
    }
    
    var key = filter(document.getElementById("shiftBy").value);
    
    if (key.length == 0) { //checks if there are letters
        alert("Please input letters");
        return;
    }
    
    if(state) { //if true, executes Decrypt button
        for (var l = 0; l < key.length; l++) {
            key[l] = (26 - key[l]) % 26;
        }
    }
    
    var textElement = document.getElementById("text");
    
    textElement.value = vigenereCipher(textElement.value, key); //sends textElement to Caesar Cipher
    
}


/* --------------------------------
    Vigenere Cipher END
---------------------------------*/