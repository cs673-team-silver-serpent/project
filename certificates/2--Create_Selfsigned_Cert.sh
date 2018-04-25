#!/usr/bin/env bash
sudo openssl req -new -sha256 -nodes -out server.csr -newkey rsa:4096 -keyout server.key -config server.csr.cnf

sudo openssl x509 -req -in server.csr -CA ~/ssl/rootCA.pem -CAkey ~/ssl/rootCA.key -CAcreateserial -out server.crt -days 365 -sha256 -extfile v3.ext