from django.urls import path
from rest_framework import routers

from cs_go_site import views
urlpatterns = [
    path(r'market/', views.index),
    path(r'comment/', views.index),
    path(r'help/', views.index),
    path(r'history/', views.index),
    path(r'account/', views.index),
    path(r'api/owner/', views.Owner.as_view()),
    path(r'api/comments/', views.CommentV.as_view()),
    path(r'api/history/', views.HistoryV.as_view()),
    path(r'api/trade_url/', views.TradeUrl.as_view()),
    path(r'api/storage/', views.Storage.as_view()),
    path(r'api/send-tech-help/', views.SendTechHelp.as_view()),
    path(r'', views.index),
]
# urlpatterns += router.urls
