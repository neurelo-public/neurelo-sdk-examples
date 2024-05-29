import { OrderByItem } from './generic';

export type AggregateFilmsCustomQuery = [{ _id: null; totalCount: number }];

export const ITEMS_ORDER_BY: OrderByItem[] = [
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'Film id',
    value: 'id',
  },
  {
    label: 'Last update',
    value: 'lastUpdate',
  },
  {
    label: 'Length',
    value: 'length',
  },
  {
    label: 'Release year',
    value: 'releaseYear',
  },
  {
    label: 'Rental duration',
    value: 'rentalDuration',
  },
  {
    label: 'Rental rate',
    value: 'rentalRate',
  },
  {
    label: 'Replacement cost',
    value: 'replacementCost',
  },
  {
    label: 'Title',
    value: 'title',
  },
] as const;
