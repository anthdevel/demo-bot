"use client";

import { memo, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const PATHS = {
  bottomGlow:
    "M2152.56 1366.24C2152.85 1366.08 2153.15 1365.92 2153.44 1365.76C2136.8 1316.42 2121.43 1267.78 2106.64 1219.2C2047.65 1068.34 2060.81 896.022 1875.31 751.383C1670.72 649.44 1502.97 709.521 1340.69 734.217C1340.68 734.218 1340.68 734.219 1340.67 734.22C923.23 828.653 549.809 944.46 146.694 767.54C146.693 767.54 146.692 767.54 146.691 767.539C-16.4597 712.257 -179.087 657.396 -340.748 598.539C-388.182 581.051 -436.351 563.646 -482.768 543.557C-482.923 543.852 -483.077 544.148 -483.232 544.443C-439.137 569.576 -393.095 592.209 -347.805 614.946C-193.349 691.588 -37.6278 764.704 119.462 836.347C119.463 836.348 119.463 836.348 119.464 836.348C310.265 922.081 514.873 1015.7 745.144 1014.33C970.596 1012.75 1174.98 967.224 1380.46 927.16C1380.47 927.159 1380.47 927.158 1380.48 927.157C1531.64 897.896 1702.09 855.557 1798.24 892.063C1893.53 928.293 1968.36 1113.2 2060.99 1241.09C2089.92 1283.7 2120.3 1325.34 2152.56 1366.24Z",
  bottomBand:
    "M-851.634 1058.34C-851.878 1058.11 -852.122 1057.89 -852.366 1057.66C-826.922 1017.36 -803.244 976.818 -780.342 935.734C-747.38 878.303 -720.609 818.633 -671.069 759.587C-621.33 697.957 -534.323 661.732 -462.429 650.175C-315.553 626.176 -182.173 637.483 -47.9491 649.82C-14.0364 653.274 18.4374 656.9 51.4549 660.909C431.646 714.584 780.766 776.159 1159.38 692.884C1165.86 691.77 1172.27 690.663 1178.63 689.562C1334.49 662.523 1490.6 635.993 1646.25 607.036C1692.3 598.326 1738.4 589.837 1783.85 579.522C1783.95 579.841 1784.05 580.159 1784.15 580.478C1740.13 596.157 1695.33 610.135 1650.59 624.361C1499.35 671.993 1347.43 717.579 1195.25 761.671C1189.04 763.466 1182.78 765.279 1176.46 767.108C819.018 894.139 396.031 911.077 27.7086 856.473C-5.27158 852.468 -37.567 848.25 -71.188 843.606C-200.258 826.503 -330.401 803.252 -447.162 801.185C-505.942 801.27 -551.604 807.56 -597.388 839.133C-643.63 870.846 -690.848 922.807 -740.746 967.297C-776.288 999.635 -813.206 1030.15 -851.634 1058.34Z",
  bottomOverlay:
    "M1783.63 723.659C1783.88 723.886 1784.12 724.114 1784.37 724.341C1758.92 764.645 1735.24 805.182 1712.34 846.266C1679.38 903.697 1652.61 963.367 1603.07 1022.41C1553.33 1084.04 1466.32 1120.27 1394.43 1131.83C1247.55 1155.82 1114.17 1144.52 979.949 1132.18C946.036 1128.73 913.563 1125.1 880.545 1121.09C500.354 1067.42 151.234 1005.84 -227.383 1089.12C-233.856 1090.23 -240.27 1091.34 -246.625 1092.44C-402.489 1119.48 -558.604 1146.01 -714.251 1174.96C-760.304 1183.67 -806.404 1192.16 -851.854 1202.48C-851.951 1202.16 -852.049 1201.84 -852.146 1201.52C-808.13 1185.84 -763.331 1171.86 -718.59 1157.64C-567.348 1110.01 -415.431 1064.42 -263.25 1020.33C-257.044 1018.53 -250.782 1016.72 -244.464 1014.89C112.982 887.861 535.969 870.923 904.291 925.527C937.272 929.532 969.567 933.75 1003.19 938.394C1132.26 955.497 1262.4 978.748 1379.16 980.815C1437.94 980.73 1483.6 974.44 1529.39 942.867C1575.63 911.154 1622.85 859.193 1672.75 814.703C1708.29 782.365 1745.21 751.852 1783.63 723.659Z",
  topGlow:
    "M2152.56 411.238C2152.85 411.079 2153.15 410.921 2153.44 410.762C2136.8 361.416 2121.43 312.785 2106.64 264.196C2047.65 113.336 2060.81 -58.9776 1875.31 -203.617C1670.72 -305.56 1502.97 -245.479 1340.69 -220.783C1340.68 -220.782 1340.68 -220.781 1340.67 -220.78C923.23 -126.347 549.809 -10.5396 146.694 -187.46C146.693 -187.46 146.692 -187.46 146.691 -187.461C-16.4597 -242.743 -179.087 -297.604 -340.748 -356.461C-388.182 -373.949 -436.351 -391.354 -482.768 -411.443C-482.923 -411.148 -483.077 -410.852 -483.232 -410.557C-439.137 -385.424 -393.095 -362.791 -347.805 -340.054C-193.349 -263.412 -37.6278 -190.296 119.462 -118.653C119.463 -118.652 119.463 -118.652 119.464 -118.652C310.265 -32.9194 514.873 60.7004 745.144 59.328C970.596 57.7501 1174.98 12.2243 1380.46 -27.8402C1380.47 -27.8412 1380.47 -27.8422 1380.48 -27.8431C1531.64 -57.1039 1702.09 -99.4429 1798.24 -62.9367C1893.53 -26.7066 1968.36 158.196 2060.99 286.093C2089.92 328.705 2120.3 370.34 2152.56 411.238Z",
  topBand:
    "M-851.634 103.341C-851.878 103.114 -852.122 102.886 -852.366 102.659C-826.922 62.3553 -803.244 21.8177 -780.342 -19.2656C-747.38 -76.6969 -720.609 -136.367 -671.069 -195.413C-621.33 -257.043 -534.323 -293.268 -462.429 -304.825C-315.553 -328.824 -182.173 -317.517 -47.9491 -305.18C-14.0364 -301.726 18.4374 -298.1 51.4549 -294.091C431.646 -240.416 780.766 -178.841 1159.38 -262.116C1165.86 -263.23 1172.27 -264.337 1178.63 -265.438C1334.49 -292.477 1490.6 -319.007 1646.25 -347.964C1692.3 -356.674 1738.4 -365.163 1783.85 -375.478C1783.95 -375.159 1784.05 -374.841 1784.15 -374.522C1740.13 -358.843 1695.33 -344.865 1650.59 -330.639C1499.35 -283.007 1347.43 -237.421 1195.25 -193.329C1189.04 -191.534 1182.78 -189.721 1176.46 -187.892C819.018 -60.861 396.031 -43.9233 27.7086 -98.5271C-5.27158 -102.532 -37.567 -106.75 -71.188 -111.394C-200.258 -128.497 -330.401 -151.748 -447.162 -153.815C-505.942 -153.73 -551.604 -147.44 -597.388 -115.867C-643.63 -84.1542 -690.848 -32.1927 -740.746 12.2971C-776.288 44.635 -813.206 75.1483 -851.634 103.341Z",
  topOverlay:
    "M1783.63 -231.341C1783.88 -231.114 1784.12 -230.886 1784.37 -230.659C1758.92 -190.355 1735.24 -149.818 1712.34 -108.734C1679.38 -51.3031 1652.61 8.36719 1603.07 67.4126C1553.33 129.043 1466.32 165.268 1394.43 176.825C1247.55 200.824 1114.17 189.517 979.949 177.18C946.036 173.726 913.563 170.1 880.545 166.091C500.354 112.416 151.234 50.8413 -227.383 134.116C-233.856 135.23 -240.27 136.337 -246.625 137.438C-402.489 164.477 -558.604 191.007 -714.251 219.964C-760.304 228.674 -806.404 237.163 -851.854 247.478C-851.951 247.159 -852.049 246.841 -852.146 246.522C-808.13 230.843 -763.331 216.865 -718.59 202.639C-567.348 155.007 -415.431 109.421 -263.25 65.3291C-257.044 63.5336 -250.782 61.721 -244.464 59.8917C112.982 -67.139 535.969 -84.0767 904.291 -29.4729C937.272 -25.4682 969.567 -21.2503 1003.19 -16.6055C1132.26 0.496543 1262.4 23.748 1379.16 25.8154C1437.94 25.7297 1483.6 19.4404 1529.39 -12.1331C1575.63 -43.8458 1622.85 -95.8073 1672.75 -140.297C1708.29 -172.635 1745.21 -203.148 1783.63 -231.341Z",
};

const VIEWBOX = { x: 0, y: 0, width: 1440, height: 1024 };

const addLinearGradient = (
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  id: string,
  coords: { x1: number; y1: number; x2: number; y2: number },
) => {
  const grad = defs
    .append("linearGradient")
    .attr("id", id)
    .attr("x1", coords.x1)
    .attr("y1", coords.y1)
    .attr("x2", coords.x2)
    .attr("y2", coords.y2)
    .attr("gradientUnits", "userSpaceOnUse");

  grad.append("stop").attr("offset", "0").attr("stop-color", "#2BB6B4");
  grad.append("stop").attr("offset", "1").attr("stop-color", "#A217D4");
};

const addFilter = (
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  options: { id: string; stdDeviation: number; x: number; y: number; width: number; height: number },
) => {
  const filter = defs
    .append("filter")
    .attr("id", options.id)
    .attr("x", options.x)
    .attr("y", options.y)
    .attr("width", options.width)
    .attr("height", options.height)
    .attr("filterUnits", "userSpaceOnUse")
    .attr("color-interpolation-filters", "sRGB");

  filter.append("feFlood").attr("flood-opacity", 0).attr("result", "BackgroundImageFix");
  filter
    .append("feBlend")
    .attr("mode", "normal")
    .attr("in", "SourceGraphic")
    .attr("in2", "BackgroundImageFix")
    .attr("result", "shape");
  filter.append("feGaussianBlur").attr("stdDeviation", options.stdDeviation).attr("result", "effect1");
};

const BackgroundSvg: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`);

    const defs = svg.append("defs");

    addLinearGradient(defs, "paint0", { x1: -483, y1: 955, x2: 2153, y2: 955 });
    addLinearGradient(defs, "paint1", { x1: 1784, y1: 819, x2: -852, y2: 819 });
    addLinearGradient(defs, "paint2", { x1: -852, y1: 963, x2: 1784, y2: 963 });
    addLinearGradient(defs, "paint3", { x1: -483, y1: 0, x2: 2153, y2: 0 });
    addLinearGradient(defs, "paint4", { x1: 1784, y1: -136, x2: -852, y2: -136 });
    addLinearGradient(defs, "paint5", { x1: -852, y1: 8, x2: 1784, y2: 8 });

    addFilter(defs, {
      id: "filter0",
      stdDeviation: 76.25,
      x: -635.732,
      y: 391.057,
      width: 2941.67,
      height: 1127.68,
    });
    addFilter(defs, {
      id: "filter1",
      stdDeviation: 24,
      x: -900.366,
      y: 531.522,
      width: 2732.51,
      height: 574.819,
    });
    addFilter(defs, {
      id: "filter2",
      stdDeviation: 38.85,
      x: -929.846,
      y: 645.959,
      width: 2791.91,
      height: 634.219,
    });
    addFilter(defs, {
      id: "filter3",
      stdDeviation: 76.25,
      x: -635.732,
      y: -563.943,
      width: 2941.67,
      height: 1127.68,
    });
    addFilter(defs, {
      id: "filter4",
      stdDeviation: 24,
      x: -900.366,
      y: -423.478,
      width: 2732.51,
      height: 574.819,
    });
    addFilter(defs, {
      id: "filter5",
      stdDeviation: 38.85,
      x: -929.846,
      y: -309.041,
      width: 2791.91,
      height: 634.219,
    });

    defs
      .append("clipPath")
      .attr("id", "clip0")
      .append("rect")
      .attr("width", 1440)
      .attr("height", 1024)
      .attr("fill", "white");

    defs
      .append("clipPath")
      .attr("id", "clip1")
      .append("rect")
      .attr("width", 1440)
      .attr("height", 1024)
      .attr("transform", "translate(0 258)")
      .attr("fill", "white");

    defs
      .append("clipPath")
      .attr("id", "clip2")
      .append("rect")
      .attr("width", 1440)
      .attr("height", 1024)
      .attr("transform", "translate(0 -697)")
      .attr("fill", "white");

    const root = svg.append("g").attr("clip-path", "url(#clip0)");
    root.append("rect").attr("width", 1440).attr("height", 1024).attr("fill", "black");

    const bottomGroup = root.append("g").attr("clip-path", "url(#clip1)");
    bottomGroup.append("rect").attr("width", 1440).attr("height", 1024).attr("transform", "translate(0 258)").attr("fill", "black");

    bottomGroup
      .append("g")
      .attr("filter", "url(#filter0)")
      .classed("breathable", true)
      .append("path")
      .attr("d", PATHS.bottomGlow)
      .attr("fill", "url(#paint0)");

    bottomGroup
      .append("g")
      .attr("filter", "url(#filter1)")
      .classed("breathable", true)
      .append("path")
      .attr("d", PATHS.bottomBand)
      .attr("fill", "url(#paint1)");

    bottomGroup
      .append("g")
      .attr("filter", "url(#filter2)")
      .attr("opacity", 0.4)
      .classed("breathable", true)
      .append("path")
      .attr("d", PATHS.bottomOverlay)
      .attr("fill", "url(#paint2)");

    const topGroup = root.append("g").attr("clip-path", "url(#clip2)");
    topGroup.append("rect").attr("width", 1440).attr("height", 1024).attr("transform", "translate(0 -697)").attr("fill", "black");

    topGroup
      .append("g")
      .attr("filter", "url(#filter3)")
      .classed("breathable", true)
      .append("path")
      .attr("d", PATHS.topGlow)
      .attr("fill", "url(#paint3)");

    topGroup
      .append("g")
      .attr("filter", "url(#filter4)")
      .classed("breathable", true)
      .append("path")
      .attr("d", PATHS.topBand)
      .attr("fill", "url(#paint4)");

    topGroup
      .append("g")
      .attr("filter", "url(#filter5)")
      .attr("opacity", 0.4)
      .classed("breathable", true)
      .append("path")
      .attr("d", PATHS.topOverlay)
      .attr("fill", "url(#paint5)");

    const centerX = VIEWBOX.width / 2;
    const centerY = VIEWBOX.height / 2;
    const breathingGroups = svg.selectAll<SVGGElement, unknown>(".breathable");

    // Небольшие фазовые сдвиги, чтобы слои дышали не синхронно
    const phaseOffsets = breathingGroups.nodes().map((_, i) => i * 0.7);

    let frameId = 0;
    let tick = 0;

    const animate = () => {
      tick += 0.01;
      breathingGroups.each(function (_, i) {
        const phase = tick + phaseOffsets[i];
        const scale = 1 + 0.05 * Math.sin(phase); // заметное дыхание
        const driftX = 10 * Math.sin(phase * 0.5);
        const driftY = 8 * Math.cos(phase * 0.4);
        const dx = centerX * (1 - scale) + driftX;
        const dy = centerY * (1 - scale) + driftY;
        d3.select(this).attr("transform", `translate(${dx},${dy}) scale(${scale})`);
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();

    const readyFrame = requestAnimationFrame(() => setIsReady(true));

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      cancelAnimationFrame(readyFrame);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
        opacity: isReady ? 1 : 0,
        transition: "opacity 250ms ease-in-out",
      }}
    />
  );
};

export const Background = memo(BackgroundSvg);
