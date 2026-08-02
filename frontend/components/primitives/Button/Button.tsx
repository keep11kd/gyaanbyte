import { Button as UIButton } from "@/components/ui/Button";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof UIButton>;

export function Button(props: ButtonProps) {
  return <UIButton {...props} />;
}
