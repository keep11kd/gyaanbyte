import * as React from "react";
import { Button as UIButton } from "@/components/ui/button";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof UIButton>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <UIButton ref={ref} {...props} />;
  }
);

Button.displayName = "Button";
