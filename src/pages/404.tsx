import { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby-plugin-react-i18next";
import * as React from "react";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        Sorry, we couldn't find what you were looking for. Maybe you can find
        what you need from our <Link to="/" placeholder={undefined}>homepage</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
