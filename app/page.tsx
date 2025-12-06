"use client";

import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";

import { FormInput } from "./components/FormInput";
import { Header } from "./components/Header";
import { MockResult } from "./components/MockResult";
import { type View } from "./types";
import { LoadingVisualization } from "./components/LoadingVisualization";
import AttachFileAddIcon from "@/app/assets/icons/attach_file_add.svg";

import DescriptionIcon from "@/app/assets/icons/description.svg";
import { BodyText } from "@/app/components/ui/primitives";
import { Background } from "@/app/components/Background";

const HomePage = () => {
  const AUTO_FILE_PROMPT = "Изучи материалы и что мне с этим делать?";
  const [inputValue, setInputValue] = useState("");
  const [droppedFileName, setDroppedFileName] = useState<string | null>(null);
  const [submittedFileName, setSubmittedFileName] = useState<string | null>(null);
  const [view, setView] = useState<View>("form");
  const [followUpValue, setFollowUpValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [conversation, setConversation] = useState<string[]>([]);
  const [dropOverlayActive, setDropOverlayActive] = useState(false);
  const [hoveredFileName, setHoveredFileName] = useState<string | null>(null);

  const resetToForm = (options?: { clearConversation?: boolean }) => {
    setView("form");
    setDroppedFileName(null);
    setSubmittedFileName(null);
    setInputValue("");
    setFollowUpValue("");
    setSubmittedQuery(null);
    if (options?.clearConversation) {
      setConversation([]);
    }
  };

  useEffect(() => {
    if (view !== "loading") return;
    const timer = window.setTimeout(() => setView("result"), 7000);
    return () => window.clearTimeout(timer);
  }, [view]);

  useEffect(() => {
    if (view !== "form") return;

    const isInOverlayZone = (clientY: number) => clientY < window.innerHeight - 140;

    const handleDragEnter = (event: DragEvent) => {
      const hasFiles =
        Array.from(event.dataTransfer?.types || []).includes("Files") ||
        (event.dataTransfer?.items?.length ?? 0) > 0;
      if (!hasFiles) return;
      event.preventDefault();
      const inZone = isInOverlayZone(event.clientY);
      setDropOverlayActive(inZone);
      const name =
        event.dataTransfer?.items?.[0]?.getAsFile()?.name ??
        event.dataTransfer?.files?.[0]?.name ??
        null;
      setHoveredFileName(name ?? null);
    };

    const handleDragOver = (event: DragEvent) => {
      const hasFiles =
        Array.from(event.dataTransfer?.types || []).includes("Files") ||
        (event.dataTransfer?.items?.length ?? 0) > 0;
      if (!hasFiles) return;
      event.preventDefault();
      event.dataTransfer && (event.dataTransfer.dropEffect = "copy");
      const inZone = isInOverlayZone(event.clientY);
      setDropOverlayActive(inZone);
      const name =
        event.dataTransfer?.items?.[0]?.getAsFile()?.name ??
        event.dataTransfer?.files?.[0]?.name ??
        null;
      setHoveredFileName(name ?? hoveredFileName);
      if (!inZone) {
        setDropOverlayActive(false);
      }
    };

    const handleDragLeave = (event: DragEvent) => {
      if (event.relatedTarget === null || event.target === document) {
        setDropOverlayActive(false);
        setHoveredFileName(null);
      }
    };

    const handleDrop = () => {
      setDropOverlayActive(false);
      setHoveredFileName(null);
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [hoveredFileName, view]);

  const handleSubmit = () => {
    if (view !== "form") return;
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const isAutoPrompt = trimmed === AUTO_FILE_PROMPT;
    const shouldStoreQuery = Boolean(trimmed) && !isAutoPrompt;
    setSubmittedQuery(shouldStoreQuery ? trimmed : null);
    if (shouldStoreQuery && !droppedFileName) {
      setConversation((prev) => [...prev, trimmed]);
    }
    if (droppedFileName) {
      setSubmittedFileName(droppedFileName);
      setView("loading");
    }
  };

  const handleFollowUpSubmit = () => {
    const trimmed = followUpValue.trim();
    if (!trimmed) return;
    setConversation((prev) => [...prev, trimmed]);
    setFollowUpValue("");
  };

  const renderContent = () => {
    if (view === "loading") {
      return (
        <section
          className="fixed h-[832px] w-[832px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ animation: "fadeIn 0.4s ease-in-out both" }}
        >
          <div className="absolute">
            <LoadingVisualization />
          </div>

          <div
            className="text-center text-[64px] leading-[68px] relative z-10"
            style={{
              animation: "pulseWhite 1s ease-in-out infinite alternate",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Изучаю материалы
          </div>
        </section>
      );
    }

    if (view === "result") {
      return (
        <div className="relative z-10">
          {submittedFileName && (
            <div className="flex justify-end  mb-[68px]">
              <div className="p-[32px_24px_28px] bg-white/15 border border-white/15 rounded-[16px] flex gap-[12px] items-center">
                <DescriptionIcon className="w-[40px] h-[40px]" />
                <BodyText>{submittedFileName}</BodyText>
              </div>
            </div>
          )}

          <MockResult />

          {conversation.length > 0 && (
            <div className="space-y-4 pt-2">
              {conversation.map((message, idx) => (
                <div key={`${message}-${idx}`} className="space-y-2">
                  <div className="flex justify-end">
                    <div className="max-w-[70%] rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 shadow-md">
                      {message}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div
                      style={{
                        width: "100%",
                        minHeight: "34px",
                        fontFamily: "'Veb Sans', sans-serif",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "32px",
                        lineHeight: "34px",
                        color: "#FFFFFF",
                      }}
                    >
                      {message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <section
        className={`flex w-full items-center justify-center text-center z-20 absolute top-[156px] bottom-[220px] left-0 transition-opacity duration-200 ${
          dropOverlayActive ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <p className="max-w-[716px] text-[32px] leading-[34px]">
          Расскажите о своём проекте. Оценим, подсветим где можно улучшить, опишем пошаговый план
          действий для реализации с&nbsp;господдержкой
        </p>
      </section>
    );
  };

  return (
    <>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {view !== "loading" && <Background />}
        <Header
          showOverlay={view === "result"}
          onLogoClickAction={() => {
            const shouldClearConversation = view === "loading";

            resetToForm({ clearConversation: shouldClearConversation });
          }}
        />

        <main className="mx-auto max-w-[1360px] pl-[40px] pr-[40px] pb-[296px] pt-[120px]">
          {renderContent()}

          {view !== "loading" && (
            <div
              className={`transition-opacity duration-200 ${
                view === "form" && dropOverlayActive
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <FormInput
                variant={view === "result" ? "followup" : "primary"}
                view={view}
                inputValue={view === "result" ? followUpValue : inputValue}
                onInputChange={view === "result" ? setFollowUpValue : setInputValue}
                droppedFileName={view === "result" ? undefined : droppedFileName}
                onFileChange={view === "result" ? undefined : setDroppedFileName}
                onSubmit={view === "result" ? handleFollowUpSubmit : handleSubmit}
              />
            </div>
          )}
        </main>
      </div>

      {view === "form" && (
        <div
          className={`fixed inset-0 z-20 flex items-center justify-center px-4 transition-opacity duration-200 ${
            dropOverlayActive ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!dropOverlayActive}
        >
          <div
            className="absolute top-[156px] bottom-[76px] flex w-full max-w-[1280px] flex-col items-center justify-center bg-[#363636]/50 border-2 border-white/10 backdrop-blur-[23px] rounded-2xl"
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "copy";
            }}
            onDrop={(event) => {
              event.preventDefault();
              const name =
                event.dataTransfer?.items?.[0]?.getAsFile()?.name ??
                event.dataTransfer?.files?.[0]?.name ??
                null;
              if (name) {
                setDroppedFileName(name);
              }
              setDropOverlayActive(false);
              setHoveredFileName(null);
            }}
            onDragLeave={(event) => {
              if (
                event.currentTarget &&
                !event.currentTarget.contains(event.relatedTarget as Node)
              ) {
                setDropOverlayActive(false);
                setHoveredFileName(null);
              }
            }}
          >
            <div className="flex flex-col items-center gap-4">
              {hoveredFileName && (
                <div className="max-w-[240px] text-center text-sm text-white/85">
                  {hoveredFileName}
                </div>
              )}
            </div>

            <p className="flex items-center text-[32px] leading-[34px] gap-[24px]">
              <AttachFileAddIcon />
              Перетащите файлы сюда
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulseWhite {
          0% {
            color: rgba(255, 255, 255, 0.5);
          }
          100% {
            color: rgba(255, 255, 255, 1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
