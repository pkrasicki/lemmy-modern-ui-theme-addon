# Lemmy Modern UI Theme
This Firefox extension replaces the CSS styles on Lemmy instances to create a modern looking theme. Works with Lemmy 0.17 and 0.18 (other versions haven't been tested).

https://addons.mozilla.org/firefox/addon/lemmy-modern-ui-theme

## Building The Addon
### Prerequisites
- [Node.js 18.x](https://nodejs.org)

### Building
Install dependencies:

```
npm install
```

Build the addon:
```
npm run build
```

### Building CSS Only
To build all the styles, so that you could use them on your instance:
```
npm run build-styles
```

The CSS files will appear in the `dist` folder.

## Screenshots

![main page](screenshots/main-page.png)

![post 1](screenshots/post1.png)

![post 2](screenshots/post2.png)

![dark theme](screenshots/dark-theme.png)