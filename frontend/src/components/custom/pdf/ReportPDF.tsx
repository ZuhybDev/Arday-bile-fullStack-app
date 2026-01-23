import { studentData } from "@/app/(dashboard)/dashboard/studentInfo/page";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const GenerateStudentPDF = (studentInfo: studentData) => {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const marginX = 16;
  const headerHeight = 32;

  /* ================= HEADER ================= */
  doc.setFillColor(20, 35, 70);
  doc.rect(0, 0, pageWidth, headerHeight, "F");

  doc.setTextColor(255);
  doc.setFontSize(16);
  doc.text(studentInfo.school, marginX, 20);

  doc.setFontSize(10);
  doc.setTextColor(210);
  doc.text("Student Performance Report", marginX, 27);

  doc.setTextColor(0);

  /* ================= STUDENT INFO CARD ================= */
  const cardY = headerHeight + 8; // ⬅️ moved UP
  const cardHeight = 34;

  doc.setFillColor(245, 247, 250);
  doc.roundedRect(
    marginX,
    cardY,
    pageWidth - marginX * 2,
    cardHeight,
    4,
    4,
    "F",
  );

  // LEFT INFO
  doc.setFontSize(12);
  doc.setTextColor(30);
  doc.text(studentInfo.name, marginX + 8, cardY + 13);

  doc.setFontSize(10);
  doc.setTextColor(90);
  doc.text(`Class: ${studentInfo.className}`, marginX + 8, cardY + 22);
  doc.text(`Code: ${studentInfo.code}`, marginX + 8, cardY + 30);

  // RIGHT SUMMARY
  const rightX = pageWidth - marginX - 68;

  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text("Total", rightX, cardY + 13);
  doc.text("Average", rightX, cardY + 22);
  doc.text("Grade", rightX, cardY + 30);

  doc.setTextColor(20);
  doc.text(String(studentInfo.total), rightX + 22, cardY + 13);
  doc.text(String(studentInfo.average), rightX + 22, cardY + 22);
  doc.text(String(studentInfo.grade), rightX + 22, cardY + 30);

  /* ================= SUBJECTS TABLE ================= */
  const tableStartY = cardY + cardHeight + 12;

  autoTable(doc, {
    startY: tableStartY,
    head: [["Subject", "Grade", "Status"]], // ❌ Pass Mark removed
    body: studentInfo.subjects.map((sub) => [
      sub.name,
      String(sub.grade),
      sub.status,
    ]),
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [20, 35, 70],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250],
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 35, halign: "center" },
      2: { cellWidth: 45, halign: "center" },
    },
  });

  /* ================= FOOTER ================= */
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    `© ${new Date().getFullYear()} ${studentInfo.school}. All rights reserved. By ZuhybDev`,
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" },
  );

  doc.save(`${studentInfo.name}_Report.pdf`);
};

export default GenerateStudentPDF;
