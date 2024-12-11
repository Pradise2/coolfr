import React from "react";

export default function ShadowEffect({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="275"
      height="275"
      viewBox="0 0 275 275"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_f_1464_6497)">
        <circle cx="137.529" cy="137.471" r="72.4143" fill="#FFD337"></circle>
      </g>
      <circle
        cx="137"
        cy="138"
        r="63.4286"
        fill="white"
        fillOpacity="0.05"
      ></circle>
      <circle cx="137" cy="138" r="74" fill="white" fillOpacity="0.05"></circle>
      <defs>
        <filter
          id="filter0_f_1464_6497"
          x="0.0999756"
          y="0.0428467"
          width="274.857"
          height="274.857"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="32.5071"
            result="effect1_foregroundBlur_1464_6497"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
}
