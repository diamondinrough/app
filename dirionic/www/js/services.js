var site = "http://54.152.36.188/";

angular.module('starter.services', [])

.service("TagPopupSvc", [function() {
    this.tagPopup = function($scope) {
        return {
            template: 
               '<style> \
                    .item-checkbox-right .checkbox input, .item-checkbox-right .checkbox-icon { \
                        float: right; \
                    } \
                    .item-checkbox.item-checkbox-right { \
                        padding: 15px; \
                    } \
                </style> \
                <ion-checkbox ng-repeat="tag in taglist" ng-model="tag.checked" ng-checked="tag.checked" \
                class="item-checkbox-right"> \
                <p style="color: {{tag.color}};">{{tag.name}}</p> \
                </ion-checkbox>'
            ,
            title: 'Tags',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Reset</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        for (i = 0; i < $scope.taglist.length; i++) {
                            $scope.taglist[i].checked = false;
                        }
                        $scope.reload();
                    }
                },
                {
                    text: '<b>Done</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.reload();   
                    }
                }
            ]
        };
    }
}])

.service("CommentPopupSvc", function(ArticleSvc, VideoSvc) {
    this.commentcreate = function($scope, id, type) {
        return {
            template: '<textarea type=text rows="5" ng-model="input.text">',
            title: 'Enter comment',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-assertive',
                    onTap: function(e) {
                        $scope.input.text = "";
                    }
                },
                {
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (type == 'article') ArticleSvc.submitComment(id, $scope.input.text);
                        else if (type == 'video') VideoSvc.submitComment(id, $scope.input.text);
                        else console.error('Unknown type: ' + type);
                        $scope.input.text = "";
                    }
                }
            ]
        };
    }
    this.replycreate = function($scope, parent, id, type) {
        return {
            template: '<textarea type=text rows="5" ng-model="input.text">',
            title: 'Enter comment',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-assertive',
                    onTap: function(e) {
                        $scope.input.text = "";
                    }
                },
                {
                    text: 'Submit',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (type == 'article') ArticleSvc.submitReply(id, $scope.input.text, parent);
                        else if (type == 'video') VideoSvc.submitReply(id, $scope.input.text, parent);
                        else console.error('Unknown type: ' + type);
                        $scope.input.text = "";
                    }
                }
            ]
        };
    }
    this.commentdelete = function($scope, comment_id, id, type) {
        return {
            title: 'Delete Comment',
            template: 'Are you sure you want to delete this comment?',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-stable'
                },
                {
                    text: 'Yes',
                    type: 'button-assertive',
                    onTap: function(e) {
                        if (type == 'article') ArticleSvc.deleteComment(id, comment_id);
                        else if (type == 'video') VideoSvc.deleteComment(id, comment_id);
                        else console.error('Unknown type: ' + type);
                    }
                }
            ]
        }
    }
    this.replydelete = function($scope, reply_id, id, type) {
        return {
            title: 'Delete Comment',
            template: 'Are you sure you want to delete this comment?',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-stable'
                },
                {
                    text: 'Yes',
                    type: 'button-assertive',
                    onTap: function(e) {
                        if (type == 'article') ArticleSvc.deleteReply(id, comment_id);
                        else if (type == 'video') VideoSvc.deleteReply(id, comment_id);
                        else console.error('Unknown type: ' + type);
                    }
                }
            ]
        }
    }
})

