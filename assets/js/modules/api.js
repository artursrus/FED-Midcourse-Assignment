const displayExercises = document.querySelector('#displayExercises')

let collectedExercise = "";

//Capitalise the first letter while leaving the rest of the string
let capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getExercises = async () => {
    const urlAPI = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=5`;
    const keyAPI = {
	    method: 'GET',
	    headers: {
            'X-RapidAPI-Key': 'be5c212be8msh814b96c66fae9d1p1031efjsnc5860e51a01f',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	    }
    };
    console.log(urlAPI)
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
                //Prevents load to a new page without getting exercise name
                event.preventDefault();
                collectedExercise = exerciseP.textContent.toLowerCase()
                window.location.href = `exerciseDescription.html?exercise=${collectedExercise}`;
            })
        });

        console.log(result)
        
    }

    
}

getExercises();


