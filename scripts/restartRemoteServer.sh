#!/bin/bash

cp Caddyfile dist/Caddyfile
sudo systemctl stop agriworks-fe.service
sudo systemctl start agriworks-fe.service
