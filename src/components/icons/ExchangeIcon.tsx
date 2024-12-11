import React from "react";

export default function ExchangeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <path
        fill="#F3BA2F"
        d="M14.678 20.17 24 10.849l9.326 9.326 5.424-5.424L24 0 9.254 14.746l5.424 5.424zm-3.83 3.829-5.424-5.424L0 23.999l5.424 5.424 5.424-5.424zm3.83 3.83L24 37.152l9.326-9.326 5.427 5.42-.003.004L24 47.999 9.254 33.254l-.008-.008 5.432-5.416zm27.898 1.596L48 24.001l-5.424-5.424-5.424 5.425 5.424 5.423z"
      ></path>
      <path
        fill="#F3BA2F"
        d="M29.501 23.997h.003L24 18.493l-4.068 4.067-.467.468-.964.964-.008.008.008.007 5.499 5.5 5.504-5.505.002-.002-.005-.003Z"
      ></path>
    </svg>
  );
}
