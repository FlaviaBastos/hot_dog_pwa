# Built with PWA Starter Kit 💜 ![PWA Shields](https://www.pwa-shields.com/1.0.0/series/classic/white/gray.svg)

## 📖 Head over to the [documentation site](https://pwa-starter-kit.polymer-project.org/) for more details or check out [how to get started](https://pwa-starter-kit.polymer-project.org/setup)

This app helps you check if the weather is fine to take your 🐶 outside

### local development
Run locally with Docker mapping local volumes for development:

`docker run -p 8081:8081 -v <local_path_to_code>/:/my-app -it --rm node /bin/bash`

Then from inside the container:

`cd my-app`

`npm install`

`npm start -- --hostname 0.0.0.0 --port 8081`
