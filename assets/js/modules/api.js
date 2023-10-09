// Api KEY = 0hmDrXG1OUselhJqNDT5Jg==31C3PNP5j2D66iM2

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
    const result = response.text();
    console.log(result);

    
}

getExercises();