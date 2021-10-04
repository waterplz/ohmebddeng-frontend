import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { LEVEL, TASTE } from '@/types';
import { SpicyLevelInput, TasteTagInput } from '@/components/Common';
import useInput from '@/hooks/useInput';

interface Props {
  name: string;
}

const FoodReview = ({ name }: Props, ref: React.Ref<any>) => {
  const [levelValue, levelValueChangeHandler] = useInput();
  const [tasteValues, setTasteValues] = useState<Set<string>>(new Set());

  const tasteValueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = (event.target as HTMLInputElement).value;
    if (tasteValues.has(target))
      setTasteValues(
        (prev) => new Set(Array.from(prev).filter((v) => v !== target))
      );
    else setTasteValues((prev) => new Set(prev.add(target)));
  };

  useImperativeHandle(
    ref,
    () => ({ levelValue, tasteValue: Array.from(tasteValues) }),
    [levelValue, tasteValues]
  );

  return (
    <section>
      <h2>{name}</h2>
      <form>
        {Object.values(LEVEL).map((name) => (
          <SpicyLevelInput
            key={name}
            name={name}
            onChange={levelValueChangeHandler}
            checked={levelValue === name}
          />
        ))}
      </form>
      <form>
        {Object.values(TASTE).map((name) => (
          <TasteTagInput
            key={name}
            name={name}
            onChange={tasteValueChangeHandler}
            checked={tasteValues.has(name)}
          />
        ))}
      </form>
    </section>
  );
};

export default forwardRef(FoodReview);
