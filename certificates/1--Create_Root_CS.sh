#!/usr/bin/env bash
mkdir ~/ssl/
openssl genrsa -des3 -out ~/ssl/rootCA.key 8192
openssl req -x509 -new -nodes -key ~/ssl/rootCA.key -sha512 -days 60 -out ~/ssl/rootCA.pem -config root.csr.cnf