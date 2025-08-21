import React from "react";
import type { Vacancy } from "../../Types/userTypes";

function VacancyCard({
  title,
  companyName,
  createdAt,
  applicationDeadline,
  companyLogo,
}: Vacancy) {
  return (
    <div
      className="cursor-pointer grid grid-cols-4 items-center gap-4 py-4 px-4 hover:bg-gray-50 border-b
      max-[1024px]:grid-cols-2 border-gray-200  max-[550px]:grid-cols-1"
    >
      <div>
        <h3 className="hidden max-lg:block text-[15px] font-semibold text-indigo">
          Vacancy Name:
        </h3>
        <p className="font-medium text-black text-base">{title}</p>
      </div>

      <div className="relative">
        <h3 className="hidden max-lg:block text-[15px] font-semibold text-indigo mb-1  max-[550px]:mb-2">
          Company:
        </h3>
        <div className="flex items-center gap-3  ">
          <div className="w-10 h-10 flex-shrink-0 absolute left-[-50px] max-[550px]:left-[70px]">
            {companyLogo && (
              <img
                src={`/uploads/${companyLogo}`}
                alt={companyName}
                className="w-10 h-10 rounded-full object-cover border"
              />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-black text-base leading-tight">{companyName}</p>
          </div>
        </div>
      </div>

      {/* Created At */}
      <div>
        <h3 className="hidden max-lg:block text-[15px] font-semibold text-indigo">
          Created At:
        </h3>
        <p className="text-black text-base">{createdAt}</p>
      </div>

      {/* Application Deadline */}
      <div>
        <h3 className="hidden max-lg:block text-[15px] font-semibold text-indigo">
          Application Deadline:
        </h3>
        <p className="text-black text-base">{applicationDeadline}</p>
      </div>
    </div>
  );
}

export default VacancyCard;
