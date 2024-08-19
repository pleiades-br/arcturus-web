#!/usr/bin/env python3
from flup.server.fcgi import WSGIServer

def app(environ, start_response):
     # Obter a rota solicitada
    path = environ.get('PATH_INFO', '/')
    if path == '/modo_oper':
        start_response('200 OK', [('Content-Type', 'text/html')])
        return [b"<html><body><h1>Hello, World!</h1></body></html>"]
    else:
        return [b"<html><body><h1>Wrong Answer!</h1></body></html>"]
    

if __name__ == '__main__':
    WSGIServer(app).run()