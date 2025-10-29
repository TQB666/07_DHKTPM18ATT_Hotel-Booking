import { CheckCircle } from "lucide-react";
import Header from "../../components/homepage/Header";
import Footer from "../../components/homepage/Footer";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-lg w-full">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Cảm ơn quý khách đã đặt khách sạn!
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng kiểm tra <span className="font-semibold">email</span> của bạn để xác nhận đặt phòng.
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Quay lại trang chủ
            </Link>
            <div>
              <p className="text-sm text-gray-500 mt-4">
                Nếu không nhận được email, hãy kiểm tra hộp thư rác (Spam) hoặc liên hệ với bộ phận hỗ trợ.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingSuccess;
