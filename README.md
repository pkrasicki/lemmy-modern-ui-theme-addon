# Lemmy Modern UI Theme
This Firefox extension replaces the CSS styles on Lemmy instances to create a modern looking theme. Works with Lemmy 0.17 and 0.18 (other versions haven't been tested).

https://addons.mozilla.org/firefox/addon/lemmy-modern-ui-theme

![main page](screenshots/main-page.png)

## Building
### Prerequisites
- [Node.js 18.x](https://nodejs.org)

### Building The Addon
Install dependencies:

```
npm install
```

Build the addon:
```
npm run build
```

### Building The Theme Only
You can build the CSS styles to use them on your Lemmy instance (you can also [get them from Releases page](https://github.com/pkrasicki/lemmy-modern-ui-theme-addon/releases)):
```
npm run build-theme
```

The following files will appear in the `dist` folder:

`modern-light.css` - light theme only

`modern-dark.css` - dark theme only

`modern-auto.css` - contains both themes and switches between them automatically depending on user's current system settings (the default Lemmy theme works the same way)

In order to use the theme on your instance, put the chosen CSS files into the `extra_themes` folder or [follow the documentation](https://join-lemmy.org/docs/administration/theming.html).

## Screenshots

![post 1](screenshots/post1.png)

![post 2](screenshots/post2.png)

![dark theme](screenshots/dark-theme.png)