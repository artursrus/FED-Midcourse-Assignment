const urlParams = new URLSearchParams(window.location.search);
const collectedExercise = urlParams.get('exercise');
const exerciseCard = document.querySelector('#exerciseCard')

let capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    
const exerciseDescription = async () => {
    //Replaces spaces with characters for API exercise call
    const replacedSpaces = collectedExercise.replace(/\s+/g,"%20");
    console.log(replacedSpaces)

    const urlAPI = `https://exercisedb.p.rapidapi.com/exercises/name/${replacedSpaces}?imit=10`;
    const keyAPI = {
	    method: 'GET',
	    headers: {
            'X-RapidAPI-Key': 'be5c212be8msh814b96c66fae9d1p1031efjsnc5860e51a01f',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	    }
    };

    const response = await fetch(urlAPI, keyAPI);
    const result = await response.json();
    console.log(result)

    //Gets data from the object that is inside the array
    if(Array.isArray(result) && result.length > 0) {

        const exerciseObject = result[0]
        const capitalizedExercise = capitalizeLetter(exerciseObject.name)
        const capitalizedMuscle = capitalizeLetter(exerciseObject.bodyPart)
        const capitalizedEquipment = capitalizeLetter(exerciseObject.equipment)
        const capitalizedTarget = capitalizeLetter(exerciseObject.target)
            
        const exerciseDescriptiondDiv = document.createElement('div')
        const exerciseDescriptionh2 = document.createElement('h2')
        const exerciseDescriptionGif = document.createElement('img')

        exerciseDescriptionh2.textContent = capitalizedExercise;
        exerciseDescriptionGif.src = exerciseObject.gifUrl
        

        exerciseCard.appendChild(exerciseDescriptiondDiv)
        exerciseCard.appendChild(exerciseDescriptionh2)
        exerciseCard.appendChild(exerciseDescriptionGif)
        
        exerciseDescriptiondDiv.appendChild(exerciseDescriptionGif)
        exerciseDescriptiondDiv.appendChild(exerciseDescriptionh2)
        
        //Gets instructions from the array
        if (Array.isArray(exerciseObject.instructions)) {
            //For each index of array make paragraph and display it
            exerciseObject.instructions.forEach((instructions) => {
            const exerciseInstructions = document.createElement('p');
            exerciseInstructions.textContent = instructions; 
            exerciseCard.appendChild(exerciseInstructions);
            exerciseDescriptiondDiv.appendChild(exerciseInstructions)
            });
        }

        

        const exerciseMuscle = document.createElement('p')
        const exerciseEquipment = document.createElement('p')
        const exerciseTarget = document.createElement('p')

        exerciseMuscle.textContent = `Muscle: ${capitalizedMuscle}`
        exerciseTarget.textContent = `Target: ${capitalizedTarget}`
        exerciseEquipment.textContent =`Equipment: ${capitalizedEquipment}`


        exerciseCard.appendChild(exerciseMuscle)
        exerciseCard.appendChild(exerciseEquipment)
        exerciseCard.appendChild(exerciseTarget)

        exerciseDescriptiondDiv.appendChild(exerciseMuscle)
        exerciseDescriptiondDiv.appendChild(exerciseEquipment)
        exerciseDescriptiondDiv.appendChild(exerciseTarget)

        exerciseDescriptiondDiv.setAttribute('id' , 'exercise')

    }
}


exerciseDescription();