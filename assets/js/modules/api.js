// Api KEY = 0hmDrXG1OUselhJqNDT5Jg==31C3PNP5j2D66iM2
const displayExercises = document.querySelector('#displayExercises')

let collectedExercise = "";

let capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const collectingInput = () => {
    console.log(collectedExercise)
}


const getExercises = async () => {
    const urlAPI = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest?limit=5`;
    const keyAPI = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': 'e39b19adabmsh7720ea05c21533bp124e55jsn9392d128b25d',
		    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	    }
    };

    const response = await fetch(urlAPI, keyAPI);
    const result = await response.json();

    //Checks the length of an object
    if (result.length > 0) {
        
        //For each object displays name in the html
        result.forEach((exercise, index ) => {


            //Creating html elements 
            const exerciseDiv = document.createElement('div')
            const exerciseGif = document.createElement('img')
            const exerciseP = document.createElement('p')
            const exerciseLink = document.createElement('a')

            //Capitalize first Letter
            const capitalizedExercise = capitalizeLetter(exercise.name)

            //Putting API information into html elements
            exerciseP.textContent = capitalizedExercise;
            exerciseGif.src = exercise.gifUrl;

            exerciseP.setAttribute('id', index)
            exerciseLink.href = "exerciseDescription.html"

            //Appending so that image is in the div container
            displayExercises.appendChild(exerciseLink)
            displayExercises.appendChild(exerciseDiv)
            displayExercises.appendChild(exerciseGif)
            displayExercises.appendChild(exerciseP)
            

            exerciseLink.appendChild(exerciseDiv)
            exerciseDiv.appendChild(exerciseP)
            exerciseDiv.appendChild(exerciseGif)


            //Adding class and id to exercises
            exerciseDiv.classList.add('exercises')
            exerciseDiv.setAttribute('id', index)
            console.log(index)
            
            exerciseLink.addEventListener('click', (event) => {
                event.preventDefault();
                collectedExercise = exerciseP.textContent.toLowerCase()
                collectingInput()
                window.location.href = `exerciseDescription.html?exercise=${collectedExercise}`;
            })
        });

        console.log(result)
        
    }

    
}

getExercises();


export {collectedExercise};
