// Uses the native fetch API instead of axios. axios >=1.x's package.json
// "exports" map only offers .cjs entry points for require() (both the
// "default" and "browser" conditions resolve to a .cjs file), but Create
// React App's Webpack config (react-scripts 5) only runs babel-loader on
// files matching /\.(js|mjs|jsx|ts|tsx)$/ — .cjs isn't in that list, so
// require("axios") silently falls through to the asset/resource loader and
// resolves to a static asset URL string instead of the module. There's no
// sanctioned axios subpath with a .js extension to work around this from
// the require() call site. Dropping axios entirely avoids this whole class
// of bundler/package-resolution problem, and fetch is supported in every
// browser this package targets (and in Node 18+, for direct/test usage).
function VisitorAPI(projectId, successHandler, failureHandler){
    var request = fetch('https://api.visitorapi.com/api/?pid='+projectId)
        .then(function(response){
            return response.json().then(function(body){
                if(!response.ok){
                    var error = new Error('VisitorAPI request failed with status ' + response.status);
                    error.response = { status: response.status, data: body };
                    throw error;
                }
                return body.data;
            });
        });

    if(typeof(successHandler) === "undefined" && typeof(failureHandler) === "undefined"){
        return new Promise(function(resolve, reject){
            request.then(function(data){
                resolve(data);
            }).catch(function(error){
                if(error.response && error.response.data && error.response.data.result){
                    reject(error.response.data.result);
                }else{
                    reject(error);
                }
            })
        })
    }else{
        request.then(function(data){
            if(typeof(successHandler) === 'function'){
                successHandler(data);
            }
        }).catch(function(error){
            if(typeof(failureHandler) === 'function'){
                failureHandler(error);
            }
        });
    }
}

module.exports = VisitorAPI;