.service("TeamPopupSvc", function(TeamSvc, $ionicHistory) {
    this.joinTeam = function(id) {
        return {
            title: 'Join Team?',
            buttons: [
                {
                    text: 'No',
                    type: 'button-stable'
                },
                {
                    text: 'Yes',
                    type: 'button-assertive',
                    onTap: function(e) {
                        TeamSvc.joinTeam(id);
                    }
                }
            ]
        }
    }

    this.leaveTeam = function($scope, id, leader, members) {
        if (!leader || (leader && members == 1)) {
            return {
                title: 'Leave Team?',
                buttons: [
                    {
                        text: 'No',
                        type: 'button-stable'
                    },
                    {
                        text: 'Yes',
                        type: 'button-assertive',
                        onTap: function(e) {
                            TeamSvc.leaveTeam(id, false, null);
                            //$ionicHistory.goBack();
                        }
                    }
                ]
            }
        } else {
            return {
                title: 'Leave Team?',
                template: 
                   '<div class="list"> \
                   <label class="item item-input item-select"> \
                   <div class="input-label"> \
                   New Leader \
                   </div> \
                   <select ng-options="member.info.fullname disable when (member.username==currentuser) for member in team.members track by member.username" ng-model="newleader.user"> \
                   </select> \
                   </label> \
                   </div>'
                ,
                scope: $scope,
                buttons: [
                    {
                        text: 'No',
                        type: 'button-stable'
                    },
                    {
                        text: 'Yes',
                        type: 'button-assertive',
                        onTap: function(e) {
                            if ($scope.newleader.user.username) TeamSvc.leaveTeam(id, true, $scope.newleader.user.username);
                            //$ionicHistory.goBack();
                        }
                    }
                ]
            }
        }
    }

    this.changeLeader = function($scope, id) {
        return {
            title: 'Change Leader',
            template: 
               '<div class="list"> \
               <label class="item item-input item-select"> \
               <div class="input-label"> \
               New Leader \
               </div> \
               <select ng-options="member.info.fullname disable when (member.username==currentuser) for member in team.members track by member.username" ng-model="changeleader.user"> \
               </select> \
               </label> \
               </div>'
            ,
            scope: $scope,
            buttons: [
                {
                    text: 'No',
                    type: 'button-stable'
                },
                {
                    text: 'Yes',
                    type: 'button-assertive',
                    onTap: function(e) {
                        console.log($scope.changeleader.user);
                        if ($scope.changeleader.user.username) TeamSvc.changeLeader(id, $scope.changeleader.user.username);
                    }
                }
            ]
        }
    }

    this.teamOptions = function($scope) {
        return {
            title: 'Team Options',
            template:
                '<div class="list"> \
                <button ng-if="team.leader.username == currentuser" class="button button-block button-energized" ng-click="newTask()"> \
                New Task \
                </button> \
                <button ng-if="team.leader.username == currentuser" class="button button-block button-royal" ng-click="changeLeader()"> \
                Change Leader \
                </button> \
                <button ng-if="inteam" class="button button-block button-assertive" ng-click="leaveTeam()"> \
                Leave Team \
                </button> \
                <button ng-if="!inteam" class="button button-block button-positive" ng-click="joinTeam()"> \
                Join Team \
                </button>'
            ,
            scope: $scope,
            buttons: [
                {
                    text: 'Close',
                    type: 'button-stable'
                }
            ]
        }
    }
})

.service("TaskPopupSvc", function() {
    this.chooseLeader = function($scope) {
        return {
            title: 'Choose Leader',
            template: 
               '<div class="list"> \
               <label class="item item-input item-select"> \
               <div class="input-label"> \
               Task Leader \
               </div> \
               <select ng-options="member.info.fullname for member in teammembers track by member.username" ng-model="chooseleader.user"> \
               </select> \
               </label> \
               </div>'
            ,
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel',
                    type: 'button-stable'
                },
                {
                    text: 'Yes',
                    type: 'button-assertive',
                    onTap: function(e) {
                        if ($scope.chooseleader.user.username) $scope.task.leader = $scope.chooseleader.user.username;
                    }
                }
            ]
        }
    }

    this.chooseMembers = function($scope) {
        return {
            template: 
               '<style> \
                    .item-checkbox-right .checkbox input, .item-checkbox-right .checkbox-icon { \
                        float: right; \
                    } \
                    .item-checkbox.item-checkbox-right { \
                        padding: 15px; \
                    } \
                </style> \
                <div ng-if="task.leader"> \
                <ion-checkbox ng-repeat="member in teammembers" ng-if="member.username != task.leader" ng-model="member.checked" ng-checked="member.checked" \
                class="item-checkbox-right"> \
                <p>{{member.info.fullname}}</p> \
                </ion-checkbox> \
                </div> \
                <div ng-if="!task.leader"> \
                <p>Please choose a leader.</p> \
                </div>'
            ,
            title: 'Choose Additional Members',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Reset</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        for (i = 0; i < $scope.teammembers.length; i++) {
                            $scope.teammembers[i].checked = false;
                        }
                    }
                },
                {
                    text: '<b>Done</b>',
                    type: 'button-positive'
                }
            ]
        };
    }

})

.service("AuthSvc", function($http, $rootScope) {
    var token = null;
    var isAuthenticated = false;
    var username = null;

    this.authorize = function(user) {
        $http.post(site + "api/app/user/auth/", user)
        .success(function(data) {
            token = data["token"];
            isAuthenticated = true;
            username = user.username;
            $http.defaults.headers.common.Authorization = "Token " + token;
            $rootScope.$broadcast("authorize-success");
        })
        .error(function(data) {
            $rootScope.$broadcast("authorize-error", data);
        })
    }

    this.unauthorize = function() {
        token = null;
        isAuthenticated = false;
        username = null;
        $http.defaults.headers.common.Authorization = undefined;
        $rootScope.$broadcast("unauthorize-success");
    }

    this.authenticated = function() {
        return isAuthenticated;
    }

    this.currentuser = function() {
        return username;
    }
})

