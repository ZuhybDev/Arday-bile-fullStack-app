import { api } from "@/axios/client";
import { create } from "zustand";

type Subject = {
  id: string;
  name: string;
  passMark: number;
};

type SubjectStore = {
  subject: Subject[];
  fetchSubject: () => Promise<void>;
};

export const useSubjectStore = create<SubjectStore>((set) => ({
  subject: [],
  fetchSubject: async () => {
    const res = await api.get("/subjects/subject-data");
    const { allsubjects } = res.data;
    const formattedSubjects: Subject[] = allsubjects.map((subject: any) => ({
      id: subject.id,
      name: subject.name,
      passMark: subject.passMark,
    }));
    set({ subject: formattedSubjects });
  },
}));
