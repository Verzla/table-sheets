// @ts-ignore
import React, { useCallback, useState } from 'react';
import { Grid } from '../components/Grid';
import { ColumnRenderer, OnDataUpdate } from '../types/Grid';

type FakeCategory = { id: number; name: string };
type FakeBrand = { id: number; name: string };

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
      const row = newData[rowIndex];
      row[field as string] = value;
      setData([].concat(newData));
    },
    [data]
  );

  const columns: ColumnRenderer<FakeProductType>[] = [
    {
      title: () => "Id",
      value: (row) => row.id
    },
    {
      title: () => "Name",
      value: (row) => row.name
    },
    {
      title: () => "Category",
      value: (row) => row.category ? row.category.id : 'null',
    },
    {
      title: () => "Brand",
      value: (row) => row.brand ? row.brand.id : 'null'
    },
  ];

  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
      }}
    >
      <Grid
        data={data}
        onChange={onFieldChange}
        columns={columns}
      />
    </div>
  );
};
