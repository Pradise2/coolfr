export default function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <g opacity="0.2">
        <path
          d="M14 0C6.2 0 0 6.2 0 14C0 21.8 6.2 28 14 28C21.8 28 28 21.8 28 14C28 6.2 21.8 0 14 0ZM14 26C7.4 26 2 20.6 2 14C2 7.4 7.4 2 14 2C20.6 2 26 7.4 26 14C26 20.6 20.6 26 14 26Z"
          fill="currentColor"
        />
        <path
          d="M19.4 21L14 15.6L8.6 21L7 19.4L12.4 14L7 8.6L8.6 7L14 12.4L19.4 7L21 8.6L15.6 14L21 19.4L19.4 21Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
