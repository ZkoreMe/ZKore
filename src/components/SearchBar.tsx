import { FC, useState } from "react";
import categoryData from "data/categoryData";
import reviewData from "data/reviewData";
import Link from "next/link";

const SearchBar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar los datos de revisión basándose en el término de búsqueda
  const filteredReviews =
    searchTerm.length > 0
      ? reviewData.filter((review) =>
          review.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
  const review = reviewData;
  return (
    <div className="flex flex-col gap-[24px] items-center justify-center">
      <div className="relative bg-[#FDFDFD] rounded-[8px] w-[340px] h-[46px] flex items-center">
        <input
          type="text"
          placeholder="I’m looking for..."
          className="bg-transparent p-[24px] pl-[24px] pt-[12px] pb-[12px] rounded-[8px] w-full h-full text-[14px] focus:outline-none border-[2px] border-solid border-[#010100] placeholder:text-[16px] placeholder:font-normal placeholder:text-[#777E90]"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <i
          className="ri-arrow-down-s-fill absolute right-4 text-[#777E90]"
          style={{ fontSize: "18px" }}
        ></i>
      </div>
      {/* Renderizar las opciones filtradas solo si el usuario ha empezado a escribir */}
      {searchTerm.length > 0 &&
        filteredReviews.map((review) => (
          <div className="w-full border-b-[2px] border-solid borde-[#292824]" key={review.id}>
            <Link href={`/reviewDetail/${review.id}`}>
              <div className="flex justify-start items-start">
                <span className="flex text-[#292824] text-[14px] font-normal">{review.title}</span>
              </div>
            </Link>
          </div>
        ))}
      <div className="relative w-[340px] h-[48px] rounded-[8px] bg-[#FED302] shadow-custom border-[2px] border-solid border-[#010100] flex items-center justify-center gap-[12px]">
        <i
          className="ri-search-2-line text-[#010100]"
          style={{ fontSize: "24px" }}
        ></i>
        <button className="bg-transparent text-[16px] font-medium text-[#010100] focus:outline-none">
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
