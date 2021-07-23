import { BaseButton, BaseLink } from '../../uiParts/atoms';

import React from 'react';
type TProps = {
  className?: string;
  backPathname: string;
  backButtonName: string;
  disabledExecution?: boolean;
  nextButtonName: string;
};

const ExecutionAndBackButtons = ({
  className = '',
  backPathname,
  backButtonName,
  disabledExecution,
  nextButtonName,
}: TProps) => {
  return (
    <>
      <div className={className}>
        <BaseButton
          color={'primary'}
          disabled={disabledExecution}
          type={'submit'}
          variant={'contained'}
        >
          {nextButtonName}
        </BaseButton>
      </div>
      <hr className="my-5" />
      <div className="flex justify-center">
        <BaseLink pathname={backPathname}>
          <BaseButton color={'secondary'} variant={'contained'}>
            {backButtonName}へ戻る
          </BaseButton>
        </BaseLink>
      </div>
    </>
  );
};

export default ExecutionAndBackButtons;