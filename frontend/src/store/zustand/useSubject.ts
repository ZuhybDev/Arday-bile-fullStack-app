"use client";

import { api } from "@/axios/client";
import { create } from "zustand";

// Improved: renamed 'subject' to 'subjects', added error handling, and better type safety

type Subject = {
  id: string;
  name: string;
  passMark: number;
};

type SubjectApiResponse = {
  id: string;
  name: string;
  passMark: number;
};

type SubjectStore = {
  subjects: Subject[];
  fetchSubjects: () => Promise<void>;
  error: string | null;
  loading: boolean;
};

export const useSubjectStore = create<SubjectStore>((set) => ({
  subjects: [],
  error: null,
  loading: false,
  fetchSubjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/subjects/subject-data");
      const { allsubjects } = res.data;
      const formattedSubjects: Subject[] = allsubjects.map((subject: SubjectApiResponse) => ({
        id: subject.id,
        name: subject.name,
        passMark: subject.passMark,
      }));
      set({ subjects: formattedSubjects, loading: false });
    } catch (err: any) {
      set({ error: err?.message || "Failed to fetch subjects", loading: false });
    }
  },
}));
