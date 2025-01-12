import React, { ReactNode } from 'react';
import { BaseLabel, BaseRequired, BaseTextField } from '../uiParts/atoms';
import { TSize, TVariant } from '../uiParts/atoms/form/BaseTextField';
import useIsAfterSsr from '../../../customHook/useIsAfterSsr';

type TProps = {
  FieldClass?: string;
  children: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  onBlur: any;
  onChange: any;
  value: string;
  size?: TSize;
  variant?: TVariant;
  wrapClass?: string;
  labelClass?: string;
};

const LabelAndTextField = ({
  FieldClass = '',
  children,
  disabled,
  fullWidth = true,
  id,
  label,
  onBlur,
  onChange,
  size = 'small',
  value,
  variant = 'outlined',
  wrapClass = '',
  labelClass = '',
}: TProps) => {
  const isAfterSsr = useIsAfterSsr();
  return (
    <>
      {isAfterSsr && (
        <div className={wrapClass}>
          <BaseLabel htmlFor={id} className={labelClass}>
            {label}
            <BaseRequired>必須</BaseRequired>
          </BaseLabel>
          <BaseTextField
            {...{
              disabled,
              fullWidth,
              id,
              onBlur,
              onChange,
              value,
              size,
              variant,
            }}
            className={FieldClass}
          />
          {children}
        </div>
      )}
    </>
  );
};

export default LabelAndTextField;
