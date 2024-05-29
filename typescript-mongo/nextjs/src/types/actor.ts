import { OrderByItem } from './generic';

export type AggregateActorCustomQuery = [{ _id: null; totalCount: number }];

export const ITEMS_ORDER_BY: OrderByItem[] = [
  {
    label: 'Actor id',
    value: 'id',
  },
  {
    label: 'First name',
    value: 'firstName',
  },
  {
    label: 'Last name',
    value: 'lastName',
  },
  {
    label: 'Last update',
    value: 'lastUpdate',
  },
];
