angular.module('starterMiApp.servsServicios', [])

.service('servServicios',['$q','$http', function($q,$http){
	return{
		nombreServicio: nameService,
    listarPerfilServicio: listProfileService,
    insertarServicio: addService 
	}

	function nameService(idSeccion)
	{
		var defered = $q.defer();
		var promesa = defered.promise;

		var url = "http://gestionestetica.fonotecaumh.es/Servicios/listarServicios.php";
        var data = {'idSeccion':idSeccion};
        var config = {
            headers : {'Content-Type' : 'application/json'}
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

  function listProfileService(idSeccion,nombreServicio)
  {
      var defered = $q.defer();
      var promesa = defered.promise;

      var url = "http://gestionestetica.fonotecaumh.es/Servicios/listarPerfilServicio.php";
      var data = {'idSeccion':idSeccion,'nombreServicio':nombreServicio};
      var config = {
          headers : {'Content-Type' : 'application/json'}
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

  function addService(datosForm)
  {
      var defered = $q.defer();
      var promesa = defered.promise;

      var url = "http://gestionestetica.fonotecaumh.es/Servicios/insertarServicios.php";
      var data = datosForm;
      var config = {
          headers : {'Content-Type' : 'application/json'}
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