import React from 'react';
import Box, { FlexBox } from '~/components/Box';
import { Heading5 } from '~/components/Text';
import TextInput from '~/components/TextInput';
import ToggleSwitch from '~/components/ToggleSwitch';
import { COLORS, FONT_WEIGHTS } from '~/styles/theme';

interface SectionWithTitleProps {
  title?: string;
  description?: string;
}

export const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
  title,
  description,
  children
}) => {
  return (
    <Box color={COLORS.white} marginBottom='3rem'>
      <Box marginBottom='1rem'>
        {title && (
          <Box marginBottom='0.5rem'>
            <Heading5 fontWeight={FONT_WEIGHTS.medium}>{title}</Heading5>
          </Box>
        )}
        {description && (
          <Box marginBottom='0.5rem' opacity={0.5}>
            <Heading5 fontSize='0.75rem' fontWeight={FONT_WEIGHTS.light}>
              {description}
            </Heading5>
          </Box>
        )}
      </Box>
      {children}
    </Box>
  );
};

interface ToggleInputBoxProps {
  value: boolean;
  title: string;
  onChange: (value: boolean) => void;
}

export const ToggleInputBox: React.FC<ToggleInputBoxProps> = ({
  value,
  title,
  onChange
}) => {
  return (
    <FlexBox alignItems='center' marginBottom='1rem'>
      <Box marginRight='1rem'>
        <Heading5 fontWeight={FONT_WEIGHTS.light}>{title}</Heading5>
      </Box>
      <ToggleSwitch value={value} onChange={onChange} />
    </FlexBox>
  );
};

interface TextInputBoxProps {
  value: string;
  title: string;
  onChange: (value: string) => void;
}

export const TextInputBox: React.FC<TextInputBoxProps> = ({
  value,
  title,
  onChange
}) => {
  return (
    <FlexBox alignItems='center' marginBottom='1rem'>
      <TextInput
        value={value}
        label={title}
        placeholder={title}
        onChange={(e) => onChange(e.target.value)}
      />
    </FlexBox>
  );
};

interface SlideInputBoxProps {
  value: number;
  title: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  displayedValue?: string;
}

export const SlideInputBox: React.FC<SlideInputBoxProps> = ({
  value,
  title,
  onChange,
  min,
  max,
  step,
  unit,
  displayedValue
}) => {
  return (
    <FlexBox alignItems='center' marginBottom='1rem'>
      <Box marginRight='1rem'>
        <Heading5 fontWeight={FONT_WEIGHTS.light}>
          {title}: {displayedValue ?? value}
          {unit}
        </Heading5>
      </Box>
      <Box cursor='pointer'>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </Box>
    </FlexBox>
  );
};
