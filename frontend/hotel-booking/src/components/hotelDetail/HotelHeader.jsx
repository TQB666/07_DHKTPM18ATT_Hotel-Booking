export default function HotelHeader({hotel, onSelectRoomClick }) {
 

  // goi api 
  
  if (!hotel) return <p>Đang tải dữ liệu khách sạn...</p>;
  const hotelImages = [hotel.images];
  const minPrice = hotel?.rooms?.length
  ? Math.min(...hotel.rooms.map(r => r.price))
  : 0;
  return (
    <div className=" mx-auto my-6 px-4 max-w-7xl">
      {/* Info hotel */}
<div className="grid grid-cols-1 md:grid-cols-12 items-center bg-white shadow p-6 rounded-lg">
  {/* Cột trái: Tên, mô tả, địa chỉ, liên hệ */}
  <div className="md:col-span-8 space-y-2">
    {/* Tên khách sạn + nhãn + sao */}
    <div className="flex flex-wrap items-center gap-2">
      <h4 className="font-bold text-xl">{hotel.name}</h4>
      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
        Khách Sạn
      </span>
      <span className="text-yellow-400 text-lg">
        {Array.from({ length: hotel.rating }, (_, i) => (
          <span key={i}>★</span>
        ))}
      </span>
    </div>

    {/* Mô tả chi tiết */}
    {hotel.detailDesc && (
      <p className="text-gray-600 text-sm italic">
        {hotel.detailDesc}
      </p>
    )}

    {/* Địa chỉ & Liên hệ */}
    <div className="text-gray-500 text-sm space-y-1 mt-2">
      <div>📍 <span className="text-gray-700">{hotel.address}</span></div>
      <div>📞 <span className="text-gray-700">{hotel.phone}</span></div>
    </div>
  </div>

  {/* Cột phải: Giá & nút chọn */}
  <div className="md:col-span-4 text-left md:text-right mt-4 md:mt-0">
    <div className="text-gray-500 text-sm">Giá/phòng/đêm từ</div>
    <div className="text-2xl font-bold text-red-600">
      {minPrice.toLocaleString("vi-VN")} VND
    </div>
    <button 
      className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded cursor-pointer"
      onClick={onSelectRoomClick}>
      Chọn phòng
    </button>
  </div>
</div>


      {/* Hình ảnh */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
        {/* Ảnh chính */}
        <div>
          <img
            src={hotel.image}
            alt="Hotel main"
            className="w-full h-[350px] object-cover rounded"
          />
        </div>

        {/* Nhóm ảnh phụ */}
        <div className="grid grid-cols-3 gap-2">
          {/* 3 ảnh trên */}
          {hotel.images.slice(0, 3).map((img) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt={img.name || `hotel-${img.id}`}
              className="w-full h-[170px] object-cover rounded"
            />
          ))}

          {/* 3 ảnh dưới */}
          {hotel.images.slice(3, 6).map((img) => (
            <div key={img.id} className="relative">
              <img
                src={img.imageUrl}
                alt={img.name || `hotel-${img.id + 4}`}
                className="w-full h-[170px] object-cover rounded"
              />
              {/* Overlay cho ảnh cuối
              {img.id === 8 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    ⧉ Xem tất cả hình ảnh
                  </span>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
