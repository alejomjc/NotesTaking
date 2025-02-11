import json

from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

from .models import Note
from .serializers import NoteSerializer
from rest_framework.permissions import AllowAny

User = get_user_model()


class NoteUpdateView(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]
    queryset = Note.objects.all()

    def get_queryset(self):
        return Note.objects.filter(user=User.objects.first())


class NoteListView(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Note.objects.all()


@method_decorator(csrf_exempt, name='dispatch')
class CreateNoteView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)

            title = data.get("title", "")
            content = data.get("content", "")
            category = data.get("category", "Random Thoughts")

            if not title:
                return JsonResponse({"error": "Title is required"}, status=400)

            note = Note.objects.create(
                title=title,
                content=content,
                category=category,
            )

            return JsonResponse({"message": "Note created", "id": note.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class UpdateNoteView(View):
    def put(self, request, pk):
        try:
            data = json.loads(request.body)

            title = data.get("title", "").strip()
            content = data.get("content", "").strip()
            category = data.get("category", "").strip()

            if not title:
                return JsonResponse({"error": "Title is required"}, status=400)

            try:
                note = Note.objects.get(id=pk)
            except Note.DoesNotExist:
                return JsonResponse({"error": "Note not found or access denied"}, status=404)

            note.title = title
            note.content = content
            note.category = category
            note.save()

            return JsonResponse({"message": "Note updated successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@method_decorator(csrf_exempt, name="dispatch")
class NoteDeleteView(View):
    def delete(self, request, pk, *args, **kwargs):
        try:
            note = Note.objects.filter(id=pk).first()

            if not note:
                return JsonResponse({"error": "Nota no encontrada"}, status=404)

            note.delete()
            return JsonResponse({"message": "Nota eliminada correctamente"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
