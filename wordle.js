function howToPlay(){
    let image = document.getElementById('howtoplay');
    image.src="howtoplay.jpgr";
    alert("Onload image"+image);
}

function refreshPage(){
    window.location.reload();
}




document.addEventListener('DOMContentLoaded', () => {
    createSquares();

    //Function for making a square box for the letters//
    function createSquares(){
        //Make 30 divs and add class names square/animate__animated(for flipInX) and id from 1 to 30//
        for(let index = 0;index <30; index++){
            let square = document.createElement('div');
            square.classList.add('square');
            square.classList.add('animate__animated');
            square.setAttribute('id',index+1);
            document.getElementById('board').appendChild(square);
        }
    }

    //Get the one ramdom 5letters word from the wordle-words.js and set them to lowercase to match the keyboard//
    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      }
    const newWord = getRandomElement(validWords);
    let word = newWord.toLowerCase();
    console.log(word);      

    
    //Create a array to save the keys//
    let guessWord = [[]];
    // Set for catch ID//
    let aviableSpace = 1;
    //Set for helping finding the id of the first letters for each guss//
    let guessWordCount = 0;


//Get the key value from click//
    const keys = document.querySelectorAll(".key");
    for(let i = 0; i < keys.length; i++){
        keys[i].onclick = (event) =>{
        const key = event.target.getAttribute('data-key');
        console.log(key);
        //If key = enter , click the Enter button tp call the submit function//
        if(key === 'enter'){
            submitWord()
            return;
        }
        //If key = delete , click the delete dutton to call the deleteLetter function//
        if(key === 'delete'){
            deleteLetter();
            return;
        }
        updateGuessedWords(key);
    }
}

//change color
    function getTileColor(key,index){
        const correctLetter = word.includes(key)
        
        if (!correctLetter){
            return "rgb(58,58,60)";
        }
        //Check the letter is in 
        const rightPosition = word.charAt(index)
        console.log(rightPosition);
        const correctPosition = (key === rightPosition);
        console.log(correctPosition)

        if(correctPosition){
            return "rgb(83,141,78)";
        }

        return "rgb(181,159,59)";
    }
//function for delete last letter//
    function deleteLetter(){
        const currentWordArray = getCurrentWordArray();
        const remove = currentWordArray.pop();

        guessWord[guessWord.length - 1] = currentWordArray;

        const lastLetter = document.getElementById(`${aviableSpace -1}`);
        lastLetter.textContent = '';
        aviableSpace = aviableSpace - 1;
    }

//function for submit words//
    function submitWord(){
        const currentWordArray = getCurrentWordArray();
        if(currentWordArray.length !== 5 ){
            window.alert('must be 5 letters');
            return updateGuessedWords;
        }

        const currentWord = currentWordArray.join(''); 
        const firstLetterId = guessWordCount*5 +1;
        const interval = 200;

        currentWordArray.forEach((key,index)=>{
            setTimeout(()=>{
                const tileColor = getTileColor(key,index);
                // 
                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add('animate__flipInX');
                letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`

                const keyboardButton = document.getElementById(key);
                keyboardButton.classList.add("animate__flipInX");
                keyboardButton.style = `background-color:${tileColor}; border-color:${tileColor}`

                
            },interval*index)
        })
        

        guessWordCount += 1;

        //If the guessWord matchs, alert message"Correct!".//
        if(currentWord === word){
            window.alert('Correct!')
        }
        
        //If guess more than 6 times and still not give the answer alert message and show the correct word//
        if(guessWord.length === 6){
            window.alert(`Sorry,you have no more guesses`);
            window.alert(`The word is ${word}.`);
        }

        guessWord.push([]);
    }

//Set a array to save the letters put//
    function getCurrentWordArray(){
        const numberOfGuessedWords = guessWord.length
        return guessWord[numberOfGuessedWords - 1]
    }

//
    function updateGuessedWords(key){
        const currentWordArray = getCurrentWordArray()
        //If the words the array is less than 5 keep update letters until 5letters//
        if(currentWordArray && currentWordArray.length < 5){
            currentWordArray.push(key)

            //Put the data-key value to Id//
            const aviableSpaceElement = document.getElementById(`${aviableSpace}`);
            aviableSpace = aviableSpace + 1;
            aviableSpaceElement.textContent = key;
        }
    }

// 
})



