import type { SVGProps } from "react";
import * as React from "react";
export const SvgSpinner = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <g clipPath="url(#clip0_16922_147927)">
      <path
        d="M0.415039 12.0005C0.419993 9.20688 1.39946 6.50255 3.18457 4.35371C4.96969 2.20487 7.44859 0.74617 10.1939 0.229097C12.9392 -0.287977 15.7789 0.168977 18.2235 1.52118C20.668 2.87338 22.5641 5.0361 23.585 7.63647L21.722 8.36447C21.0603 6.66906 19.9484 5.18639 18.5062 4.07626C17.064 2.96612 15.3462 2.27061 13.5379 2.06469C11.7297 1.85877 9.89945 2.15024 8.24459 2.9077C6.58972 3.66515 5.17295 4.85987 4.14696 6.36308C3.12097 7.8663 2.52466 9.62101 2.42231 11.4381C2.31996 13.2552 2.71545 15.0658 3.56615 16.6747C4.41685 18.2836 5.6905 19.6299 7.24983 20.5684C8.80917 21.5069 10.5951 22.002 12.415 22.0005C14.4284 22.0072 16.3963 21.4023 18.0583 20.2659C19.7202 19.1294 20.9979 17.5151 21.722 15.6365L23.585 16.3645C22.5641 18.9648 20.668 21.1276 18.2235 22.4798C15.7789 23.832 12.9392 24.2889 10.1939 23.7718C7.44859 23.2548 4.96969 21.7961 3.18457 19.6472C1.39946 17.4984 0.419993 14.7941 0.415039 12.0005Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_16922_147927">
        <rect width={24} height={24} fill="currentColor" />
      </clipPath>
    </defs>
  </svg>
);
