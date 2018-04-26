#!/usr/bin/env bash
sudo openssl req -new -sha512 -nodes -out server.csr -newkey rsa:8192 -keyout server.key -config server.csr.cnf

sudo openssl x509 -req -in server.csr -CA ~/ssl/rootCA.pem -CAkey ~/ssl/rootCA.key -CAcreateserial -out server.crt -days 60 -sha512 -extfile v3.ext