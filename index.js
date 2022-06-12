const { default: axios } = require("axios");

function VisitorAPI(projectId, successHandler, failureHandler){
    axios({
        method: 'get',
        url: 'https://api.visitorapi.com/api/?pid='+projectId,
    }).then(function(response){
        if(typeof(successHandler) === 'function'){
            successHandler(response);
        }
    }).catch(function(error){
        if(typeof(failureHandler) === 'function'){
            failureHandler(error);
        }
    });
}

module.exports = VisitorAPI;