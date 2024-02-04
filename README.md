# SSG Starter

This template repository contains a tailored selection of tools and configurations to streamline the process of building and deploying a static website.

Furthermore, an effort was made to facilitate the generation of time tracking reports using the lovely [git-spend](https://github.com/Goutte/git-spend) tool, by enforcing a consistent commit message format using [commitlint](https://commitlint.js.org/) and a [custom rule](./commitlint.config.ts).

All that's necessary to get started is to configure a data source and implement the desired design.

## SSG Framework

My main criteria for selecting a static site generator (from here on referred to as IT) are:

- **No-Server Hosting**: Hosting a static website solely on a [CDN](https://jamstack.org/glossary/cdn/) is currently the most cost-effective way to host a website. Especially considering the many free options available, such as [GitHub Pages](https://pages.github.com/), [Vercel](https://vercel.com/) and [Netlify](https://www.netlify.com/).
  - IT MUST at least be compatible with [Netlify](https://www.netlify.com/) to allow for commercial use of the resulting website.
- **Independent Image Optimization**: Images are the most common bottleneck for website performance. A static site generator should have a built-in way to optimize images.
  - IT MUST have a way to optimize images without the need for a third-party service.
- **Web Performance**: Choosing SSG itself already provides a performance boost over the majority of rendering methods at the cost of a more complex build process. However, how the generated HTML, CSS and JavaScript is optimized and delivered can also impact how a site performs, therefore:
  - IT MAY optimize the build process to further improve web performance.
- **Framework Support**: I have the moste experience with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/), therefore these should be supported. Additionally, I would like to keep the option open to use other frameworks in the future.
  - IT MUST at least support [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
  - IT MAY be framework-agnostic to allow for the use of other frameworks in the future.
- **Headless CMS Integration**: In my projects, a headless CMS generally is used to manage the content of the website. Therefore, the SSG should have a way to integrate with a headless CMS.
  - IT MUST support data fetching from a headless CMS at build time.
  - IT MAY support live previews of content changes.
- **Custom Build Steps**: Sometimes, a website requires a custom build steps, such as generating a sitemap or open graph images.
  - IT MUST allow for the configuration and implementation of custom build steps.
- **Open Source**: The SSG should be open source to allow for the community to contribute and to ensure that it will be supported in the future.
  - IT MUST be open source.
- **Stability & Adoption**: The SSG should be actively maintained and have a large community to ensure that it will be supported in the future.
  - IT MUST have a commit in the last month.

*The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).*

### Considered SSGs

- [Astro](https://astro.build/)
  - is a still somewhat young SSG that has a lot of potential, but does not yet have the same level of adoption as the other SSGs. I plan on developing a project with it in the future to evaluate its capabilities.
- [Next.js](https://nextjs.org/)
  - It has a very wide adoption, but it is not as well-suited for my requirements, mainly due to its mandatory external service dependency for image optimization.
- [Gatsby.js](https://www.gatsbyjs.com/)
  - Is the most popular SSG and has a large ecosystem of plugins and starters, which makes it easy to integrate with a headless CMS. It also supports image optimization out of the box.

### Decision

After a rigorous evaluation process, [Gatsby.js](https://www.gatsbyjs.com/) has crystallized itself as my **current** go-to static site generator.

The reasons for this decision are:

- It supports React and TypeScript out of the box.
- It supports image optimization out of the box.
- It has a large ecosystem of plugins and starters, which makes it easy to integrate with a headless CMS.
- It is actively maintained and has a large community.
- It is open source.
- It is supported by Netlify & GitHub Pages.
- It allows for customizing the build process with a variety of entry points.

### References

- [Google's Core Web Vitals (CWV) Technology Report](https://lookerstudio.google.com/u/0/reporting/55bc8fad-44c2-4280-aa0b-5f3f0cd3d2be/page/M6ZPC?params=%7B%22df44%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580Next.js%25EE%2580%2580Gatsby%25EE%2580%2580Astro%22,%22df46%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580mobile%22%7D)
  - This report demonstrates the number of websites using a specific technology with a good CWV score in the past year.
- [Bejamas Comparison Tool](https://bejamas.io/compare/)
  - Allows for a comparison of different SSGs based on a variety of criteria.
- [npm trends: Astro vs Gatsby](https://npmtrends.com/astro-vs-gatsby)
  - Astro seems to be gaining traction and Gatsby seems to slowly be losing some of its popularity.

## Features

### Automatic PageSpeed Insights

The repository is configured to automatically run a PageSpeed Insights audit using the [psi-svg](https://www.npmjs.com/package/psi-svg) package.

After a successful deployment of this website to gh-pages via the [configured workflow](./.github/workflows//gatsby.yml) , the `analyze` job of action generates the `psi.svg`. It displays the current PageSpeed Insights scores. The SVG is uploaded to the output directory configured by the [`PSI_DIR`](https://github.com/nico-i/ssg-starter/settings/variables/actions) environment variable.

This is the `psi.svg` of the latest deployment of this starter:

<br />

![PageSpeed Insights](./docs/svg/psi.svg)