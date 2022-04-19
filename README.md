# neutralinojs-react

A simple React.js template for building Neutralinojs apps using the [guide](https://github.com/codezri/neutralinojs-react) in the official documentation.

## How to install

Create a new Neutralinojs project with this template.

```
neu create testapp --template codezri/neutralinojs-react
```

## How to develop

Install React.js app's dependencies

```
cd react-src
npm i
```

Build the React.js app

```
npm run build
```

Start the development server

```
npm start
```

In another terminal, start the Neutralinojs app from the project root (in this case, from the testapp folder).

```
cd ..
neu run --frontend-lib-dev
```

Hot reloading will work, happy coding...
