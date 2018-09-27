from django.shortcuts import render
from django.views.generic import View

class FrontendRenderView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "pages/front-end-render.html",{})