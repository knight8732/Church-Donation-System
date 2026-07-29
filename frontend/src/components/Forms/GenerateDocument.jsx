/**
 * @file GenerateDocument.jsx
 * @description Document generation engine for the platform.
 * Transforms database schemas directly into styled Microsoft Word (.docx) binaries.
 */
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  AlignmentType, 
  WidthType, 
  BorderStyle,
  PageBreak
} from "docx";
import { saveAs } from "file-saver";

/**
 * Helper: Factory utility mapping standard cell layout properties.
 * Strips borders and enforces explicit cell padding to maintain alignment structure.
 * 
 * @param {string} text - Cell string payload
 * @param {boolean} [isLabel=false] - Enforces bold styling weight parameters
 * @param {string} [shading="FFFFFF"] - Background container background hex code color
 * @param {number} [alignment=AlignmentType.LEFT] - Horizontal paragraph alignments
 * @param {string} [customColor="555555"] - Text color hexadecimal string
 * @returns {TableCell} Formatted table cell object primitive
 */

const createTableCell = (text, isLabel = false, shading = "FFFFFF", alignment = AlignmentType.LEFT, customColor = "555555") => {
  return new TableCell({
    shading: { fill: shading },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
    },
    // Margins measured in dxa (Twips / twentieth of a point). 160 dxa = 8pt padding.
    margins: { top: 160, bottom: 160, left: 160, right: 160 },
    children: [
      new Paragraph({
        alignment: alignment,
        children: [
          new TextRun({
            text: text,
            bold: isLabel || customColor === "000000",
            size: 32, // 16pt font size (docx interprets values in half-points)
            color: isLabel ? customColor : "000000",
            font: "Arial",
          }),
        ],
      }),
    ],
  });
};

/**
 * Main Exported Document Engine
 * Iterates through active arrays to construct distinct receipt sheets separated by formal page breaks.
 * Handles dynamic filename assignments depending on bulk or individual download parameters.
 * 
 * @async
 * @param {Object[]} members - Target collection dataset array mapping matching row properties
 * @returns {Promise<void>} Resolves when browser download stream completes execution
 */
export const generateAllReceipts = async (members) => {
  if (!members || members.length === 0) return;

  const currentYear = new Date().getFullYear();
  const docChildren = [];
  let memberName = ""

  members.forEach((member, index) => {
    const churchName = member.church_detail?.name || "First Baptist Church Family International";
    const pastorName = member.church_detail?.pastor || "Church Administration";
    const totalYtd = parseFloat(member.annual_donations || 0).toFixed(2);
    memberName = member.full_name;

    // 1. Header (Centered Title Block)
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: churchName,
            bold: true,
            size: 52, // 26pt
            color: "1B5E20",
            font: "Arial",
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120 },
        children: [
          new TextRun({
            text: "Annual Official Contribution Receipt",
            bold: true,
            size: 40, // 20pt
            font: "Arial",
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 600 },
        children: [
          new TextRun({
            text: `Calendar Year: ${currentYear}`,
            size: 28, // 14pt
            color: "666666",
            font: "Arial",
            italic: true,
          }),
        ],
      })
    );

    // 2. Body Text Statement
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 600 },
        lineSpacing: { before: 120, after: 120, line: 360 },  // Smooth text tracking representation (1.5 line height)
        children: [
          new TextRun({ text: "This certifies that ", size: 32, font: "Arial" }),
          new TextRun({ text: member.full_name, bold: true, size: 32, font: "Arial" }),
          new TextRun({ text: " has faithfully contributed financial tithes and offerings to ", size: 32, font: "Arial" }),
          new TextRun({ text: churchName, bold: true, size: 32, font: "Arial" }),
          new TextRun({ text: ` for the calendar window of ${currentYear}. These charitable contributions were made in support of church ministries, local operations, and community initiatives.`, size: 32, font: "Arial" }),
        ],
      })
    );

    // 3. Summary Block Table Mapping
    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              createTableCell("Donor Account Name:", true, "FCFCF9", AlignmentType.LEFT),
              createTableCell(member.full_name, true, "FCFCF9", AlignmentType.RIGHT, "000000"),
            ],
          }),
          new TableRow({
            children: [
              createTableCell("Associated Branch Node:", true, "FCFCF9", AlignmentType.LEFT),
              createTableCell(churchName, false, "FCFCF9", AlignmentType.RIGHT),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                shading: { fill: "FCFCF9" },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 16, color: "1B5E20" },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                margins: { top: 200, bottom: 200, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.LEFT,
                    children: [new TextRun({ text: "Total Year-To-Date (YTD) Contribution:", bold: true, size: 36, color: "1B5E20", font: "Arial" })],
                  }),
                ],
              }),
              new TableCell({
                shading: { fill: "FCFCF9" },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 16, color: "1B5E20" },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                margins: { top: 200, bottom: 200, left: 200, right: 200 },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: `$${totalYtd}`, bold: true, size: 44, color: "1B5E20", font: "Arial" })],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );

    // 4. Disclaimer Footer Text
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 600, after: 1200 },
        children: [
          new TextRun({
            text: "Thank you for your generous support and partnership in ministry. Your contributions are tax-deductible under standard charitable organization guidelines. No goods or services were provided in exchange for this contribution other than intangible religious benefits.",
            size: 28, // 14pt
            color: "666666",
            italic: true,
            font: "Arial",
          }),
        ],
      })
    );

    // 5. Signature and References Block
    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              // Left Column: Ref Details
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: `Date of Issue: ${new Date().toLocaleDateString('en-CA')}`, size: 28, color: "555555", font: "Arial" })],
                  }),
                  new Paragraph({
                    spacing: { before: 100 },
                    children: [new TextRun({ text: `System Ref: REC-${member.id}-${currentYear}`, size: 28, color: "555555", font: "Arial" })],
                  }),
                ],
              }),
              // Right Column: Signatures Line
              new TableCell({
                width: { size: 50, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 8, color: "333333" }, 
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 100 },
                    children: [
                      new TextRun({ text: pastorName, size: 28, font: "Arial" })
                    ],
                  }),
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 60 },
                    children: [
                      new TextRun({ text: "Authorized Representative", size: 24, color: "666666", font: "Arial" })
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );

    // Inject manual section break profiles except for the absolute last row index item
    if (index < members.length - 1) {
      docChildren.push(new Paragraph({ children: [new PageBreak()] }));
    }
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: docChildren,
    }],
  });

  try {
    const blob = await Packer.toBlob(doc);
    // Evaluates dynamic naming conditions to produce localized artifact names
    const dynamicFilename = members.length === 1 
      ? `Church_Donation_Receipt_${memberName.replace(/\s+/g, '_')}_${currentYear}.docx` 
      : `Church_Donation_Receipts_${currentYear}.docx`;
    
    saveAs(blob, dynamicFilename);
    
  } catch (error) {
    console.error("Error writing out DOCX artifact structure streams:", error);
  }
};
