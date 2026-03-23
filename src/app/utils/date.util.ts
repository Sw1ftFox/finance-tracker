import { TuiDay } from '@taiga-ui/cdk';

const nowDate = new Date();

export const getToday = (): TuiDay => {
  return new TuiDay(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
};
