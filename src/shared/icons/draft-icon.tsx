export interface DraftIconProps {
  width?: number;
  height?: number;
}

const DraftIcon: React.FC<DraftIconProps> = ({ width = 24, height = 24 }) => (
  <svg
    style={{ width, height }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        d="M6 18.5V9.62132C6 9.2235 6.15803 8.84197 6.43934 8.56066L10.5607 4.43934C10.842 4.15804 11.2235 4 11.6213 4H16.5C17.3284 4 18 4.67157 18 5.5V18.5C18 19.3284 17.3284 20 16.5 20H7.5C6.67157 20 6 19.3284 6 18.5Z"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <path
        d="M6 10H10.5C11.3284 10 12 9.32843 12 8.5V4"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export default DraftIcon;
