#!/usr/bin/env bash
mkdir ~/ssl/
openssl genrsa -des3 -out ~/ssl/rootCA.key 4096
openssl req -x509 -new -nodes -key ~/ssl/rootCA.key -sha256 -days 365 -out ~/ssl/rootCA.pem