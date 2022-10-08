const { default: axios } = require("axios");

function VisitorAPI(projectId, successHandler, failureHandler){
    if(typeof(successHandler) === "undefined" && typeof(failureHandler) === "undefined"){
        return new Promise(function(resolve, reject){
            axios({
                method: 'get',
                url: 'https://api.visitorapi.com/api/?pid='+projectId,
            }).then(function(response){
                resolve(response.data.data);
            }).catch(function(error){
                if(error.response && error.response.data && error.response.data.result){
                    reject(error.response.data.result);
                }else{
                    reject(error);
                }
            })
        })
    }else{
        axios({
            method: 'get',
            url: 'https://api.visitorapi.com/api/?pid='+projectId,
        }).then(function(response){
            if(typeof(successHandler) === 'function'){
                successHandler(response.data.data);
            }
        }).catch(function(error){
            if(typeof(failureHandler) === 'function'){
                failureHandler(error);
            }
        });
    }
}

module.exports = VisitorAPI;