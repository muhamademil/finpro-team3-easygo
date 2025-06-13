import React from 'react';

export default function BookingPage() {
  return (
    <div className="mx-auto px-4 py-8">
      {/* Header + Images */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <img
            src="/path-to-main-image.jpg"
            alt="Main"
            className="w-full h-96 bg-yellow-300 object-cover rounded-xl"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <img src="/path-to-image1.jpg" alt="img1" className="rounded-lg bg-pink-400" />
          <img src="/path-to-image2.jpg" alt="img2" className="rounded-lg bg-pink-500" />
          <img src="/path-to-image3.jpg" alt="img3" className="rounded-lg bg-pink-600" />
          <img src="/path-to-image4.jpg" alt="img4" className="rounded-lg bg-pink-700" />
        </div>
      </div>

      {/* Title and Info */}
      <div className="mt-8 flex justify-between items-start flex-col lg:flex-row bg-orange-300">
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-2">
            Gluck Star, Sleeping with sky view
          </h1>
          <p className="text-gray-600 mb-4">Bandung, Indonesia</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            Welcome to Gluck Star! Apart of Glucstaycation and it is located in the same area as GLuck Room and Gluck Roof, GluckLoft. Photo/videoshoot using professional photographer / equipment for prewedding, commercial product and maternity/family will be extra charged.
          </p>

          {/* Amenities */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-gray-700">
            <span>📶 Wifi</span>
            <span>🧑‍💻 Workspace</span>
            <span>🍽️ Eating utensils</span>
            <span>🏊 Pool</span>
            <span>🏋️ Gym</span>
            <span>🅿️ Parking area</span>
            <span>📺 TV</span>
            <span>🛎️ Room services</span>
            <span>❄️ Air Conditioner</span>
          </div>

          {/* Location */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Location</h2>
          <p className="mb-2">Bandung, Jawa Barat, Indonesia</p>
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-xl">
            <p className="text-center text-gray-600">[Google Maps Failed to Load]</p>
          </div>

          {/* Review */}
          <h2 className="text-xl font-semibold mt-8 mb-4">Reviews</h2>
          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="font-semibold">zanna</div>
            <div className="text-yellow-500">★★★★★</div>
            <div className="text-sm text-gray-700 mt-1">bagus banget suka</div>
            <div className="text-xs text-gray-500 mt-1">2024-07-08 14:53</div>
          </div>
        </div>

        {/* Sidebar Booking */}
        <div className="lg:w-1/4 mt-8 lg:mt-0 lg:ml-8 bg-blue-400 p-6 rounded-xl shadow-md">
          <div className="text-2xl font-semibold mb-4">
            Rp 747.399,00 <span className="text-base font-normal">/ night</span>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="date"
              className="border px-4 py-2 rounded-md"
              placeholder="Pick a date"
            />
            <input
              type="text"
              className="border px-4 py-2 rounded-md"
              placeholder="Who's coming?"
            />
            <button className="bg-gray-200 text-blue-700 py-2 rounded-md hover:bg-gray-400 transition">
              Make reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
