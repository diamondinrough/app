from rest_framework.permissions import BasePermission

class IsAuthenticatedOrOptions(BasePermission):
    message = 'You are not authenticated.'

    def has_permission(self, request, view):
        return (request.method == 'OPTIONS' or (request.user and request.user.is_authenticated()))
