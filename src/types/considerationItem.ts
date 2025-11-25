export interface ConsiderationItem {
  title: string;
  /** May contain inline HTML like <strong> */
  descriptionHtml: string;
  /** full Tailwind class for the dot background color, e.g., 'bg-desert-rock' */
  dotBgClass: string;
  /** full Tailwind class for the gradient-from color, e.g., 'from-desert-rock' */
  lineGradientFromClass?: string;
  /** whether to show the vertical connector line under the dot */
  showConnector?: boolean;
}
