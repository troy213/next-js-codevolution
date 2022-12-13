<div align='center'><h1>Codevolution NextJS Course</h1>
<h3>Next Styling</h3>
</div>
<hr />

### 📃 Documentation

**Table of Content**

- Folder Structure Example
- Global Styling
- Adding Bootstrap or Other CSS library to your project
- CSS Module
- SASS Support
- CSS-In-JS

<hr />

**Folder Structure Example**

If you using SASS, this is the recommendation of folder structure that I got from **https://itnext.io**

```
sass/
|
|– abstracts/ (or utilities/)
|   |– _variables.scss    // Sass Variables
|   |– _functions.scss    // Sass Functions
|   |– _mixins.scss       // Sass Mixins
|
|– base/
|   |– _reset.scss        // Reset/normalize
|   |– _typography.scss   // Typography rules
|
|– components/ (or modules/)
|   |– _buttons.scss      // Buttons
|   |– _carousel.scss     // Carousel
|   |– _slider.scss       // Slider
|
|– layout/
|   |– _navigation.scss   // Navigation
|   |– _grid.scss         // Grid system
|   |– _header.scss       // Header
|   |– _footer.scss       // Footer
|   |– _sidebar.scss      // Sidebar
|   |– _forms.scss        // Forms
|
|– pages/
|   |– _home.scss         // Home specific styles
|   |– _about.scss        // About specific styles
|   |– _contact.scss      // Contact specific styles
|
|– themes/
|   |– _theme.scss        // Default theme
|   |– _admin.scss        // Admin theme
|
|– vendors/
|   |– _bootstrap.scss    // Bootstrap
|   |– _jquery-ui.scss    // jQuery UI
|
`– main.scss              // Main Sass file
```

<hr />

**Global Styling**

You can add global style inside **styles/** folder and name it **globals.css**. And you need to import the CSS file within **pages/\_app.js**.

```
your-project/
|
|– styles/
|   |– globals.css/
|
```

<hr />

**Adding Bootstrap or Other CSS library to your project**

You can add bootstrap by installing the dependecies and import it to **pages/\_app.js**

```
npm install bootstrap
```

And inside of \_app.js file, you import it

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

<hr />

**CSS Module**

If you want to style your component locally without any style collition, NextJS by default provide CSS module to your project by adding **YourCssFile.module.css** inside of **styles/** folder.

And then, you can import the style from your component/page.

```js
import styles from '../styles/YourCssFile.module.css'

const Component = () => {
  ;<main className={styles.main}>. . .</main>
}

export default Component
```

<hr />

**SASS Support**

You can use SASS for your project by installing **sass** dependency and put all your SASS file inside **styles/** folder.

```
npm install sass
```

<hr />

**CSS-in-JS**

First you need to install **styled-components** dependecy

```
npm install styled-components
```

You can create Theme Provider to your project by import _ThemeProvider_ inside **\_app.js** file.

```js
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#355C7D',
  },
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
```

To create a Styled Component, you can import _styled_ inside your file.

```js
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const Component = () => {
  return <Title>Hello World</Title>
}

export default Component
```
