from django.urls import path
from .views import CreateNoteView, UpdateNoteView, NoteListView, NoteDeleteView

urlpatterns = [
    path("all/", NoteListView.as_view(), name="all-notes"),
    path("create/", CreateNoteView.as_view(), name="create-note"),
    path("<int:pk>/", UpdateNoteView.as_view(), name="update-note"),
    path("delete/<int:pk>/", NoteDeleteView.as_view(), name="delete_note"),
]
