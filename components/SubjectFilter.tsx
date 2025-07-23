"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

interface SubjectFilterProps {
  placeholder?: string;
}

const SubjectFilter = ({
  placeholder = "Select subject",
}: SubjectFilterProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSubject = searchParams.get("subject") || "";

  const [selectedSubject, setSelectedSubject] =
    useState<string>(currentSubject);

  // Update local state when URL changes
  useEffect(() => {
    setSelectedSubject(currentSubject);
  }, [currentSubject]);

  const handleSubjectChange = (value: string) => {
    const subject = value === "all" ? "" : value;
    setSelectedSubject(subject);

    if (subject) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
      router.push(newUrl, { scroll: false });
    } else {
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="w-full max-w-xs">
      <Select
        value={selectedSubject || "all"}
        onValueChange={handleSubjectChange}
      >
        <SelectTrigger className="w-full border border-black rounded-lg px-2 py-1 h-fit bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-black">
          <SelectValue placeholder={placeholder} className="text-sm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
``;
