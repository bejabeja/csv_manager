import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Card from "../components/Card";
import Input from "../components/Input";
import List from "../components/List";
import { searchData } from "../services/search";
import { type Data, type Pagination } from "../types";

import CsvLogo from "../assets/CsvLogo";

export const Search = ({
  initialData,
  initialPagination,
  resetToInitialState,
}: {
  initialData: Data;
  initialPagination: Pagination | null;
  resetToInitialState: () => void;
}) => {
  const [data, setData] = useState<Data>(initialData);
  const [pagination, setPagination] = useState<Pagination | null>(
    initialPagination
  );
  const [currentPage, setCurrentPage] = useState<number>(
    pagination?.currentPage || 1
  );
  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("q") ?? "";
  });

  const DEBOUNCE_TIME = 500;
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newPathname =
      search === "" ? window.location.pathname : `?q=${debouncedSearch}`;

    window.history.pushState({}, "", newPathname);
  }, [debouncedSearch]);

  useEffect(() => {
    searchData(debouncedSearch ? debouncedSearch : "", currentPage, 10).then(
      (response) => {
        const [err, newData, newPagination] = response;
        if (err) {
          toast.error(err.message);
          return;
        }
        if (newData) {
          setData(newData);
        }
        if (newPagination) {
          setPagination(newPagination);
        }
      }
    );
  }, [debouncedSearch, currentPage]);

  if (initialData.length === 0) {
    return <p>Your CSV is empty</p>;
  }

  return (
    <div>
      <Toaster></Toaster>
      <a onClick={resetToInitialState}>
        <CsvLogo width={150} height={150} isClickable={true} />
      </a>

      <form>
        <Input
          onChange={handleSearch}
          type="search"
          placeholder="Search information..."
          value={search}
        ></Input>
      </form>

      <List>
        {data.map((row, index) => (
          <li key={index}>
            <Card row={row} />
          </li>
        ))}
      </List>

      {pagination && (
        <div>
          <button
            onClick={() => {
              const prevPage = Math.max(1, currentPage - 1);
              setCurrentPage(prevPage);
            }}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => {
              const nextPage = Math.min(pagination.totalPages, currentPage + 1);
              setCurrentPage(nextPage);
            }}
            disabled={currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
