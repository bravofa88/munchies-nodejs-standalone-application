const fs = require('fs');
const axios = require('axios');
const chalkModule = require('chalk');

//does the API call and stores the query,
const getProduct = function (food) {
    //fetch me my data
    askNinja(food, (error, data) => {
        console.log(data)

        //fetch queries and find duplicates in array.
        const queries = loadQueries();
        const duplicates = queries.find(query => query.food === food);

        if(!duplicates){
            queries.push({
                food: food,
                items: data
            });
            saveQueries(queries);
            console.log(chalkModule.green("New query added."));
        }else {
            console.log(chalkModule.yellowBright('You have done that query before, stop wasting API calls. run "list" and read '));
        }
    });

}


const removeProduct = function (food) {
    const queries = loadQueries();
    const queriesToKeep = queries.filter(query => query.food !== food);

    //The thing to keep group is going to be smaller than the group that came in.
    if(queries.length > queriesToKeep.length ){
        console.log(chalkModule.green('Query was removed from list'));
        saveQueries(queriesToKeep);
    }else {
        console.log(chalkModule.redBright('Food was not found, could not remove.'));
    }

}

const showProducts = function() {
    const listOfQuerries = loadQueries();
    console.log(chalkModule.yellowBright.underline("Query history"));
    listOfQuerries.forEach(query => console.log(query.food));
}

const readProduct = function (food) {
    const querries = loadQueries();
    const found = querries.find(query => query.food === food);

    if(found) {
        console.log(chalkModule.yellowBright(found.food));
        console.log(found.items);
    }else {
        console.log(chalkModule.red("Query not found in history, make a 'GET'"));
    }
}



//This functions not exposed.

//This function will do Asynchronous API request
const askNinja = (apiCall, callback) => {
        ///Key removed for security.
        const config = {'X-Api-Key': '****************************'};
        const url = `https://api.calorieninjas.com/v1/nutrition?query=${apiCall}`;
        axios.get(url, {headers: config}).catch((error) => {
                if(error){
                    callback("oops something went wrong with API call.", undefined);
                }
        }).then((res) => {
                callback(undefined, res.data.items);
        });
}

const saveQueries = (queries) => {
    //JSON! create now!
    const dataJSON = JSON.stringify(queries);
    fs.writeFileSync('query.json', dataJSON);
}


const loadQueries = () => {
    try{
        //comes in a buffer convert!
        const dataBuffer = fs.readFileSync('query.json');
        //now it's JSON. return as JS object.
        const quires = dataBuffer.toString();
        return JSON.parse(quires);
    }catch (e) {
        return []
    }
}


module.exports = {  getProduct,
                    showProducts,
                    removeProduct,
                    readProduct}
