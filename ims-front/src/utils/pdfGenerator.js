import jsPDF from "jspdf";
export const generatePdf = async (data, heading) => {
  try {
    const doc = new jsPDF();
    doc.text(heading, 10, 10);
    let y = 20;
    if (heading == "monhly complaints") {
      data.forEach((month) => {
        //console.log(month)
        const keys = Object.values(month);

        doc.text(`${keys[0]}:resolved:${keys[1]},pending:${keys[2]}`, 10, y);
        y += 10;
      });
    }
    if (heading != "monhly complaints") {
      data.forEach((month) => {
        //console.log(month)
        const keys = Object.values(month);

        doc.text(
          `${keys[0]}:Assigined:${keys[1]},unAssigined:${keys[2]}`,
          10,
          y
        );
        y += 10;
      });
    }

    // Save the PDF
    doc.save("report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
