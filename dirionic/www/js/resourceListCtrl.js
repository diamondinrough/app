(function () {
    'use strict';

    angular.module('starter').controller('resourceListCtrl', ['$state', 'dirApi', resourceListCtrl]);

    function resourceListCtrl($state, dirApi) {
        var vm = this;
        
        dirApi.getResources().then(function(data){
                    // vm.resources = data.resources;
                    vm.resources = data;

        });
        // vm.articles = articles;

       
        vm.selectResource = function(resourceId){
                //TODO: select correct league
                // dirApi.setResourceId(resourceId)
                $state.go("app.resource");
        };

    };
})();