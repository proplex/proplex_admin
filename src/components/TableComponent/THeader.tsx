import React from "react";
import { flexRender, HeaderGroup } from "@tanstack/react-table";

interface THeaderProps {
  headerGroups: HeaderGroup<any>[];
}

const THeader: React.FC<THeaderProps> = ({ headerGroups }) => {
  return (
    <thead className="bg-gray-50">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const headerContent = flexRender(
              header.column.columnDef.header,
              header.getContext()
            );
            return (
              <th
                key={header.id}
                className="relative p-2 border-b text-left text-sm font-medium"
                style={{ maxWidth: header.getSize() }}
                colSpan={header.colSpan}
              >
                <div
                  className={`flex items-center justify-between h-full pr-2 ${
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  }`}
                  onClick={header.column.getToggleSortingHandler()}
                  title={String(headerContent)}
                >
                  <span className="truncate">{headerContent}</span>
                  <span className="w-1">
                    {header.column.getCanSort() && (
                      <span className="ml-[1px] text-xs">
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? ""}
                      </span>
                    )}
                  </span>
                </div>
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onDoubleClick={() => header.column.resetSize()}
                    className="absolute right-0 top-0 h-full w-[2px] bg-gray-100 hover:bg-gray-500 cursor-col-resize select-none transition-colors duration-200"
                    style={{ touchAction: "none" }}
                  />
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default THeader;