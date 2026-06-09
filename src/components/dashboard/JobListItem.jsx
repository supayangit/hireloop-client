import React from "react";
import Link from "next/link";
import { FiTrash, FiEdit } from "react-icons/fi";
import { getCompanyById } from "@/lib/actions/company";

const JobListItem = async ({ job }) => {
  const { _id, title, deadline, companyId, createdAt } = job;

  const company = companyId ? await getCompanyById(companyId) : null;
  const companyName = company?.name || company?.title || company?.companyName || "-";

  return (
    <tr className="border-t border-white/[0.04]">
      <td className="px-4 py-3">
        <Link href={`/jobs/${_id}`} className="text-sm text-white font-medium hover:underline">
          {title}
        </Link>
      </td>

      <td className="px-4 py-3 text-sm text-zinc-300">{companyName}</td>

      <td className="px-4 py-3 text-sm text-zinc-300">
        {deadline ? new Date(deadline).toLocaleDateString() : "-"}
      </td>

      <td className="px-4 py-3 text-sm text-zinc-300">
        {createdAt ? new Date(createdAt).toLocaleDateString() : "-"}
      </td>

      <td className="px-4 py-3 text-sm text-zinc-300 text-right">
        <button aria-label="Delete job" title="Delete" className="text-zinc-400 hover:text-red-400">
          <FiTrash />
        </button>
      </td>

      <td className="px-4 py-3 text-sm text-zinc-300 text-right">
        <button aria-label="Edit job" title="Edit" className="text-zinc-400 hover:text-indigo-400">
          <FiEdit />
        </button>
      </td>
    </tr>
  );
};

export default JobListItem;
