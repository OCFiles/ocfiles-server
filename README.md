# Own Files Cloud server
> Own files cloud server is an open source files server using ExpressJS and MongoDB.

## Installation

First, install [Node.js](https://nodejs.org/en/) and [MongoDB](https://docs.mongodb.com/manual/installation/).

1. ``$ cd own-files-cloud-server``
2. ``$ npm install``
3. ``$ export MONGODB_URI='...' && export NODE_ENV='development|production|test' && export PORT=3500 && npm start ``

## Features

Portable file server throught http. Uses:

* Store videos/audios/images/files on your MongoDB.
* Expose your files to http.
* Filesystem json server
    * POST / > Will add file to mongoDB gridfs files
    * DELETE /:filename action=delete source=filename > will delete file by filename
    * GET /:filename > will get the file name with the content type header

## API docs

### Create new file: **POST** ``/api/v1/files/``
```
curl -X POST -H "Cache-Control: no-cache" -H "Postman-Token: 5f945724-564c-a7c7-b610-a1d5e61c82c5" -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" -F "file=@/Users/macbook/Downloads/656e9325-7484-4ea7-a988-ec8394c796f9.mp4" "http://localhost:3500/api/v1/files/"
```
* Success-Response 
```
HTTP/1.1 201 CREATED
{
  "ok": true,
  "fileName": "48ae95ab-927f-45fb-8c9c-c08cb170d7ba.mp4",
  "filePath": "http://localhost:3500/48ae95ab-927f-45fb-8c9c-c08cb170d7ba.mp4",
  "message": "File has been successfully created"
}
```
* Error-Response
```
HTTP/1.1 500 INTERNAL SERVER ERROR
{
  "ok": false,
  "error": ${err.message},
  "message": "Error uploading file"
}
```

### Request file: **GET**: ``/api/v1/files/:filename``
```
curl -X GET -H "Cache-Control: no-cache" -H "Postman-Token: 1d2bec92-b917-a8cb-dd64-04bf01f28ce6" "http://localhost:3500/api/v1/files/48ae95ab-927f-45fb-8c9c-c08cb170d7ba.mp4"
```
* File not found Response
```
HTTP/1.1 404 NOT FOUND
{
  "ok": false,
  "message": "File not found!"
}
```
### Delete file: **DELETE** ``/api/v1/files/filename``
```
curl -X DELETE -H "Cache-Control: no-cache" -H "Postman-Token: 9509f82f-5816-5339-3de0-772bef44cfe2" "http://localhost:3500/api/v1/files/58e9685c-edee-45ba-af62-8ef3e721509a.mp4"
```
* Success-Response
```
HTTP/1.1 200 OK
{
  "ok": true,
  "message": "58e9685c-edee-45ba-af62-8ef3e721509a.mp4 has been successfully deleted!"
}
```
* File not found Response
```
HTTP/1.1 404 NOT FOUND
{
  "ok": false,
  "message": "File not found!"
}
```
## ISC License (ISC)
Copyright <2017> <OwnFilesCloud>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.