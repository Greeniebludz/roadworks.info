import { TM_ICONS } from "./tmIcons.js";
import { UTILITY_ICONS } from "./utilityIcons.js";

export function buildPinSVG({ severity, tmType, utilityType }) {
  const colours = {
    low: "#00C853",
    medium: "#FFB300",
    high: "#D50000",
    none: "#9E9E9E"
  };

  const border = colours[severity] || colours.medium;

  return `
  <svg width="32" height="32" viewBox="0 0 32 32">
    <polygon 
      points="16,4 28,26 4,26"
      fill="white"
      stroke="${border}"
      stroke-width="3"
      stroke-linejoin="round"
    />

    <g transform="translate(8,10)">
      ${TM_ICONS[tmType] || ""}
    </g>

    ${utilityType ? `
      <circle cx="24" cy="24" r="5" fill="white" stroke="#212121" stroke-width="1"/>
      <g transform="translate(21,21)">
        ${UTILITY_ICONS[utilityType] || ""}
      </g>
    ` : ""}
  </svg>
  `;
}
