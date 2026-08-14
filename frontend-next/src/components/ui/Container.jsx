"use client";

import { cn } from "../../utils/helpers";

/** Consistent page gutter + max width for every section. */
function Container({ as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Container;
