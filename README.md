<h1 align="center">Point of Sales APP <br>-RESTful API-</h1>

# Overview

## Introduction

...

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)


<a href="https://expressjs.com/">![express](https://expressjs.com/images/express-facebook-share.png)</a>

### Express.js
Express.js, or simply Express, is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

The philosophy of Expressjs is to provide a small and robust tooling for HTTP servers. Making it a great solution for single page apps, website, hybrids, or public HTTP APIs. 

## REDIS SETUP

1. Inside the redis.conf file, find the supervised directive. This directive allows you to declare an init system to manage Redis as a service, providing you with more control over its operation:
   
   ```supervised systemd```

2. By default, Redis is only accessible from localhost. However, if you installed and configured Redis by following a different tutorial than this one, you might have updated the configuration file to allow connections from anywhere.

    ```bind 0.0.0.0```

    To check that this change has gone into effect, run the following netstat command: ```$ sudo netstat -lnp | grep redis```

3. Create the SALESMAN User via redis-cli
   To create a custom user for a specific application follow the steps:
   
   Create the users.acl file if not existing:

   ```
   sudo touch /etc/redis/users.acl
   sudo chown redis:redis /etc/redis/users.acl
   sudo chmod 640 /etc/redis/users.acl
   ```
   
   use the ACL SETUSER command while on redis-cli
   
   ```
   ACL SETUSER salesman on >salesman ~dm:* +@all -@dangerous
   ```
   
   Make Users Persistent

   ```
   ACL SAVE
   ```