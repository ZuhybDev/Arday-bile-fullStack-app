import React from "react";

const page = () => {
  const studetnData = {
    message: "Student data",
    student: {
      id: "e318792e-da0d-4032-829f-cd9a13b1bf24",
      name: "zuhaib ahmed cali",
      code: "5947",
      role: "STUDENT",
      school: {
        name: "Zuhaib Seconday School",
      },
    },
    formattedResult: [
      {
        name: "somali",
        grade: 90,
        status: "B",
      },
      {
        name: "English",
        grade: 100,
        status: "A",
      },
      {
        name: "Sceince",
        grade: 70,
        status: "C",
      },
      {
        name: "Arabic",
        grade: 80,
        status: "B",
      },
      {
        name: "Tarbia",
        grade: 90,
        status: "B",
      },
      {
        name: "maths",
        grade: 80,
        status: "B",
      },
      {
        name: "social",
        grade: 100,
        status: "A",
      },
    ],
    total: 610,
    average: 87.14285714285714,
    grade: "B",
  };
  return <div>student data here</div>;
};

export default page;
