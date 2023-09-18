import React, { useCallback, useState } from 'react';
import { Grid } from '../components/Grid';
import { ColumnRenderer, OnDataUpdate } from '../types/Grid';
import { Autocomplete } from '../components/autocomplete/Autocomplete';
import { brands, categories } from './Data';

type FakeCategory = { id: number; content: string };
type FakeBrand = { id: number; content: string };

type FakeProductType = {
  id: number;
  name: string;
  category: FakeCategory | null;
  brand: FakeBrand | null;
};

const FakeProduct = (id: number): FakeProductType => ({
  id: id,
  name: 'A product name',
  category: null,
  brand: null,
});

export const Example = () => {
  const [data, setData] = useState<FakeProductType[]>([
    FakeProduct(0),
    FakeProduct(1),
    FakeProduct(2),
  ]);

  const onFieldChange: OnDataUpdate<FakeProductType> = useCallback(
    (rowIndex, field, value) => {
      const newData = [...data];

      if (Array.isArray(rowIndex)) {
        rowIndex.forEach((rI) => {
          const row = newData[rI];
          row[field as string] = value;
        });
      } else {
        const row = newData[rowIndex];
        row[field as string] = value;
      }

      setData([].concat(newData));
    },
    [data]
  );

  const columns: ColumnRenderer<FakeProductType>[] = [
    {
      title: () => 'Id',
      value: (row) => row.id,
      readonly: true,
    },
    {
      title: () => 'Name',
      value: (row) => row.name,
      readonly: true,
    },
    {
      title: () => 'Category',
      value: (row, state) => (
        <Autocomplete
          name={'category'}
          data={categories}
          value={row.category}
          placeholder={'Select category'}
          onChange={(category) =>
            onFieldChange(state.rowIndex, 'category', category)
          }
        />
      ),
    },
    {
      title: () => 'Brand',
      value: (row, state) => (
        <Autocomplete
          name={'brand'}
          data={brands}
          value={row.brand}
          placeholder={'Select brand'}
          onChange={(brand) => onFieldChange(state.rowIndex, 'brand', brand)}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
      }}
    >
      <h1>Verzla table sheets example</h1>
      <p>
        Hold down (CMD or CTRL) and click on cells in the same column to edit
        multiple rows.
      </p>
      <Grid data={data} onChange={onFieldChange} columns={columns} />
    </div>
  );
};
