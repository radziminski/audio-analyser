import styled from 'styled-components';

import {
  color,
  ColorProps,
  compose,
  textShadow,
  TextShadowProps,
  typography,
  TypographyProps
} from 'styled-system';

export type TextProps = ColorProps & TextShadowProps & TypographyProps;

const textStyledSystem = compose(color, textShadow, typography);

export const Text = styled.span<TextProps>`
  ${textStyledSystem}
`;

export const Heading1 = styled(Text).attrs(() => ({ as: 'h1' }))``;
export const Heading2 = styled(Text).attrs(() => ({ as: 'h2' }))``;
export const Heading3 = styled(Text).attrs(() => ({ as: 'h3' }))``;
export const Heading4 = styled(Text).attrs(() => ({ as: 'h4' }))``;
export const Heading5 = styled(Text).attrs(() => ({ as: 'h5' }))``;
export const Paragraph = styled(Text).attrs(() => ({ as: 'p' }))``;

export default Text;
