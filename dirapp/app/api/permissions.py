from rest_framework.permissions import BasePermission

class IsAuthenticatedOrOptions(BasePermission):
    message = 'You are not authenticated.'

    def has_permission(self, request, view):
        return (request.method == 'OPTIONS') or (request.user and request.user.is_authenticated())


class IsOwnerOrOptions(BasePermission):
    message = 'You are not the owner.'

    def has_permission(self, request, view):
        return (request.method == 'OPTIONS') or (request.user and request.user.is_authenticated())

    def has_object_permission(self, request, view, obj):
        return (request.method == 'OPTIONS') or (request.user and request.user.is_authenticated() and obj.poster == request.user)
