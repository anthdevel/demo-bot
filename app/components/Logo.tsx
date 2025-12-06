"use client";

import LogoSvg from "@/app/assets/logo.svg";

type LogoProps = {
  onClickAction?: () => void;
};

export const Logo = ({ onClickAction }: LogoProps) => (
  <button
    type="button"
    onClick={onClickAction}
    className="text-white focus:outline-none"
    aria-label="На главный экран"
  >
    <LogoSvg aria-hidden="true" />
  </button>
);
