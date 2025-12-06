"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const LoadingVisualization = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("viewBox", "0 0 1012 966")
      .attr("width", "832")
      .attr("height", "832")
      .attr("fill", "none")
      .attr("preserveAspectRatio", "xMidYMid meet");

    const defs = svg.append("defs");

    const filter0 = defs
      .append("filter")
      .attr("id", "filter0_f_28_28")
      .attr("x", "-3.05176e-05")
      .attr("y", "-1.52588e-05")
      .attr("width", "1011.26")
      .attr("height", "965.923")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("color-interpolation-filters", "sRGB");
    filter0.append("feFlood").attr("flood-opacity", "0").attr("result", "BackgroundImageFix");
    filter0
      .append("feBlend")
      .attr("mode", "normal")
      .attr("in", "SourceGraphic")
      .attr("in2", "BackgroundImageFix")
      .attr("result", "shape");
    filter0.append("feGaussianBlur").attr("stdDeviation", "115.556").attr("result", "effect1_foregroundBlur_28_28");

    const filter1 = defs
      .append("filter")
      .attr("id", "filter1_f_28_28")
      .attr("x", "45.6831")
      .attr("y", "151.574")
      .attr("width", "827.519")
      .attr("height", "667.208")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("color-interpolation-filters", "sRGB");
    filter1.append("feFlood").attr("flood-opacity", "0").attr("result", "BackgroundImageFix");
    filter1
      .append("feBlend")
      .attr("mode", "normal")
      .attr("in", "SourceGraphic")
      .attr("in2", "BackgroundImageFix")
      .attr("result", "shape");
    filter1.append("feGaussianBlur").attr("stdDeviation", "26.9244").attr("result", "effect1_foregroundBlur_28_28");

    const filter2 = defs
      .append("filter")
      .attr("id", "filter2_f_28_28")
      .attr("x", "59.8328")
      .attr("y", "69.9526")
      .attr("width", "679.575")
      .attr("height", "802.569")
      .attr("filterUnits", "userSpaceOnUse")
      .attr("color-interpolation-filters", "sRGB");
    filter2.append("feFlood").attr("flood-opacity", "0").attr("result", "BackgroundImageFix");
    filter2
      .append("feBlend")
      .attr("mode", "normal")
      .attr("in", "SourceGraphic")
      .attr("in2", "BackgroundImageFix")
      .attr("result", "shape");
    filter2.append("feGaussianBlur").attr("stdDeviation", "26.9244").attr("result", "effect1_foregroundBlur_28_28");

    const gradient0 = defs
      .append("linearGradient")
      .attr("id", "paint0_linear_28_28")
      .attr("x1", "264.885")
      .attr("y1", "508.09")
      .attr("x2", "733.175")
      .attr("y2", "508.09")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient0.append("stop").attr("offset", "0").attr("stop-color", "#2BB6B4");
    gradient0.append("stop").attr("offset", "1").attr("stop-color", "#A217D4");

    const gradient1 = defs
      .append("linearGradient")
      .attr("id", "paint1_linear_28_28")
      .attr("x1", "518.623")
      .attr("y1", "237.243")
      .attr("x2", "379.863")
      .attr("y2", "684.503")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient1.append("stop").attr("offset", "0").attr("stop-color", "#2BB6B4");
    gradient1.append("stop").attr("offset", "1").attr("stop-color", "#A217D4");

    const gradient2 = defs
      .append("linearGradient")
      .attr("id", "paint2_linear_28_28")
      .attr("x1", "631.79")
      .attr("y1", "605.539")
      .attr("x2", "245.701")
      .attr("y2", "340.529")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient2.append("stop").attr("offset", "0").attr("stop-color", "#2BB6B4");
    gradient2.append("stop").attr("offset", "1").attr("stop-color", "#A217D4");

    const scene = svg.append("g").attr("class", "loading-scene");

    scene.append("rect").attr("width", "832").attr("height", "591.644").attr("transform", "translate(71.8848 188.495)").attr("fill", "black");

    scene
      .append("g")
      .attr("filter", "url(#filter0_f_28_28)")
      .append("path")
      .attr(
        "d",
        "M509.261 670.939C509.262 671.132 509.263 671.324 509.264 671.517C535.093 676.451 561.468 679.52 588.797 679.101C640.978 678.611 705.374 662.654 744.487 606.976C782.823 551.782 783.52 485.667 777.113 430.744C758.137 334.691 687.361 290.796 623.404 260.509C551.249 232.033 461.669 207.44 372.903 271.442C333.032 306.82 287.284 342.679 253.395 399.112C213.851 455.417 231.065 546.205 272.746 587.558C299.628 619.436 331.213 642.623 363.923 662.722C441.952 708.401 529.64 740.624 619.814 733.932C645.734 731.025 673.602 722.086 689.174 700.59C689.026 700.467 688.877 700.344 688.728 700.222C670.755 719.282 643.957 723.922 619.283 723.626C534.047 719.278 454.22 677.368 388.133 627.481C360.598 605.952 335.616 581.061 318.801 553.831C259.261 467.735 347.513 412.087 435.311 351.68C462.064 333.888 527.431 341.852 577.821 364.805C624.251 384.418 668.764 420.439 677.057 448.912C703.285 537.61 686.493 616.758 583.578 650.313C560.03 659.074 534.979 665.633 509.261 670.939Z",
      )
      .attr("fill", "url(#paint0_linear_28_28)");

    scene
      .append("g")
      .attr("opacity", "0.5")
      .attr("filter", "url(#filter1_f_28_28)")
      .append("path")
      .attr(
        "d",
        "M219.079 400.176C218.894 400.121 218.71 400.066 218.525 400.01C204.8 428.09 194.118 458.377 190.31 491.193C179.394 559.301 218.536 637.781 277.865 678.982C336.162 722.17 402.893 743.933 467.717 759.1C553.52 777.37 637.919 750.931 703.999 704.679C742.609 677.117 777.12 641.906 800.106 594.737C823.534 549.395 829.734 479.048 794.902 428.621C755.516 370.642 713.505 304.737 647.311 256.502C581.459 206.428 490.992 195.526 417.877 213.576C384.365 220.998 352.601 232.853 322.659 247.231C227.296 295.699 135.522 367.097 102.922 471.555C94.7065 502.26 101.222 538.303 124.674 559.292C124.815 559.16 124.955 559.028 125.095 558.896C104.193 535.459 102.373 501.96 112.822 474.465C152.95 381.061 248.168 322.047 339.383 286.58C367.88 276.145 397.412 268.75 426.526 265.764C566.928 244.563 644.429 356.56 707.748 481.791C727.786 514.476 692.145 575.014 638.315 611.721C592.773 643.872 536.372 662.905 485.929 657.315C370.295 641.824 239.87 615.554 219.56 490.588C214.527 462.02 215.144 431.139 219.079 400.176Z",
      )
      .attr("fill", "url(#paint1_linear_28_28)");

    scene
      .append("g")
      .attr("opacity", "0.5")
      .attr("filter", "url(#filter2_f_28_28)")
      .append("path")
      .attr(
        "d",
        "M564.893 271.176C565 271.017 565.108 270.857 565.215 270.697C542.461 249.271 516.697 230.097 486.481 216.739C424.664 186.14 338.111 200.281 281.186 244.743C222.669 287.632 182.116 344.923 148.429 402.345C105.564 478.887 105.818 567.33 130.422 644.144C145.311 689.186 168.72 732.577 206.964 768.503C243.333 804.31 308.686 831.069 367.168 812.736C434.211 792.29 509.602 771.685 575.279 722.748C642.611 674.683 679.82 591.505 684.237 516.325C687.073 482.118 685.159 448.267 680.295 415.41C662.248 309.971 621.237 201.167 531.122 139.09C504.229 122.148 467.873 117.696 440.88 133.879C440.964 134.052 441.049 134.225 441.133 134.398C469.709 121.375 502.245 129.56 525.41 147.684C602.737 213.677 630.9 322.102 637.758 419.729C639.284 450.038 637.599 480.436 631.829 509.127C610.491 649.508 480.565 690.36 342.198 713.743C305.045 723.202 257.78 671.229 238.664 608.942C221.445 555.92 219.973 496.413 240.253 449.889C289.299 344.031 353.021 227.241 478.396 244.857C507.172 248.511 536.485 258.247 564.893 271.176Z",
      )
      .attr("fill", "url(#paint2_linear_28_28)");

    const centerX = 506;
    const centerY = 483;
    let tick = 0;
    let frameId = 0;

    const animate = () => {
      tick += 0.01;
      const angle = (tick * 18) % 360; // плавный поворот по часовой
      const scale = 1 + 0.03 * Math.sin(tick * 1.4); // дыхание
      const driftX = 3 * Math.sin(tick * 0.6);
      const driftY = 2.5 * Math.cos(tick * 0.8);

      scene.attr(
        "transform",
        `translate(${centerX + driftX},${centerY + driftY}) rotate(${angle}) translate(${-centerX},${-centerY}) scale(${scale})`,
      );

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return <svg ref={svgRef} className="h-full w-full" aria-hidden />;
};
