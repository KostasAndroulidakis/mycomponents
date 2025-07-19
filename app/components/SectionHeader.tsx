import { DIMENSIONS } from "~/constants/dimensions";

/**
 * Props for the SectionHeader component
 */
interface SectionHeaderProps {
  /** Main title text to display */
  title: string;
  /** Optional content to display on the right side of the header */
  rightContent?: React.ReactNode;
}

/**
 * Reusable header component for sections with consistent styling
 * Follows SSOT principle by centralizing header layout pattern
 */
export function SectionHeader({ title, rightContent }: SectionHeaderProps): JSX.Element {
  return (
    <div className={`${DIMENSIONS.HEADER_PADDING} ${DIMENSIONS.BORDER_B} ${DIMENSIONS.BORDER_LIGHT} ${DIMENSIONS.BG_LIGHT}`}>
      <div className={DIMENSIONS.FLEX_BETWEEN}>
        <h2 className={`${DIMENSIONS.TEXT_SM} ${DIMENSIONS.FONT_SEMIBOLD} text-mouser-text-primary`}>
          {title}
        </h2>
        {rightContent}
      </div>
    </div>
  );
}