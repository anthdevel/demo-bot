"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import InfoIcon from "@/app/assets/icons/info.svg";
import LightningIcon from "@/app/assets/icons/lightning.svg";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BodyText, Card, SectionHeading, StatValue } from "./ui/primitives";

type CardTone = "default" | "warning";

type LabeledValue = {
  label: string;
  value: string;
};

type FinancialMetric = LabeledValue & {
  tone: CardTone;
  note?: string;
};

type ComplianceItem = LabeledValue & {
  status: "good" | "info";
};

type Weakness = {
  title: string;
  description: string;
};

type SupportDetail = {
  label: string;
  values: Array<{ text: string; linkLabel?: string; href?: string }>;
};

type SupportMeasure = {
  badge: {
    tone: "good" | "info";
    text: string;
    nowrap?: boolean;
  };
  title: string;
  highlight: string;
  details: SupportDetail[];
};

type ImpactRow = {
  label: string;
  current: string;
  supported: {
    value: string;
    delta: string;
  };
};

const overviewData = {
  heading: "Отлично! Я изучил ваш проект",
  score: "8.5",
  details: [
    [
      { label: "Название", value: "Парк мобильных домов «Аристон»" },
      { label: "Инициатор", value: "ООО «Ин'Тран»" },
      { label: "Руководитель", value: "Огнев Геннадий Гаврилович" },
    ],
    [
      { label: "Местоположение", value: "с. Константиново, Рыбновский район" },
      { label: "Горизонт планирования", value: "6 лет" },
      { label: "Стадия", value: "Проектная" },
    ],
  ] satisfies LabeledValue[][],
};

const financialMetrics: FinancialMetric[] = [
  { label: "Объём инвестиций", value: "93,3 млн. ₽", tone: "warning", note: "Можно улучшить" },
  { label: "Выручка", value: "479,4 млн. ₽", tone: "warning", note: "Можно улучшить" },
  { label: "Чистая прибыль", value: "204,6 млн. ₽", tone: "warning", note: "Можно улучшить" },
  { label: "NPV (при 15,2%)", value: "55,1 млн. ₽", tone: "default" },
  { label: "IRR", value: "34 %", tone: "default" },
  { label: "PI", value: "204,6 млн. ₽", tone: "default" },
  { label: "Срок окупаемости", value: "3,2 года", tone: "warning", note: "Можно улучшить" },
  { label: "Дисконтированный срок", value: "3,8 года", tone: "default" },
];

const complianceItems: ComplianceItem[] = [
  { label: "Оценка эффективности", value: "Хорошо", status: "good" },
  { label: "Резюме проекта", value: "Хорошо", status: "good" },
  { label: "Описание концепции", value: "Хорошо", status: "good" },
  { label: "Анализ рынка", value: "Частичный – требует углубления", status: "info" },
  { label: "Маркетинговый план", value: "Хорошо", status: "good" },
  { label: "Производственный план", value: "Требует доработки", status: "info" },
  { label: "Организационный план", value: "Хорошо", status: "good" },
  { label: "Инвестиционный план", value: "Хорошо", status: "good" },
  { label: "Финансовый план", value: "Хорошо", status: "good" },
];

const weaknesses: Weakness[] = [
  {
    title: "Анализ рынка и конкурентов",
    description:
      "отсутствует детальный анализ конкурентной среды, сравнение с аналогичными объектами, обоснование доли рынка",
  },
  {
    title: "Устаревшие данные",
    description:
      "бизнес-план датирован 2020 годом, цены и тарифы требуют актуализации (инфляция, изменение ставок)",
  },
  {
    title: "Не учтены пост-COVID реалии",
    description: "план составлен до пандемии, не учитывает изменения в туристическом поведении",
  },
  {
    title: "Один туристический объект",
    description:
      "основной турпоток связан с музеем-заповедником С.А. Есенина, что создаёт концентрационный риск зависимости от одного объекта",
  },
  {
    title: "Страховые взносы",
    description:
      "указана ставка 15,2%, что соответствует льготному режиму для МСП, но не обоснован выбор именно этой ставки",
  },
  {
    title: "Отсутствует план «Б»",
    description:
      "нет альтернативных сценариев (пессимистичный, оптимистичный) в полном объёме",
  },
];

