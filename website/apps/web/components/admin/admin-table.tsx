import type { ReactNode } from "react";

export function AdminTable({
  columns,
  children,
  empty
}: {
  columns: string[];
  children: ReactNode;
  empty?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-primary-100/80 bg-white shadow-sm shadow-primary-100/30">
      <table className="w-full">
        <thead>
          <tr className="border-b border-primary-100 bg-primary-50/50">
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-800/80"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-50">
          {empty ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-slate-500"
              >
                Nothing here yet.
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}
