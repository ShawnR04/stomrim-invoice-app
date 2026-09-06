declare module "jspdf-autotable" {
  import { jsPDF } from "jsPDF";
  
  // Define permitted input types for a single table cell
  type CellInput = string | number | null | undefined;
  // A row is an array of cell input values
  type RowInput = CellInput[];

  // Options configuration interface for the autoTable plugin
  interface UserOptions {
    startY?: number;
    head?: RowInput[];
    body?: RowInput[];
    foot?: RowInput[];
    theme?: "striped" | "grid" | "plain";
    headStyles?: Record<string, string | number>;
    bodyStyles?: Record<string, string | number>;
    [key: string]: unknown;
  }

  // Standalone autoTable function signature
  function autoTable(doc: jsPDF, options: UserOptions): jsPDF;
  export default autoTable;
  
  // Module augmentation to extend jsPDF prototype methods and properties
  module "jspdf" {
    interface jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
      lastAutoTable: {
        finalY: number;
      };
    }
  }
}