.service("UserSvc", function($http, $rootScope) {
    this.loadUser = function(username, bcast) {
        $http.get(site + "api/app/users/" + username + "/")
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        });
    }

    this.register = function(user) {
        $http.post(site + "api/app/user/register/", user)
        .success(function(data) {
            $rootScope.$broadcast("user-register-success");
        })
        .error(function(data) {
            $rootScope.$broadcast("user-register-error", data);
        })
    }
})

.service("UserProfileSvc", function($http, $rootScope) {
    this.loadProfile = function(bcast) {
        $http.get(site + "api/app/user/profile/")
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        });
    }

    this.updateProfile = function(user) {
        $http.put(site + "api/app/user/update/", user)
        .success(function() {
            $rootScope.$broadcast("user-update-success")
        })
        .error(function(data) {
            $rootScope.$broadcast("user-update-error", data)
        });
    }
})

.service("IndexSlideSvc", function($http, $rootScope, $ionicLoading) {
    this.loadSlides = function() {
        $http.get(site + "api/app/index/slides/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("indexslides", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }
})

.service("ViewCountSvc", ["$http", function($http) {
    this.viewed = function(type, pk) {
        $http.put(site + "api/app/viewcount/", { type: type, pk: pk });
    }
}])

.service("TeamSvc", function($http, $rootScope, $ionicLoading) {
    this.newTeam = function(team) {
        $http.post(site + "api/app/teams/create/", team)
        .success(function() {
            $rootScope.$broadcast("team-create-success");
        })
        .error(function() {
            $rootScope.$broadcast("team-create-fail");
        });
    }

    this.loadTeam = function(id, bcast) {
        $http.get(site + "api/app/team/" + id + "/")
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        });
    }

    this.joinTeam = function(id) {
        $http.post(site + "api/app/team/" + id + "/join/")
        .success(function() {
            $ionicLoading.show({template: "Joined team!", duration: 1000});
            $rootScope.$broadcast("join-team-success");
        })
        .error(function() {
            $ionicLoading.show({template: "Failed to join team.", duration: 1000});
        });
    }

    this.leaveTeam = function(id, leader, newleader) {
        if (!leader) {
            $http.post(site + "api/app/team/" + id + "/leave/")
            .success(function() {
                $ionicLoading.show({template: "Left team!", duration: 1000});
                $rootScope.$broadcast("leave-team-success");
            })
            .error(function() {
                $ionicLoading.show({template: "Failed to leave team.", duration: 1000});
            });
        } else {
            $http.post(site + "api/app/team/" + id + "/leave/", {newleader:newleader})
            .success(function() {
                $ionicLoading.show({template: "Left team!", duration: 1000});
                $rootScope.$broadcast("leave-team-success");
            })
            .error(function() {
                $ionicLoading.show({template: "Failed to leave team.", duration: 1000});
            });
        }
    }

    this.changeLeader = function(id, newleader) {
        $http.post(site + "api/app/team/" + id + "/leader/", {newleader:newleader})
        .success(function() {
            $ionicLoading.show({template: "Changed leader!", duration: 1000});
            $rootScope.$broadcast("change-leader-team-success");
        })
        .error(function() {
            $ionicLoading.show({template: "Failed to change leader.", duration: 1000});
        });
    }
})

.service("TeamListSvc", function($http, $rootScope, $ionicLoading) {
    this.loadTeams = function(bcast) {
        $http.get(site + "api/app/teams/")
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }
})

.service("TaskSvc", function($http, $rootScope, $ionicLoading) {
    this.loadTasks = function(team, bcast) {
        params = {team:""};
        if (team != null) {
            params['team'] = encodeURI(team);
        }
        $http.get(site + "api/app/tasks/?" + params.team)
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        });
    }

    this.createTask = function(task) {
        $http.post(site + "api/app/tasks/create/", task)
        .success(function() {
            $ionicLoading.show({template: "Task created!", duration: 1000});
            $rootScope.$broadcast("task-create-success");
        })
        .error(function(data) {
            console.log('TASK ERROR:\n' + data);
            $ionicLoading.show({template: "Failed to create task.", duration: 1000});
        });
    }
})

