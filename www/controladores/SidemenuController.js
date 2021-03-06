angular.module('starterMiApp.contrsSidemenu', [])

.controller('SidemenuCtrl', ['$scope', '$state','$ionicPopup','$ionicLoading','$ionicPopover','$ionicSideMenuDelegate','servLogout','servUsuario', function($scope, $state,$ionicPopup,$ionicLoading,$ionicPopover,$ionicSideMenuDelegate,servLogout,servUsuario){

  var idUsuario = localStorage.getItem("idUser");
  $scope.nombreUsuario = localStorage.getItem("nombreUser");
  
  servUsuario.listarUsuario(idUsuario).then(function(servResponse){
    
    if(servResponse==-1)
    {
      $state.go('login',null,{reload:true});
    }
    else
    {
      $scope.data1 = servResponse;
    }

  });

  var plantillaPopover = '<ion-popover-view style="height: 168px;">'+
    '<ion-content scroll="false">'+
        '<div class="list">'+
            '<a class="item item-icon-left" ng-click="ayuda()">'+
              '<i class="icon ion-help-circled"></i>'+
                'Ayuda'+
            '</a>'+
            '<a class="item item-icon-left" ng-click="acercaDe()">'+
              '<i class="icon ion-information-circled"></i>'+
                'Acerca de&hellip;'+
            '</a>'+
            '<a class="item item-icon-left" ng-click="cerrarSesion()">'+
              '<i class="icon ion-log-out"></i>'+
                'Cerrar sesión'+
            '</a>'+
        '</div>'+
    '</ion-content>'+
  '</ion-popover-view>';

  $scope.popover = $ionicPopover.fromTemplate(plantillaPopover, {
    scope: $scope
  });

   $scope.openPopover = function($event) {
    $scope.popover.show($event);
    document.body.classList.add('platform-ionic');
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.ayuda = function() {
    $scope.popover.hide();
    var alertPopup = $ionicPopup.alert({
     title: 'Ayuda',
     cssClass: 'tamanoPopup',
     templateUrl: 'plantillas/Moremenu/ayuda.html',
     okText: 'Ok', 
     okType: 'button-positive'
    });
  };


  $scope.acercaDe = function() {
    $scope.popover.hide();
    var alertPopup = $ionicPopup.alert({
     title: 'Acerca De...',
     cssClass: 'tamanoPopup',
     templateUrl: 'plantillas/Moremenu/acercaDe.html',
     okText: 'Ok', 
     okType: 'button-positive'
    });
  };

  $scope.cerrarSesion = function() {
      $scope.popover.hide();
      var myPopup = $ionicPopup.show({
      title: 'Salir',
      subTitle: '¿Estás seguro de que deseas salir de la aplicación?',
      buttons: [
        { text: '<b>No</b>',
          type: 'button-dark' 
        },
        {
          text: '<b>Sí</b>',
          type: 'button-positive',
          onTap: function(e) {
            $ionicLoading.show();
            if (e)//Pulsar Sí
            { 
              servLogout.cerrarSesion().then(function(data){
                localStorage.setItem("idUser",""); 
                localStorage.setItem("nombreUser","");
                $state.go('login',null,{reload:true});
              });   
            }
            else//Pulsar No
            {
              return; 
            }
          }
        }
      ]
    });
  }

  $scope.verPerfilUsuario = function()
  {
    $state.go('sidemenu.perfilUsuario',{'nombreUsuario' : $scope.nombreUsuario},{reload:false});
    $ionicSideMenuDelegate.toggleLeft(false);
  }
}]) // Fin SidemenuCtrl