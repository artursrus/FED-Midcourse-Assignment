// Api KEY = 0hmDrXG1OUselhJqNDT5Jg==31C3PNP5j2D66iM2
const displayExercises = document.querySelector('#displayExercises')
const getExercises = async (back) => {
    const urlAPI = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/back?limit=10`;
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
            console.log(exercise.name);
            //Creating html elements 
            const exerciseDiv = document.createElement('div')
            const exerciseGif = document.createElement('img')

            //Putting API information into html elements
            exerciseDiv.innerHTML += exercise.name;
            exerciseGif.src = exercise.gifUrl;

            //Appending so that image is in the div container
            displayExercises.appendChild(exerciseDiv)
            displayExercises.appendChild(exerciseGif)
            exerciseDiv.appendChild(exerciseGif)

            exerciseDiv.classList.add('exercises')
            exerciseDiv.setAttribute('id', index)
            console.log(index)
        });

        console.log(result)

    }

    
}

getExercises();