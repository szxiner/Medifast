from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
# from django.conf.urls import url
from django.urls import include, path
from . import consumers

websocket_urlpatterns = [
    # url(r'^ws/chat$', consumers.ChatConsumer),
    path('ws/chat/<sender>/<receiver>', consumers.ChatConsumer)
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
