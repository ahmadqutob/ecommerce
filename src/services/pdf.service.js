import fs from "fs";
import PDFDocument from "pdfkit" ;


function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}
// start header
function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })   //logo image
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)           //company name
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" }) //company name
    .text("123 Main Street", 200, 65, { align: "right" }) //address
    .text("New York, NY, 10025", 200, 80, { align: "right" })//city
    .moveDown();
}
// end header

// start customer information
function generateCustomerInformation(doc, invoice) { 
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);  

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop) //invoice number
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop) // import invoice number
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)//invoice date
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30) //invoice final Price
    .text(
      formatCurrency(invoice.subtotal - invoice.paid), //sssssss
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop) //import customer name
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15) //import customer name
    .text(
      invoice.shipping.city + //import customer city
        ", " +
        invoice.shipping.status + //import customer status
        ", " +
        // invoice.shipping.country, //import customer country
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}
// end customer information


// start table product 
function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "productId",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20); //horizantal line <hr>
  doc.font("Helvetica");
// items: order.products -> from DB
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i]; //invoice={ items[{.1.},{.2.}] } 
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,  
      item.productId, 
      formatCurrency(item.unitePrice *100), 
      item.qty  , 
      formatCurrency(item.finalPrice  *100)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal) //from invoice object
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid) //from invoice object
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}
// end table product 

// start Footer 
function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
// start Footer 

  export default createInvoice;
 