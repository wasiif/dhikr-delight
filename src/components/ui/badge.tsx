import * as React from "react";

import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge-variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, React.ComponentPropsWithoutRef<"div"> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