.service("IndexSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadItems = function(taglist, searches, next, bcast) {
        if (next == null) {
            params = { format: "json" };
            activetags = "";
            if (taglist != null) {
                for (i = 0; i < taglist.length; i++) {
                    if (taglist[i].checked) {
                        activetags = activetags.concat(taglist[i].name + ",");
                    }
                }
            }
            if (activetags != "") {
                activetags = activetags.substr(0, activetags.length-1);
                console.log(activetags);
                params['tags'] = activetags;
            }
            if (searches != null) {
                search = searches.split(" ").join([separator = ","]);
                params['search'] = search;
            }
            $http.get(site + "api/app/index/", { params: params })
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                $ionicLoading.hide();
            });
        } else {
            $http.get(next)
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                console.error("Failed to load index list from " + next);
                $ionicLoading.hide();
            });
        }
        /*
        $http.get(site + "api/app/index/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("index", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });*/
    }
}])

.service("IndexArticleSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadArticle = function() {
        $http.get(site + "api/app/articles/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("index-article", data);
        });
    }
}])

.service("IndexVideoSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadVideo = function() {
        $http.get(site + "api/app/videos/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("index-video", data);
            console.log('loaded index video');
        });
    }
}])

.service("IndexResourceSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadResource = function() {
        $http.get(site + "api/app/resources/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("index-resource", data);
        });
    }
}])

.service("TagListSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadTags = function() {
        $http.get(site + "api/app/tags/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("taglist", data)
        })
        .error(function() {
            console.error("Failed to load tags from " + site  + "api/app/tags/?format=json");
        });
    }
}])

.service("ArticleListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadArticles = function(taglist, searches, next, bcast) {
        if (next == null) {
            params = { format: "json" };
            activetags = "";
            if (taglist != null) {
                for (i = 0; i < taglist.length; i++) {
                    if (taglist[i].checked) {
                        activetags = activetags.concat(taglist[i].name + ",");
                    }
                }
            }
            if (activetags != "") {
                activetags = activetags.substr(0, activetags.length-1);
                console.log(activetags);
                params['tags'] = activetags;
            }
            if (searches != null) {
                search = searches.split(" ").join([separator = ","]);
                params['search'] = search;
            }
            $http.get(site + "api/app/articles/", { params: params })
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                $ionicLoading.hide();
            });
        } else {
            $http.get(next)
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                console.error("Failed to load article list from " + next);
                $ionicLoading.hide();
            });
        }
    }
}])

