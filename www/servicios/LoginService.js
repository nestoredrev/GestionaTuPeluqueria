angular.module('starterMiApp.servsLogin', [])


.service('servLogin',['$q','$http','baseURL', function($q, $http,baseURL){
    return{
        iniciarSesion: startSession
    }

    function startSession(datosForm)
    {
        var defered = $q.defer();
        var promesa = defered.promise;
        var url = baseURL+"Login.php";
        var data = datosForm;
        var config = {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
        }

        $http.post(url,data,config)
            .success(function(respuesta){
                defered.resolve(respuesta);
            })
            .error(function(err){
                defered.reject(err);
            });
        return promesa;
    }

}])

.service('servLogout', ['$q','$http', 'baseURL', function($q, $http, baseURL){

    return{
        cerrarSesion:closeSession
    }

    function closeSession()
    {
        var defered = $q.defer();
        var promesa = defered.promise;

        var url = baseURL+"Logout.php";
        var data = null;
        var config = {
            headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
        }

        $http.post(url,data,config)
            .success(function(response){
                defered.resolve(response);
            })
            .error(function(err){
                defered.reject(err);
            });
        return promesa;
    }
    
}])