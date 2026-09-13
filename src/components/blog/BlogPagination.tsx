import { PaginationInterface } from "@/typescript/interface/pagination.interface";
import { Button } from "../ui/button";



const BlogPagination:React.FC<PaginationInterface> = ({ page, limit, setLimit, setPage }) => {
  return (
    <>
      <div className="mt-1 absolute right-16">
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              variant={"secondary"}
              className={
                "bg-red-500 text-white hover:bg-transparent hover:border-red-500 cursor-pointer"
              }
            >
              Prev
            </Button>
            <span className="font-bold text-xl">{page}</span>
            <Button
              onClick={() => setPage(page + 1)}
              variant={"secondary"}
              className={
                "bg-green-500 text-white hover:bg-transparent hover:border-green-500 cursor-pointer"
              }
            >
              Next
            </Button>
          </div>
          <div>
            <select
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
              className="border-2 border-gray-500 outline-none px-3 py-1"
            >
              <option value="5" className="bg-black">
                5
              </option>
              <option value="10" className="bg-black">
                10
              </option>
              <option value="15" className="bg-black">
                15
              </option>
              <option value="20" className="bg-black">
                20
              </option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPagination;
