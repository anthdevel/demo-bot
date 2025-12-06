"use client";

import { Logo } from "./Logo";

type HeaderProps = {
  onLogoClickAction?: () => void;
  showOverlay?: boolean;
};

export const Header = ({ onLogoClickAction, showOverlay }: HeaderProps) => (
  <header
    className={`w-screen fixed top-0 z-30 ${
      showOverlay ? "bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_35.14%)] backdrop-blur-[8px]" : ""
    }`}
  >
    <div className="mx-auto max-w-[1360px] p-[48px_40px_44px]">
      <Logo onClickAction={onLogoClickAction} />
    </div>
  </header>
);
