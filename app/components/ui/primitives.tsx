"use client";

import { ReactNode } from "react";

type Tone = "default" | "muted" | "success" | "warning";
type CardTone = "default" | "warning";

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const SectionHeading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cx("text-[32px] leading-[34px]", className)}>{children}</div>;

export const StatValue = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={cx("text-[32px] leading-[34px] font-bold", className)}>{children}</div>;

const toneClass: Record<Tone, string> = {
  default: "",
  muted: "text-white/40",
  success: "text-[#92C143]",
  warning: "text-[#ED6C25]",
};

export const BodyText = ({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) => <div className={cx("text-[16px] leading-[17px]", toneClass[tone], className)}>{children}</div>;

const cardToneClass: Record<CardTone, string> = {
  default:
    "bg-[linear-gradient(360deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.06)_100%),_linear-gradient(rgba(255,255,255,0.1),_rgba(255,255,255,0.1))]",
  warning:
    "bg-[linear-gradient(360deg,_rgba(255,159,50,0)_0%,_rgba(255,159,50,0.12)_100%),_linear-gradient(rgba(255,159,50,0.1),_rgba(255,159,50,0.1))]",
};

export const Card = ({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: CardTone;
  className?: string;
}) => (
  <div
    className={cx(
      "rounded-[20px] border border-white/15 backdrop-blur-[5px] p-[32px_24px_28px]",
      cardToneClass[tone],
      className,
    )}
  >
    {children}
  </div>
);
