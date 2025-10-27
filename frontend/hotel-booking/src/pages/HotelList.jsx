import React from "react";
import { useState } from "react";
import SearchBar from "../../components/hotelList/SearchBar";
import FilterSidebar from "../../components/hotelList/FilterSidebar";
import HotelList from "../../components/hotelList/HotelList";
import Header from "../../components/homepage/Header";
import Footer from "../../components/homepage/Footer";

const HotelListPage = () => {
  // data lọc khách sạn
  const [filters, setFilters] = useState({});
  //
  const [searchData, setSearchData] = useState({
    guests: 2,
    checkIn: "",
    checkOut: "",
  });

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (data) => {
    setSearchData(data);
    console.log("🔹 Dữ liệu từ SearchBar:", data);
  };
  return (
    <>
      <Header />

      <div className="container mx-auto my-6 px-4">
        {/* Search bar trên cùng */}
        <div className="mb-6">
          <SearchBar  onSearchChange={handleSearchChange}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar bên trái */}
          <div className="md:col-span-3">
            <FilterSidebar onFilter={handleFilter}/>
          </div>

          {/* Danh sách khách sạn */}
          <div className="md:col-span-9">
            <HotelList filters={filters} searchData={searchData}/>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HotelListPage;