.service("ArticleSvc", function($http, $rootScope, $ionicLoading) {
    this.loadArticle = function(id, bcast) {
        $http.get(site + "api/app/article/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        });
    }

    this.newArticle = function(article, taglist) {
        tags = [];
        if (taglist != null) {
            for (i = 0; i < taglist.length; i++) {
                if (taglist[i].checked) {
                    tags.push(taglist[i].name);
                }
            }
        }
        article["tags"] = tags;
        $http.post(site + "api/app/articles/create/", article)
        .success(function() {
            $rootScope.$broadcast("article-submit-success");
        })
        .error(function(data) {
            $rootScope.$broadcast("article-submit-error", data);
        });
    }

    this.submitComment = function(id, text) {
        $http.post(site + "api/app/article/" + id + "/comment/create/", {text: text, object_id: id})
        .success(function(data) {
            $rootScope.$broadcast("article-comment-create-success", data);
            $ionicLoading.show({template:"Comment success!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("article-comment-create-error");
            $ionicLoading.show({template:"Comment failed.", duration:1000});
        })
    }

    this.submitReply = function(id, text, parent) {
        $http.post(site + "api/app/article/" + id + "/reply/create/", {text: text, object_id: id, parent: parent})
        .success(function(data) {
            $rootScope.$broadcast("article-reply-create-success", data);
            $ionicLoading.show({template:"Comment success!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("article-reply-create-error");
            $ionicLoading.show({template:"Comment failed.", duration:1000});
        })
    }

    this.deleteComment = function(id, comment_id) {
        $http.delete(site + "api/app/article/" + id + "/comment/delete/" + comment_id + "/")
        .success(function() {
            $rootScope.$broadcast("article-comment-delete-success");
            $ionicLoading.show({template:"Comment removed!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("article-comment-delete-error");
            $ionicLoading.show({template:"Failed to remove comment.", duration:1000});
        })
    }

    this.deleteReply = function(id, reply_id) {
        $http.delete(site + "api/app/article/" + id + "/comment/delete/" + reply_id + "/")
        .success(function() {
            $rootScope.$broadcast("article-reply-delete-success");
            $ionicLoading.show({template:"Comment removed!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("article-reply-delete-error");
            $ionicLoading.show({template:"Failed to remove comment.", duration:1000});
        })
    }
})

.service("VideoListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadVideos = function(taglist, searches, next, bcast) {
        if (next == null) {
            params = { format: "json" };
            activetags = "";
            if (taglist != null) {
                for (i = 0; i < taglist.length; i++) {
                    if (taglist[i].checked) {
                        activetags = activetags.concat(taglist[i].name + ",");
                    }
                }
            }
            if (activetags != "") {
                activetags = activetags.substr(0, activetags.length-1);
                console.log(activetags);
                params['tags'] = activetags;
            }
            if (searches != null) {
                search = searches.split(" ").join([separator = ","]);
                params['search'] = search;
            }
            $http.get(site + "api/app/videos/", { params: params })
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                $ionicLoading.hide();
            });
        } else {
            $http.get(next)
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                console.error("Failed to load video list from " + next);
                $ionicLoading.hide();
            });
        }
    }
}])

.service("VideoSvc", function($http, $rootScope, $ionicLoading) {
    this.loadVideo = function(id, bcast) {
        $http.get(site + "api/app/video/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        });
    }

    this.newVideo = function(video, taglist) {
        tags = [];
        if (taglist != null) {
            for (i = 0; i < taglist.length; i++) {
                if (taglist[i].checked) {
                    tags.push(taglist[i].name);
                }
            }
        }
        video["tags"] = tags;
        $http.post(site + "api/app/videos/create/", video)
        .success(function() {
            $rootScope.$broadcast("video-submit-success");
        })
        .error(function(data) {
            $rootScope.$broadcast("video-submit-error", data);
        });
    }


    this.submitComment = function(id, text) {
        $http.post(site + "api/app/video/" + id + "/comment/create/", {text: text, object_id: id})
        .success(function(data) {
            $rootScope.$broadcast("video-comment-create-success", data);
            $ionicLoading.show({template:"Comment success!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("video-comment-create-error");
            $ionicLoading.show({template:"Comment failed.", duration:1000});
        })
    }

    this.submitReply = function(id, text, parent) {
        $http.post(site + "api/app/video/" + id + "/reply/create/", {text: text, object_id: id, parent: parent})
        .success(function(data) {
            $rootScope.$broadcast("video-reply-create-success", data);
            $ionicLoading.show({template:"Comment success!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("video-reply-create-error");
            $ionicLoading.show({template:"Comment failed.", duration:1000});
        })
    }

    this.deleteComment = function(id, comment_id) {
        $http.delete(site + "api/app/video/" + id + "/comment/delete/" + comment_id + "/")
        .success(function() {
            $rootScope.$broadcast("video-comment-delete-success");
            $ionicLoading.show({template:"Comment removed!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("video-comment-delete-error");
            $ionicLoading.show({template:"Failed to remove comment.", duration:1000});
        })
    }

    this.deleteReply = function(id, reply_id) {
        $http.delete(site + "api/app/video/" + id + "/comment/delete/" + reply_id + "/")
        .success(function() {
            $rootScope.$broadcast("video-reply-delete-success");
            $ionicLoading.show({template:"Comment removed!", duration:1000});
        })
        .error(function() {
            $rootScope.$broadcast("video-reply-delete-error");
            $ionicLoading.show({template:"Failed to remove comment.", duration:1000});
        })
    }
})

.service("ResourceListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadResources = function() {
        $http.get(site + "api/app/resources/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("resourcelist", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }


    
}])

.service("ResourceSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadResource = function(id) {
        $http.get(site + "api/app/resources/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("resource", data);
        });
    }
}])

.service("UserListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadUsers = function(bcast) {
        $http.get(site + "api/app/users/?format=json")
        .success(function(data) {
            $rootScope.$broadcast(bcast, data);
        })
        .error(function() {
            $ionicLoading.hide();
        })
    }
}])

.service("HelpListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadHelpList = function(faq, next, bcast) {
        if (next == null) {
            params = { format: "json" };
            if (faq) {
                params["faq"] = "";
            }
            $http.get(site + "api/app/help/", { params: params })
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                $ionicLoading.hide();
            });
        } else {
            $http.get(next)
            .success(function(data) {
                $rootScope.$broadcast(bcast, data);
            })
            .error(function() {
                $ionicLoading.hide();
            })
        }
    }
}])

.service("HelpSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadHelp = function(id) {
        $http.get(site + "api/app/help/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("question", data);
        });
    }
}])

.service("FeedbackSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.post = function(data) {
        console.log(data);
        $http.post(site + "api/app/feedback/", data)
        .success(function(data) {
            $rootScope.$broadcast("feedback-success");
        })
        .error(function(data) {
            $rootScope.$broadcast("feedback-error");
        });
    }
}]);
