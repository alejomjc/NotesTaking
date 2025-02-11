from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from django.middleware.csrf import get_token
from .models import CustomUser
from .serializers import UserSerializer

User = get_user_model()

class UserRegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

def get_csrf_token(request):
    response = JsonResponse({"csrfToken": get_token(request)})
    response["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000"
    response["Access-Control-Allow-Credentials"] = "true"
    return response

@permission_classes([AllowAny])
@api_view(["POST"])
def login_view(request):
    email = request.data.get("username")
    password = request.data.get("password")

    if not email or not password:
        return Response({"message": "Email and password are required"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"message": "Invalid credentials"}, status=400)

    authenticated_user = authenticate(username=user.username, password=password)

    if authenticated_user:
        login(request, user)
        token, created = Token.objects.get_or_create(user=authenticated_user)

        return Response({
            "message": "Login successful",
            "user": UserSerializer(authenticated_user).data,
            "token": token.key
        })

    return Response({"message": "Invalid credentials"}, status=400)

@api_view(["POST"])
def logout_view(request):
    try:
        Token.objects.all()
        logout(request)

        return Response({"message": "Logout successful"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)