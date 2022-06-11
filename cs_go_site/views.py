import time

import requests
from allauth.socialaccount.models import SocialAccount
from django.core import serializers

from .models import MyUser, Comment, History, Help
from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


def index(request):
    return render(request, 'index.html', {})

class Silencer(SessionAuthentication):
    def enforce_csrf(self, request):
        return None

class Owner(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = MyUser.objects.get(pk=request.user.id)
        client = SocialAccount.objects.select_related('user').get(user_id=request.user.pk)
        info = {'id': (client.user_id),'isOwner': request.user.is_superuser, 'user_info': (client.extra_data), 'trade_url':account.trade_url}
        return Response(info)

class SendTechHelp(APIView):
    authentication_classes = (Silencer,)
    def post(self, request):
        account = MyUser.objects.get(id=request.data['id'])
        tech_help = Help(text_message=request.data['text_message'], user=account, email=request.data['email'])
        tech_help.save()
        return Response('ok')

    def get(self, request):
        tickets = []
        if request.user.is_superuser:
            ticket = Help.objects.all()
            for i in ticket:
                account = SocialAccount.objects.select_related('user').filter(user_id=i.user_id).values('extra_data')[0]['extra_data']
                tickets.append({'text_message':i.text_message, 'date': i.date, 'user': account, 'id':i.id, 'email':i.email})
        return Response(tickets)


class TradeUrl(APIView):
    authentication_classes = (Silencer,)
    def post(self, request):
        account = MyUser.objects.get(pk=request.user.id)
        account.trade_url = request.data['trade_url']
        account.save()
        client = SocialAccount.objects.select_related('user').get(user_id=account.pk)
        info = {'id': (client.user_id), 'is_admin': request.user.is_superuser, 'user_info': (client.extra_data), 'trade_url':account.trade_url}
        return Response(info)


class CommentV(APIView):
    authentication_classes = (Silencer,)
    def get(self, request):
        arr = []
        comment = Comment.objects.all()
        for i in comment:
            client = SocialAccount.objects.select_related('user').filter(user_id=i.user_id).values('extra_data')[0]['extra_data']
            arr.append({'comment_text':i.comment_text, 'rating':i.rating, 'date_time':i.date_time, 'user':client})
        return Response(arr)

    def post(self, request):
        account = MyUser.objects.get(id=request.data['id'])
        comment = Comment(comment_text=request.data['comment_text'], rating=request.data['rating'], user=account)
        comment.save()
        return Response(serializers.serialize('json', [comment]))

class HistoryV(APIView):
    authentication_classes = (Silencer,)
    def get(self, request):
        arr = []
        if request.user.is_superuser:
            history = History.objects.all()
            for i in history:
                account = SocialAccount.objects.select_related('user').filter(user_id=i.user_id).values('extra_data')[0]['extra_data']
                client = MyUser.objects.get(id=i.user_id)
                arr.append({'trade_url':client.trade_url,'object_name':i.object_name,'date_time': i.date_time,'user':account,'total_price':i.total_price, 'wallet': i.wallet, 'is_ok':i.is_ok, 'is_cancel':i.is_cancel, 'id':i.id})
        else:
            history = History.objects.filter(user_id=request.user.id)
            for i in history:
                account = SocialAccount.objects.select_related('user').filter(user_id=i.user_id).values('extra_data')[0]['extra_data']
                client = MyUser.objects.get(id=i.user_id)
                arr.append({'trade_url':client.trade_url, 'object_name': i.object_name, 'date_time': i.date_time, 'user': account, 'total_price': i.total_price, 'wallet': i.wallet, 'is_ok':i.is_ok, 'is_cancel':i.is_cancel, 'id':i.id})
        return Response(arr)

    def post(self, request):
        account = MyUser.objects.get(id=request.user.id)
        history = History(object_name=request.data['object_name'], wallet=request.data['wallet'], total_price=request.data['total_price'], user=account)
        history.save()
        return Response(serializers.serialize('json', [history]))


    def patch(self, request):
        history = History.objects.get(id=request.data['id'])
        token = 'dc121ddc0eebaa5320d2e8405be73b57'
        s = requests.Session()
        s.headers = {'content-type': 'application/json'}
        s.headers['authorization'] = 'Bearer ' + token
        s.headers['User-Agent'] = 'Android v3.2.0 MKT'
        s.headers['Accept'] = 'application/json'
        postjson = {"id": "", "sum": {"amount": "", "currency": ""}, "paymentMethod": {"type": "Account", "accountId": "643"}, "fields": {"account": ""}}
        postjson['id'] = str(int(time.time() * 1000))
        postjson['sum']['amount'] = float(history.total_price)
        postjson['sum']['currency'] = '643'
        postjson['fields']['account'] = str(history.wallet)
        link = s.post('https://edge.qiwi.com/sinap/api/v2/terms/99/payments', json=postjson)
        if link.json()['transaction']['state']['code'] == 'Accepted':
            history.is_ok = True
            history.save()
            return Response(serializers.serialize('json', [history]))
        else:
            return Response('Ошибка', status=400)

    def put(self, request):
        history = History.objects.get(id=request.data['id'])
        history.is_cancel = True
        history.save()
        return Response(serializers.serialize('json', [history]))

class Storage(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = request.user
        if (account):
            uid = SocialAccount.objects.select_related('user').filter(user_id=request.user.pk).values('extra_data')[0]['extra_data']['steamid']
            _storage = requests.get(f'https://steamcommunity.com/profiles/{uid}/inventory/json/570/2?l=russian').json()
            prices = requests.get('https://market.dota2.net/api/v2/prices/RUB.json').json()
            if _storage:
                for element in _storage['rgDescriptions']:
                    trigger = 0
                    for skin in prices['items']:
                        if trigger == 1:
                            continue
                        if skin['market_hash_name'] == _storage['rgDescriptions'][element]['market_hash_name']:
                            _storage['rgDescriptions'][element]['price'] = skin['price']
                            trigger = 1
                return Response(_storage)
            return Response({})