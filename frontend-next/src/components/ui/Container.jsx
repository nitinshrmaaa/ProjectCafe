"use client";

import { cn } from "../../utils/helpers";

/**
 * Consistent page gutter + max width for every section.
 *
 * 80rem is the measure the site is composed at and it holds through every
 * laptop width. Past that it was the reason a wide monitor looked empty: the
 * content stopped growing and every extra pixel went to the gutters. The cap
 * lifts twice — 110rem for 1920-class displays, 132rem for 2560 — which keeps
 * the gutter at roughly the fraction of the screen it is on a laptop instead
 * of letting it swallow a third of the display. On a 2560 screen that puts
 * 82% of the width under content, against the laptop's 83%. Sections that set
 * their own measure (the menu) do the same.
 */
function Container({ as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 3xl:max-w-[110rem] 3xl:px-12 4xl:max-w-[132rem]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Container;