const supportMeasures: SupportMeasure[] = [
  {
    badge: { tone: "good", text: "Применимо" },
    title: "Экономия 20% от выручки за проживание",
    highlight: "~64 млн ₽ за 6 лет",
    details: [
      {
        label: "Программа",
        values: [
          { text: "Обнуление ставки НДС на услуги проживания" },
          { text: "Ст. 164 НК РФ (пп. 18, 19)", linkLabel: "Ст. 164 НК РФ (пп. 18, 19)", href: "#" },
        ],
      },
      {
        label: "Срок действия",
        values: [{ text: "5 лет со ввода в эксплуатацию (для новых объектов)" }],
      },
      {
        label: "Требование",
        values: [{ text: "Включение в реестр туриндустрии через Госуслуги" }],
      },
    ],
  },
  {
    badge: { tone: "good", text: "Применимо" },
    title: "Компенсация до 50% инвестиций за номера",
    highlight: "~46,64 млн. ₽",
    details: [
      {
        label: "Программа",
        values: [
          { text: "Компенсация до 50% инвестиций за номера" },
          {
            text: "Постановление Правительства РФ от 24.12.2021 N 2439 (ред. от 09.04.2025)",
            linkLabel: "Постановление Правительства РФ от 24.12.2021 N 2439 (ред. от 09.04.2025)",
            href: "#",
          },
        ],
      },
      {
        label: "Срок действия",
        values: [{ text: "2025–2027 годы" }],
      },
      {
        label: "Требование",
        values: [{ text: "Участие в региональном конкурсном отборе модульных гостиниц" }],
      },
    ],
  },
  {
    badge: {
      tone: "info",
      text: "Применимо, если в проекте есть сельхозпроизводитель и туробъект в селе",
      nowrap: true,
    },
    title: "Компенсация при статусе сельхозпроизводителя",
    highlight: "До 10 млн. ₽",
    details: [
      {
        label: "Программа",
        values: [
          { text: "Минсельхоз РФ, грант «Агротуризм»" },
          { text: "Постановление Правительства №2309", linkLabel: "Постановление Правительства №2309", href: "#" },
        ],
      },
      {
        label: "Срок действия",
        values: [{ text: "2026–2027 годы" }],
      },
      {
        label: "Требование",
        values: [{ text: "Участие в конкурсном отборе по программе «Агротуризм»" }],
      },
    ],
  },
];

const impactRows: ImpactRow[] = [
  {
    label: "Объём инвестиций",
    current: "93,3 млн. ₽",
    supported: { value: "76,3 млн. ₽", delta: "- 20 млн ₽" },
  },
  {
    label: "Выручка",
    current: "479,4 млн. ₽",
    supported: { value: "579,4 млн. ₽", delta: "+ 100 млн ₽" },
  },
  {
    label: "Чистая прибыль",
    current: "204,6 млн. ₽",
    supported: { value: "304,6 млн. ₽", delta: "+ 100 млн ₽" },
  },
  {
    label: "NPV (при 15,2%)",
    current: "55,1 млн. ₽",
    supported: { value: "155,1 млн. ₽", delta: "+ 100 млн ₽" },
  },
  {
    label: "IRR",
    current: "34 %",
    supported: { value: "44 %", delta: "+ 10 %" },
  },
  {
    label: "PI",
    current: "204,6 млн. ₽",
    supported: { value: "304,6 млн. ₽", delta: "+ 100 млн ₽" },
  },
  {
    label: "Срок окупаемости",
    current: "3,2 года",
    supported: { value: "1,2 года", delta: "- 2 года" },
  },
  {
    label: "Дисконтированный срок",
    current: "3,8 года",
    supported: { value: "2,8 года", delta: "- 1 год" },
  },
];

const BadgeIcon = ({ tone }: { tone: "good" | "info" }) =>
  tone === "good" ? (
    <LightningIcon aria-hidden="true" className="absolute -left-[2px] -top-[2px]" />
  ) : (
    <InfoIcon aria-hidden="true" className="absolute left-0 -top-[2px]" />
  );

