# OCFiles Server
[![Coverage Status](https://coveralls.io/repos/github/OCFiles/ocfiles-server/badge.svg?branch=master)](https://coveralls.io/github/OCFiles/ocfiles-server?branch=master)
[![Build Status](https://travis-ci.org/OCFiles/ocfiles-server.svg?branch=master)](https://travis-ci.org/OCFiles/ocfiles-server)
[![Build status](https://ci.appveyor.com/api/projects/status/fybbhbbexp5rwm56?svg=true)](https://ci.appveyor.com/project/Lazhari/ocfiles-server)
> OCFiles server is an open source files server using ExpressJS and MongoDB.

## Installation

First, install [Node.js](https://nodejs.org/en/) and [MongoDB](https://docs.mongodb.com/manual/installation/).

1. ``$ cd ocfiles-server``
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
> Please check out the doc on project Wiki [API docs](https://github.com/OCFiles/ocfiles-server/wiki)
## ISC License (ISC)
Copyright <2017> <OCFiles>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
