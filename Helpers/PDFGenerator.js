import jsPDF from "jspdf"
import autoTable from "jspdf-autotable";
function PDFGenerator(linestate, TableData) {

  var doc = new jsPDF();
  const imgData = linestate;
  // doc.add
  doc.setFont('helvetica')
  doc.text(90, 10, 'JSPDF')

  doc.setFont('times')
  doc.setFontSize('10')
  doc.text(10, 30, 'Program Details.')

  doc.autoTable({ head: TableData.head, body: TableData.body, theme: TableData.theme, startY: TableData.startY });

  doc.setFont('times')
  doc.setFontSize('10')
  doc.text(10, 120, 'Access count of each programs.')
  doc.addImage(imgData, 'PNG', 10, 130, 180, 150, ImageData, "SLOW");
  doc.text(130,290,"Copyright © 2022 Burning Glass Technologies")
  
  doc.save("InsightPortal.pdf")
}
export default PDFGenerator