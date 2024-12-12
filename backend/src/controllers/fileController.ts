import csvToJson from "convert-csv-to-json";
import { Request, Response } from "express";
import { getPagination } from "../utils/pagination";

let csvData: Array<Record<string, string>> = [];

export const uploadFile = async (req: Request, res: Response): Promise<any> => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: "File is required" });
  }

  if (file.mimetype !== "text/csv") {
    return res.status(400).json({ message: "File must be CSV" });
  }

  let json: Array<Record<string, string>> = [];

  try {
    const rawCsv = Buffer.from(file.buffer).toString("utf-8");
    json = csvToJson.fieldDelimiter(",").csvStringToJson(rawCsv);
  } catch (error) {
    console.error("Error parsing the file:", error);
    return res.status(500).json({ message: "Error parsing the file" });
  }

  // svae in memory
  csvData = json;

  // Pagination
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const { paginatedData, currentPage, totalPages, totalItems } = getPagination(
    limitNumber,
    pageNumber,
    csvData
  );

  return res.status(200).json({
    data: paginatedData,
    message: "El archivo se cargó correctamente",
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: limitNumber,
    },
  });
};

export const getCsvData = async (req: Request, res: Response): Promise<any> => {
  const { q = "", page = "1", limit = "10" } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ message: "Page must be a positive integer" });
  }
  if (isNaN(limitNumber) || limitNumber < 1) {
    return res
      .status(400)
      .json({ message: "Limit must be a positive integer" });
  }

  let filteredData = csvData;
  if (q) {
    const search = q.toString().toLowerCase();
    filteredData = csvData.filter((row) =>
      Object.values(row).some((value) => value.toLowerCase().includes(search))
    );
  }

  // Pagination
  const { paginatedData, currentPage, totalPages, totalItems } = getPagination(
    limitNumber,
    pageNumber,
    filteredData
  );

  return res.json({
    data: paginatedData,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: limitNumber,
    },
  });
};