export const MockResult = () => {
  const [sliderReady, setSliderReady] = useState(false);

  return (
    <div className="flex flex-col gap-[80px]">
      <section>
        <SectionHeading className="mb-[24px]">{overviewData.heading}</SectionHeading>

        <Card className="flex flex-col gap-[56px]">
          <div className="text-[64px] font-bold leading-[77px]">
            <span className="text-[#92C143]">{overviewData.score}</span>
            /10
          </div>

          <div className="grid grid-cols-2 items-start gap-x-[32px]">
            {overviewData.details.map((column, columnIdx) => (
              <div key={columnIdx} className="grid grid-cols-[192px_1fr] gap-[12px]">
                {column.map((item) => (
                  <Fragment key={item.label}>
                    <BodyText tone="muted">{item.label}</BodyText>
                    <BodyText>{item.value}</BodyText>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <SectionHeading className="mb-[24px]">Финансовые показатели</SectionHeading>

        <div className="grid grid-cols-4 gap-[12px]">
          {financialMetrics.map((metric) => (
            <Card key={metric.label} tone={metric.tone} className="min-h-[196px]">
              <BodyText>{metric.label}</BodyText>
              <div className="mt-[56px]">
                <StatValue>{metric.value}</StatValue>
                {metric.note && (
                  <BodyText
                    tone="warning"
                    className="relative mt-[12px] pl-[24px]"
                  >
                    <InfoIcon aria-hidden="true" className="absolute left-0 -top-[2px]" />
                    {metric.note}
                  </BodyText>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading className="mb-[24px]">Соответствие критериям бизнес-плана</SectionHeading>

        <Card>
          <div className="grid grid-cols-2 items-start gap-x-[32px]">
            {[complianceItems.slice(0, 4), complianceItems.slice(4)].map((column, idx) => (
              <div key={idx} className="grid grid-cols-[192px_1fr] gap-[12px]">
                {column.map((item) => (
                  <Fragment key={item.label}>
                    <BodyText tone="muted">{item.label}</BodyText>
                    <BodyText
                      tone={item.status === "good" ? "success" : "warning"}
                      className="relative pl-[24px]"
                    >
                      <BadgeIcon tone={item.status} />
                      <span>{item.value}</span>
                    </BodyText>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <SectionHeading className="mb-[24px]">⚠️ Слабые стороны</SectionHeading>

        <div className="grid grid-cols-4 gap-[12px]">
          {weaknesses.map((weakness) => (
            <Card key={weakness.title} tone="warning">
              <SectionHeading className="mb-[56px] min-h-[102px]">{weakness.title}</SectionHeading>
              <BodyText>{weakness.description}</BodyText>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading className="mb-[24px]">Какие меры поддержки вы можете получить</SectionHeading>

        <Swiper
          className="transition-opacity duration-300"
          style={{ overflow: "visible", opacity: sliderReady ? 1 : 0 }}
          modules={[FreeMode, Mousewheel]}
          freeMode
          mousewheel={{ forceToAxis: true }}
          slidesPerView={2}
          spaceBetween={12}
          onInit={() => setSliderReady(true)}
        >
          {supportMeasures.map((measure) => (
            <SwiperSlide key={measure.title} className="!h-auto">
              <Card className="grid h-full grid-rows-[auto_auto_1fr_auto]">
                <BodyText
                  tone={measure.badge.tone === "good" ? "success" : "warning"}
                  className={`relative mb-[20px] pl-[24px] ${measure.badge.nowrap ? "text-nowrap" : ""}`}
                >
                  <BadgeIcon tone={measure.badge.tone} />
                  <span>{measure.badge.text}</span>
                </BodyText>
                <SectionHeading>
                  {measure.title}{" "}
                  <span className="font-bold text-[#92C143]">{measure.highlight}</span>
                </SectionHeading>
                <div className="mt-[56px] grid grid-cols-[192px_1fr] gap-[12px]">
                  {measure.details.map((detail) => (
                    <Fragment key={detail.label}>
                      <BodyText tone="muted">{detail.label}</BodyText>
                      <div className="flex flex-col gap-[8px]">
                        {detail.values.map((val, idx) =>
                          val.linkLabel && val.href ? (
                            <Link
                              key={`${val.text}-${idx}`}
                              href={val.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#92C143] underline"
                            >
                              {val.linkLabel}
                            </Link>
                          ) : (
                            <BodyText key={`${val.text}-${idx}`}>{val.text}</BodyText>
                          ),
                        )}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <SectionHeading className="mb-[40px]">Как изменится ваш проект с господдержкой</SectionHeading>

        <div className="grid grid-cols-[1fr_1fr_1fr] gap-y-[16px] align-text-bottom">
          <div></div>
          <BodyText>Сейчас</BodyText>
          <BodyText>С господдержкой</BodyText>

          {impactRows.map((row) => (
            <Fragment key={row.label}>
              <BodyText className="border-t border-[rgba(255,255,255,0.1)] pt-[36px] pb-[8px]">
                {row.label}
              </BodyText>
              <StatValue className="border-t border-[rgba(255,255,255,0.1)] pt-[24px] pb-[8px]">
                {row.current}
              </StatValue>
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-[24px] pb-[8px]">
                <StatValue>{row.supported.value}</StatValue>
                <BodyText tone="success">{row.supported.delta}</BodyText>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};
