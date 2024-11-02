import React from "react";

const Table = ({
  caseCSS,
  colData,
  children,
}: {
  caseCSS: string;
  colData: string[];
  children: React.ReactNode;
}) => {
  return (
    <table>
      <thead className="bg-[#d0d0d0]">
        <tr>
          {colData.map((data, index) => {
            return (
              <th key={data + index} className={caseCSS}>
                {data}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
