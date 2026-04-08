/* eslint-disable react/prop-types */
import { Pagination } from "antd";

const DEFAULT_PAGE_SIZE = 5;

/**
 * Use with Ant Design Table: set pagination={false}, slice dataSource by page,
 * render this below the table.
 */
const CustomPagination = ({
  limit = DEFAULT_PAGE_SIZE,
  current = 1,
  total = 0,
  onChange,
  className = "",
}) => {
  const page = Math.max(1, current);
  const pageSize = Math.max(1, limit);
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const maxPage = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-4 ${className}`}
    >
      <div
        className="flex flex-wrap items-center gap-2 text-sm"
        style={{ color: "var(--color-text-muted)" }}
      >
        <span>Showing</span>
        <span
          className="inline-flex min-w-10 justify-center rounded-lg px-2 py-1 font-medium text-sm"
          style={{
            border: "1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)",
            color: "var(--color-text)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          {total === 0 ? "0" : `${start}–${end}`}
        </span>
        <span>of</span>
        <span className="font-medium" style={{ color: "var(--color-text)" }}>
          {total}
        </span>
        <span>results</span>
      </div>
      {total > 0 && (
        <Pagination
          responsive
          showSizeChanger={false}
          showQuickJumper={false}
          current={Math.min(page, maxPage)}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
          style={{ color: "var(--color-text)" }}
        />
      )}
    </div>
  );
};

export default CustomPagination;
