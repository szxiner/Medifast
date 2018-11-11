
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from chat.models.user import User
from chat.models.message import Message


class ChatConsumer(WebsocketConsumer):

    def init_chat(self, data):
        username = data['username']
        user, created = User.objects.get_or_create(username=username)
        content = {
            'command': 'init_chat'
        }
        if not user:
            content['error'] = 'Unable to get or create User with username: ' + username
            self.send_message(content)
        content['success'] = 'Chatting in with success with username: ' + username
        self.send_message(content)

    def fetch_messages(self, data):
        sender = data['username']['sender']
        receiver = data['username']['receiver']
        if sender >= receiver:
            room_name = 'room_' + sender + '_' + receiver
        else:
            room_name = 'room_' + receiver + '_' + sender

        messages = Message.last_50_messages(room_name)
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        print(data['data'])
        text = data['data']['text']
        sender = data['data']['sender']
        receiver = data['data']['receiver']
        author_user, created = User.objects.get_or_create(username=sender)

        if sender >= receiver:
            room_name = 'room_' + sender + '_' + receiver
        else:
            room_name = 'room_' + receiver + '_' + sender

        message = Message.objects.create(author=author_user, content=text, room_name=room_name)
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': str(message.id),
            'author': message.author.username,
            'content': message.content,
            'created_at': str(message.created_at)
        }

    def connect(self):
        sender = self.scope['url_route']['kwargs']['sender']
        receiver = self.scope['url_route']['kwargs']['receiver']
        print("sender: " + sender)
        print("receiver: " + receiver)

        if sender >= receiver:
            self.room_name = 'room_' + sender + '_' + receiver
        else:
            self.room_name = 'room_' + receiver + '_' + sender

        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    commands = {
        'init_chat': init_chat,
        'fetch_messages': fetch_messages,
        'new_message': new_message,
        'connect': connect
    }


    def disconnect(self, close_code):
        # leave group room
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def send_chat_message(self, message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))
