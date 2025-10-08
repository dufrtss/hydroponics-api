# Hydroponics API

A REST API for the **Integrated Hydroponics Farm System** project, developed by [Eduardo Freitas](https://github.com/dufrtss) and [Sofia Martins](https://github.com/SofiaMartinslv). It's responsible for handling HTTP requests and providing structure to the Hydroponics platform.

## Setup

### JWT Key-pair Generation

```
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```

```
base64 private_key.pem > private_key-base64.pem
```

```
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

```
base64 public_key.pem > public_key-base64.pem
```

## Authors

- [Eduardo Freitas](https://github.com/dufrtss)
- [Sofia Martins](https://github.com/SofiaMartinslv)
