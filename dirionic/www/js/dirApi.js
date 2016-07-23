

(function () {
        'use strict';
        var site = "http://54.152.36.188/";

        angular.module('starter').factory('dirApi', ['$http','$q',dirApi]);

        function dirApi($http,$q){


           // var articles = JSON.parse('[{"id":1,"title":"马云投资的魔漫相机创始人开课啦！","summary":"于是，他在2008年成立团队去做这件事 直到2013年魔漫相机才正式上线！ 经过五年时间的打磨 魔漫相机一上线 就立刻受到大家的热捧 几乎一夜之间爆红！！！这个被大众认为是现象级的应用 就在阿里巴巴上市前一天 对外宣称获得阿里千万美金融资！！！","image":"img/1.jpg"},{"id":2,"title":"t4月23日陆向谦创新创业课 嘉宾：王静（探路者联合创始人）","summary":"王静，探路者控股集团股份有限公司联合创始人、董事、产品研发技术总顾问、登山探险家，中国科学探险协会理事，阿拉善SEE生态协会理事。几十次雪山登顶及9次登顶海拔8000米以上的雪山（包括3次登顶珠峰），徒步到达过南、北两个极点；她是首位且全程无氧登顶努子峰的中国人。","image":"img/2.jpg"}]');

            var currentResourceId;

            function getResources(){
                var deferred = $q.defer();
                 $http.get(site + "api/app/resources/?format=json")
                      .success(function(data) {
                        console.log("Received data via HTTP call",data,status);
                       deferred.resolve(data);
                    })
                    .error(function(){
                        console.log("Error while making HTTP call");
                        deferred.reject();

                    });
                    return deferred.promise;
       
            }

            function getResourceData(){
                var deferred=$q.defer();
            
                 $http.get(site + "api/app/resources/" + currentResourceId + "/?format=json")
                      .success(function(data,status) {
                        console.log("Received data via HTTP call",data,status);
                       deferred.resolve(data);
                    })
                    .error(function(){
                        console.log("Error while making HTTP call");
                        deferred.reject();

                    });
                    return deferred.promise;
       
            };

            function setResourceId(resourceId){
                currentResourceId=resourceId;

            }

           

            return{
                getResources: getResources,
                getResourceData: getResourceData,
                setResourceId: setResourceId

            };
        };
})();