import React from 'react';

export const Foodcompo = ({ food }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {food.map((ele, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img
              src={ele.Img}
              alt={ele.Name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">{ele.Name}</h3>
              <a
                href={ele.Visit}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit
              </a>
              <p className="text-gray-400 mt-2">{ele.Timing}</p>
              <div className="mt-2 text-sm text-gray-500">{ele.filters.join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};