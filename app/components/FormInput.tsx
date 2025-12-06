"use client";

import { memo, useEffect, useRef, useState, type DragEvent as ReactDragEvent } from "react";
import { type View } from "../types";

import AttachFileAddIcon from "@/app/assets/icons/attach_file_add.svg";
import ArrowRightIcon from "@/app/assets/icons/arrow_right.svg";
import DescriptionIcon from "@/app/assets/icons/description.svg";
import CloseIcon from "@/app/assets/icons/close.svg";

const placeholders = [
  "Я занимаюсь агротехникой и продаю ковши",
  "Организую тематические вечеринки",
  "Занимаюсь строительством по тендерам",
];

type FormInputProps = {
  variant?: "primary" | "followup";
  view: View;
  inputValue: string;
  onInputChange: (value: string) => void;
  droppedFileName?: string | null;
  onFileChange?: (value: string | null) => void;
  onSubmit?: () => void;
};

const FormInputComponent = ({
  variant = "primary",
  view,
  inputValue,
  onInputChange,
  droppedFileName,
  onFileChange,
  onSubmit,
}: FormInputProps) => {
  const isFollowUp = variant === "followup";
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [charIndex, setCharIndex] = useState(1);
  const [typingPhase, setTypingPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const [interacted, setInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverFileName, setHoverFileName] = useState<string | null>(null);
  const [overlayPos, setOverlayPos] = useState<{ x: number; y: number } | null>(null);
  const canSubmit = Boolean(inputValue.trim());

  const inputWrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    if (isFollowUp || interacted || view !== "form" || isDragging) {
      return;
    }

    const currentPlaceholder = placeholders[placeholderIdx];
    const reachedEnd = charIndex >= currentPlaceholder.length;
    const reachedStart = charIndex <= 0;

    const setNextPlaceholder = () => {
      setTypingPhase("typing");
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
      setCharIndex(1);
    };

    const schedule = (callback: () => void, delay: number) => {
      typingTimeoutRef.current = window.setTimeout(callback, delay);
    };

    if (typingPhase === "typing") {
      if (!reachedEnd) {
        schedule(() => setCharIndex((prev) => prev + 1), 70);
      } else {
        schedule(() => setTypingPhase("pausing"), 1200);
      }
    } else if (typingPhase === "pausing") {
      schedule(() => setTypingPhase("deleting"), 800);
    } else if (typingPhase === "deleting") {
      if (!reachedStart) {
        schedule(() => setCharIndex((prev) => prev - 1), 40);
      } else {
        setNextPlaceholder();
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, [charIndex, isDragging, isFollowUp, interacted, placeholderIdx, typingPhase, view]);

  useEffect(() => {
    if (isFollowUp) return;

    const handleWindowDragOver = (event: DragEvent) => {
      const isInside =
        inputWrapperRef.current &&
        event.target instanceof Node &&
        inputWrapperRef.current.contains(event.target);

      if (!isInside) {
        event.preventDefault();
        event.dataTransfer && (event.dataTransfer.dropEffect = "none");
        setIsDragging(false);
        setHoverFileName(null);
        setOverlayPos(null);
      }
    };

    const handleWindowDrop = (event: DragEvent) => {
      const isInside =
        inputWrapperRef.current &&
        event.target instanceof Node &&
        inputWrapperRef.current.contains(event.target);

      if (!isInside) {
        event.preventDefault();
        event.dataTransfer && (event.dataTransfer.dropEffect = "none");
        setIsDragging(false);
        setHoverFileName(null);
        setOverlayPos(null);
      }
    };

    window.addEventListener("dragover", handleWindowDragOver);
    window.addEventListener("drop", handleWindowDrop);

    return () => {
      window.removeEventListener("dragover", handleWindowDragOver);
      window.removeEventListener("drop", handleWindowDrop);
    };
  }, [isFollowUp]);

  const updateOverlayPos = (event: ReactDragEvent<HTMLDivElement>) => {
    const rect = inputWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOverlayPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleDragEnter = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
    const name =
      event.dataTransfer.items?.[0]?.getAsFile()?.name ??
      event.dataTransfer.files?.[0]?.name ??
      null;
    if (name) setHoverFileName(name);
    updateOverlayPos(event);
  };

  const handleDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
    const name =
      event.dataTransfer.items?.[0]?.getAsFile()?.name ??
      event.dataTransfer.files?.[0]?.name ??
      null;
    if (name) setHoverFileName(name);
    updateOverlayPos(event);
  };

  const handleDragLeave = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    setHoverFileName(null);
    setOverlayPos(null);
  };

  const handleDrop = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const name =
      event.dataTransfer.items?.[0]?.getAsFile()?.name ??
      event.dataTransfer.files?.[0]?.name ??
      null;
    if (name) {
      onFileChange?.(name);
      setHoverFileName(name);
      updateOverlayPos(event);
    }
    setOverlayPos(null);

    // Keep focus in the field after attaching a file.
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isFollowUp && view === "form" && droppedFileName) {
      inputRef.current?.focus();
    }
  }, [droppedFileName, isFollowUp, view]);

  const animatedPlaceholder = placeholders[placeholderIdx].slice(
    0,
    Math.max(1, Math.min(charIndex, placeholders[placeholderIdx].length)),
  );

  const currentPlaceholder = isFollowUp
    ? "Задайте уточняющий вопрос"
    : isDragging
      ? "Перетащите файл сюда"
      : animatedPlaceholder;

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleFileButtonClick = () => {
    if (isFollowUp) return;
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isFollowUp) return;
    const file = event.target.files?.[0];
    if (file) {
      onFileChange?.(file.name);
      setHoverFileName(file.name);
      inputRef.current?.focus();
    }
    // allow selecting the same file again
    event.target.value = "";
  };

  return (
    <footer className="pointer-events-none fixed bottom-[76px] z-30">
      <div className="pointer-events-auto mx-auto w-[1280px]">
        <div
          className={`relative w-full rounded-[28px] px-[32px] ${
            droppedFileName ? "flex flex-col gap-3 py-6" : "flex items-center  py-[30px]"
          }  bg-white/15 border border-white/40 rounded-[20px] backdrop-blur-[23px]`}
          ref={inputWrapperRef}
          onClick={focusInput}
          onDragEnter={isFollowUp ? undefined : handleDragEnter}
          onDragOver={isFollowUp ? undefined : handleDragOver}
          onDragLeave={isFollowUp ? undefined : handleDragLeave}
          onDrop={isFollowUp ? undefined : handleDrop}
        >
          {droppedFileName && (
            <div className="flex w-auto items-center self-start bg-white/15 border-2 border-white/50 backdrop-blur-[23px] rounded-[12px] p-[10px] gap-[4px]">
              <DescriptionIcon className="w-[32px] h-[32px]" />
              <span className="max-w-[188px] truncate text-[12px] leading-[15px]">
                {droppedFileName}
              </span>
              <button
                type="button"
                className="w-[32px] h-[32px] text-white/50 transition-colors duration-200 hover:text-white"
                aria-label="Удалить файл"
                onClick={() => {
                  onFileChange?.(null);
                  setHoverFileName(null);
                  onInputChange("");
                  setInteracted(false);
                  setPlaceholderIdx(0);
                  setCharIndex(1);
                  setTypingPhase("typing");
                }}
              >
                <CloseIcon className="w-[32px] h-[32px]" />
              </button>
            </div>
          )}

          <div className="flex w-full items-center gap-[24px]">
            <div
              role="button"
              tabIndex={0}
              aria-label="Прикрепить файл"
              className={`flex items-center justify-center ${isFollowUp ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
              onClick={handleFileButtonClick}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleFileButtonClick();
                }
              }}
            >
              <AttachFileAddIcon />
            </div>
            <input
              ref={inputRef}
              value={inputValue}
              className="h-full flex-1 min-w-0 bg-transparent text-2xl text-white placeholder-white/70 outline-none"
              placeholder={currentPlaceholder}
              aria-label="Ваш запрос"
              onChange={(e) => {
                const value = e.target.value;
                onInputChange(value);
                if (!isFollowUp && view === "form") {
                  const hasText = value.trim() !== "";
                  setInteracted(hasText);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && onSubmit && canSubmit) {
                  event.preventDefault();
                  onSubmit();
                }
              }}
            />
            {onSubmit && (
              <button
                type="button"
                className={`flex shrink-0 items-center justify-center ${
                  canSubmit ? "" : "opacity-40"
                }`}
                aria-label="Отправить"
                onClick={onSubmit}
                disabled={!canSubmit}
              >
                <ArrowRightIcon />
              </button>
            )}
          </div>

          {isDragging && !isFollowUp && (
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-white/50 bg-white/20 px-4 py-3 backdrop-blur-lg"
                style={{
                  left: overlayPos?.x ?? "50%",
                  top: overlayPos?.y ?? "50%",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-9 w-9 text-white"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M14.5 2.5H7A2.5 2.5 0 0 0 4.5 5v14A2.5 2.5 0 0 0 7 21.5h10A2.5 2.5 0 0 0 19.5 19V7.914a2.5 2.5 0 0 0-.732-1.768l-2.914-2.914a2.5 2.5 0 0 0-1.768-.732ZM13 3.914V7.5a.5.5 0 0 0 .5.5h3.586L13 3.914ZM7 4.5h5v3.5A2 2 0 0 0 14 10h3.5V19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a.5.5 0 0 1 .5-.5Z"
                  />
                </svg>
                <span className="w-full truncate text-center text-[13px] font-medium text-white/90">
                  {hoverFileName ?? droppedFileName ?? "Файл"}
                </span>
              </div>
            </div>
          )}
        </div>
        {!isFollowUp && (
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            tabIndex={-1}
          />
        )}
      </div>
    </footer>
  );
};

export const FormInput = memo(FormInputComponent);
