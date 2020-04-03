# silk-paper-node
Package for the automatic generation of REST documentation based on the OpenApi specification.

## Installing
Install with `npm i @wolox/silk-paper`.

## Usage
* Initialize silk-paper:
  ```
  const server = require(‘./app.js’);     // This is a server instance.
  const SilkPaper = require(‘@wolox/silk-paper’);
  const docs = new SilkPaper(server, { docsDir: ‘docs’ });
  ```
  When SilkPaper is initialized, the inital documentation files are created in the chosen folder (‘docs’), based on what’s in the `server`. The created class can be exported to where you want to generate documentation. To do this, add the following sentence in a use case (e.g. in testing) that you want to document, passing the HTTP response object:

  ```
  docs.genDocs(response, { description: ‘Testing example/endpoint’ });
  ```

* Having the generated documentation, the static method `buildDocs()` can be used to get the entire OpenApi specification object, which can be utilized in multiples ways.

  e.g. In the server file the [`swagger-ui-express`](https://www.npmjs.com/package/swagger-ui-express) package can be used to render the documentation.
  ```
  const swaggerUi = require('swagger-ui-express');
  const silkPaper = require('@wolox/silk-paper');

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(silkPaper.buildDocs({ docsDir: 'docs' })));
  ``` 

### Supported extensions: 
This should be added as option in the constructor and the package accepts two kind of type files:
* .json
* .yml (coming soon)

### Options
* For the ***silk-paper*** constructor:
  ``` 
  const options = {
    docsDir: 'custom/path',     // Default value: 'docs'
    fileType: 'json',           // Default value: 'json'
    openApiVersion: '*.*.*'     // Default value: '3.0.0'
  }

  new SilkPaper(server, options);
  ```
* For the `genDocs` function:
  ``` 
  const options = {
  description: 'endpoint description'       // Default value: `${method} ${path}`
  }

  docs.genDocs(response, options);
  ```

* For the `buildDocs` function: 
  ```
  const options = {
  docsDir: 'custom/path',     // Default value: 'docs'
  fileType: 'json',           // Default value: 'json'
  }

  silkPaper.buildDocs(options)
  ```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Run the tests (`npm test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## About

This project is maintained by [Wolox](https://github.com/wolox) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**silk-paper-node** is available under the MIT [license](LICENSE.md).

    Copyright (c) 2020 Wolox

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
