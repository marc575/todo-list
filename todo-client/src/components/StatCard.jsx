import React from 'react'

const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color.replace('text', 'bg')} bg-opacity-10`}>
        {icon}
      </div>
    </div>
);

export default StatCard
