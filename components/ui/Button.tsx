import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "gold" | "outline" | "dark" | "outline-ink";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  gold: "btn-gold",
  outline: "btn-outline",
  dark: "btn-dark",
  "outline-ink": "btn-outline-ink",
};

const sizes: Record<Size, string> = {
  md: "",
  sm: "btn-sm",
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  external?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  external,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = cn("btn", variants[variant], sizes[size], className);
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {icon && <Icon name={icon} size={15} />}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
      {icon && <Icon name={icon} size={15} />}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn("btn", variants[variant], sizes[size], className)} {...props}>
      {children}
      {icon && <Icon name={icon} size={15} />}
    </button>
  );
}
