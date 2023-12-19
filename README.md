<p align="center">
  <picture>
    <source srcset="./assets/logo.png">
    <img alt="TranslateCard logo" height="120px" src="./assets/logo.png"> <!-- Logo height increased from 60px to 120px -->
  </picture>
  <p align="center">
    Learn new language by gaming
    <br />
    <br />
</p>

# TranslateCard

TranslateCard is a web application designed to assist individuals in learning new languages through interactive methods and educational resources.

## Authors

- Aymene Bousbia – *Setup + Packages + Backend* – [Aymene Bousbia](https://github.com/aymene01)
- Mehdi Jabbour – *Frontend* – [Mehdi Jabbour](https://github.com/MehdiJabbour)
- Soufiane Le Breton – *UI/UX* – [Soufiane Le Breton](https://github.com/SoufianeLeBreton)

Feel free to contact any of the authors for further information or questions regarding the project.

## About TranslateCard

TranslateCard aims to create an engaging learning experience by providing users with a variety of tools and strategies to improve their language skills. From flashcards to translation exercises, each feature is crafted to enhance the learning journey.

## Setup

Before you can run TranslateCard locally, make sure you have Node.js, PNPM, and Docker installed on your machine.

1. Clone the repository:

    ```bash
    git clone git@github.com:aymene01/translatecard.git
    ```

2. Navigate to the cloned directory:

    ```bash
    cd translatecard
    ```

3. To make sure you're using the exact version of Node.js and other dependencies as defined for the project, use `proto`:

    ```bash
    proto use
    ```

4. Following the `proto` setup, run the setup script which will prepare all services:

    ```bash
    pnpm run setup
    ```

## Running the Application

After setting up the project, you can run the application using the following commands:

- To start both the API and the web app:

    ```bash
    pnpm dev
    ```

- To start only the API service:

    ```bash
    pnpm dev:api
    ```

- To start only the web application:

    ```bash
    pnpm dev:web
    ```

- To launch Storybook for UI development:

    ```bash
    pnpm storybook
    ```

## Packages

The project is structured modularly with various packages:

- **[api-utils](./packages/api-utils)**: Helper utilities to streamline business logic in our API.
- **[toolbox](./packages/toolbox)**: A collection of TypeScript utility functions.
- **[config](./packages/config)**: Central configuration settings for linting (ESLint), styling (TailwindCSS), and other project-wide tools.
- **[ui](./packages/ui)**: The UI component library housing reusable UI components for TranslateCard.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. To contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Acknowledgments

- Special thanks to all contributors who have invested their time into making TranslateCard a resourceful application.
- Hat tip to anyone whose code was used as inspiration.
- Gratitude to the community for the constant feedback and support.

---
Best regards,

The TranslateCard Team