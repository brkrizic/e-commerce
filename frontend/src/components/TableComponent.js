// components/TableComponent.jsx
import React from "react";

const TableComponent = ({
  data = [],
  columns = [],
  selectedKey = [],
  onSelect = () => {},
  onSelectAll = () => {},
  enableSelection = true,
}) => {
  const isAllSelected = data.length > 0 && selectedKey.length === data.length;

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {enableSelection && (
            <th scope="col">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onSelectAll}
              />
            </th>
          )}
          {columns.map((col, idx) => (
            <th key={idx} scope="col">{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={row._id || index}>
              {enableSelection && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedKey.includes(row._id)}
                    onChange={() => onSelect(row._id)}
                  />
                </td>
              )}
              {columns.map((col, idx) => (
                <td key={idx}>
                  {col.format ? col.format(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (enableSelection ? 1 : 0)} className="text-center">
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
