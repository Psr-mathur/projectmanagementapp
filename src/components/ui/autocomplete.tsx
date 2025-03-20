import { XIcon } from 'lucide-react';
import React, { useRef, useState } from "react";

type Option = { label: string; value: string };

type MultiselectAutocompleteProps = {
  options: Option[];
  placeholder?: string;
  selectedValues?: Option[];
  onSelectionChange: (selected: Option[]) => void;
  label?: string;
  error?: boolean;
  message?: string;
  handleNewOption?: (value: string) => Promise<void>;
};

export function MultiselectAutocomplete({
  options,
  placeholder = "Select options...",
  selectedValues = [],
  onSelectionChange,
  label,
  error,
  message,
  handleNewOption,
}: MultiselectAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selected, setSelected] = useState<Option[]>(selectedValues);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(query.toLowerCase()) &&
      !selected.some((s) => s.value === option.value)
  );

  const handleAddOption = (option: Option) => {
    const updatedSelection = [...selected, option];
    setSelected(updatedSelection);
    onSelectionChange(updatedSelection);
    setQuery("");
    setIsDropdownVisible(false); // Close dropdown after selection
  };

  const handleRemoveOption = (value: string) => {
    const updatedSelection = selected.filter((s) => s.value !== value);
    setSelected(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 150); // Delay to allow click on dropdown options
  };

  const handleAddNewOption = async (value: string) => {
    if (handleNewOption) {
      await handleNewOption(value);
      // handleNewOption(value).catch((error) => {
      //   const updatedSelection = selected.filter((s) => s.value !== value);
      //   setSelected(updatedSelection);
      //   onSelectionChange(updatedSelection);
      //   console.error(error);
      // });
    }
    // const updatedSelection = [...selected, { label: value, value: value }];
    // setSelected(updatedSelection);
    // onSelectionChange(updatedSelection);
    // setQuery("");
    // setIsDropdownVisible(false); // Close dropdown after selection
  };

  console.log("selected", selected);

  return (
    <fieldset className="fieldset">
      {label && <legend className="fieldset-legend">{label}</legend>}
      <div className="relative w-full">
        {/* Input Field */}
        <div
          className="border-[0.5px] rounded-md p-2 flex items-center flex-wrap"
          onClick={() => {
            // Move focus to input field when clicked on container
            inputRef.current?.focus();
            setIsDropdownVisible(true);
          }}
        >
          {selected.length > 0 &&
            selected.map((item) => (
              <span
                key={item.value}
                className="bg-blue-500 px-2 py-1 rounded-full mr-2 mb-1 flex items-center"
              >
                {item.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveOption(item.value);
                  }}
                  className="ml-1 text-xs hover:text-gray-200"
                >
                  <XIcon size={18} />
                </button>
              </span>
            ))}
          <input
            type="text"
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={selected.length === 0 ? placeholder : ""}
            className="outline-none flex-grow border-none focus:ring-0 focus:outline-none bg-transparent"
            onFocus={() => setIsDropdownVisible(true)}
            onBlur={handleBlur} // Close dropdown when input loses focus
          />
        </div>

        {/* Dropdown */}
        {isDropdownVisible && filteredOptions.length > 0 && (
          <ul className="absolute top-full left-0 w-full border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50 bg-base-100">
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className="p-2 hover:opacity-50 cursor-pointer"
                onClick={() => handleAddOption(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}

        {/* No Results */}
        {isDropdownVisible && query && filteredOptions.length === 0 && (
          <ul className="absolute top-full left-0 w-full border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50 bg-base-100">
            <li className="p-2">No results found</li>
            {handleNewOption && <li
              className="p-2 hover:opacity-50 cursor-pointer"
              onClick={() => handleAddNewOption(query)}
            >
              Add &quot;{query}&quot;
            </li>}
          </ul>
        )}
      </div>
      {message && (
        <p className={`fieldset-label ${error ? "text-red-500" : ""}`}>{message}</p>
      )}
    </fieldset>
  );
}
