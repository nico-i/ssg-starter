import { Locale } from "@helper/i18n";
import { type ComponentProps } from "@types";
import { Link as I18nLink } from "gatsby-plugin-react-i18next";
import React from "react";

export interface LinkProps extends ComponentProps {
  to: string;
  locale?: Locale;
  children: React.ReactNode;
}

export function Link({
  to,
  children,
  dataTestId,
  locale,
}: Readonly<LinkProps>) {
  return (
    <I18nLink
      placeholder={undefined}
      to={to}
      data-testid={dataTestId}
      language={locale}
    >
      {children}
    </I18nLink>
  );
}
