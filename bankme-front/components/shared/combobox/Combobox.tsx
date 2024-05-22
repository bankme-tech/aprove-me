import React from 'react';

export default function Combobox({ items, onSelect }: any) {
  return (
    <div className="relative inline-block w-64">
      <span className="text-white">Cedente</span>
      <select
        name="assignor"
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-2"
        onChange={(e) => onSelect(e)}
      >
        {items.map((item: any, index: number) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548l3.08 3.08a.5.5 0 0 0 .707 0l3.08-3.08a.5.5 0 0 1 .707.707l-3.08 3.08a1.5 1.5 0 0 1-2.121 0l-3.08-3.08a.5.5 0 1 1 .707-.707z"/></svg>
      </div>
    </div>
  );
};
