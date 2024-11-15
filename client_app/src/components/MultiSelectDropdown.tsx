// "use client";

// import React, {
//   FunctionComponent,
//   useEffect,
//   useRef,
//   useState,
//   ChangeEvent,
//   MouseEvent,
// } from "react";
// import { IGenreResponse } from "../utils/schemas";

// // TODO: Replace options type with a generic type
// type Props = {
//   formFieldName: string;
//   options: IGenreResponse[];
//   onChange: (selectedOptions: number[]) => void;
//   prompt: string;
// };
// const MultiSelectDropDown: FunctionComponent<Props> = ({
//   formFieldName,
//   options,
//   onChange,
//   prompt
// }) => {

//   const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
//   const [isJsEnabled, setIsJsEnabled] = useState<boolean>(false);
//   const optionsListRef = useRef<HTMLUListElement | null>(null);

//   useEffect(() => {
//     setIsJsEnabled(true);
//   }, []);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const isChecked = e.target.checked;
//     const option = e.target.value;

//     const selectedOptionSet = new Set(selectedOptions);

//     if (isChecked) {
//       selectedOptionSet.add(parseInt(option));
//     } else {
//       selectedOptionSet.delete(parseInt(option));
//     }

//     const newSelectedOptions = Array.from(selectedOptionSet);

//     setSelectedOptions(newSelectedOptions);
//     onChange(newSelectedOptions)
//   };

//   const isSelectAllEnabled = selectedOptions.length < options.length;

//   const handleSelectAllClick = (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     const optionsInputs =
//       optionsListRef.current.querySelectorAll<HTMLInputElement>("input");
//     optionsInputs.forEach((input) => {
//       input.checked = true;
//     });
//     const ids = options.map((option) => option.id);
//     setSelectedOptions([...ids]);
//     onChange([...ids]);
//   };

//   const isClearSelectionEnabled = selectedOptions.length > 0;

//   const handleClearSelectionClick = (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     const optionsInputs =
//       optionsListRef.current.querySelectorAll<HTMLInputElement>("input");
//     optionsInputs.forEach((input) => {
//       input.checked = false;
//     });

//     setSelectedOptions([]);
//     onChange([]);
//   };

//   return (
//     <label className="relative">
//       <input
//         type="checkbox"
//         className="hidden peer"
//       />

//       <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
//         {prompt}
//         {isJsEnabled && selectedOptions.length > 0 && (
//           <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
//         )}
//       </div>

//       <div className="absolute bg-white border p-2 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
//         {isJsEnabled && (
//           <ul>
//             <li>
//               <button
//                 onClick={handleSelectAllClick}
//                 disabled={!isSelectAllEnabled}
//                 className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
//               >
//                 {"Select All"}
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={handleClearSelectionClick}
//                 disabled={!isClearSelectionEnabled}
//                 className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
//               >
//                 {"Clear selection"}
//               </button>
//             </li>
//           </ul>
//         )}
//         <ul ref={optionsListRef}>
//           {options.map((option, i) => {
//             return (
//               <li key={i}>
//                 <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
//                   <input
//                     type="checkbox"
//                     name={formFieldName}
//                     value={option.id}
//                     className="cursor-pointer"
//                     onChange={handleChange}
//                   />
//                   <span className="ml-1">{option.name}</span>
//                 </label>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </label>
//   );
// };

// export default MultiSelectDropDown;
