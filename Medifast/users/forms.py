from django import forms
from .models import Account
from django.conf import settings
from authy.api import AuthyApiClient

authy_api = AuthyApiClient(settings.ACCOUNT_SECURITY_API_KEY)

class BootstrapInput(forms.TextInput):
    def __init__(self, placeholder, size=12, *args, **kwargs):
        self.size = size
        super(BootstrapInput, self).__init__(attrs={
            'class': 'form-control input-sm',
            'placeholder': placeholder
        })


class TokenVerificationForm(forms.Form):
    token = forms.CharField(
        required=True,
        widget=BootstrapInput('Token via SMS, Voice or SoftToken')
    )

    def is_valid(self, authy_id):
        self.authy_id = authy_id
        return super(TokenVerificationForm, self).is_valid()

    def clean(self):
        token = self.cleaned_data['token']
        verification = authy_api.tokens.verify(self.authy_id, token)
        if not verification.ok():
            self.add_error('token', 'Invalid token')