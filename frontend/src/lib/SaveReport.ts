const reportExpire = 10 * 60 * 1000;

export const saveReport = (report: any) => {
  sessionStorage.setItem(
    "student_report",
    JSON.stringify({
      data: report,
      savedAt: Date.now(),
    }),
  );

  return () => {
    if (Date.now() > reportExpire) {
      sessionStorage.clear();
    }
  };
};
