from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from drf_yasg import openapi
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from django.conf.urls.static import static
from django.conf.urls import url

schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'', include('cs_go_site.urls')),
    path(r'accounts/', include('allauth.urls')),
    path(r'api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
