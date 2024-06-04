import { ErrorMessageInput } from "components/Text/InputTexts/ErrorMessageInput/ErrorMessageInput";
import { RequiredLabel } from "components/Text/InputTexts/RequiredLabel/RequiredLabel";
import { IValidateFormsProps } from "interfaces/interfaces/Inputs/IValidateFormsProps";
import React, { useEffect, useRef, useState } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

export interface ISelectInlineProps {
  autoWidth?: boolean;
  className?: string;
  control: Control<FieldValues | any>;
  disabled?: boolean;
  errors?: FieldErrors<FieldValues>;
  label?: string;
  name: string;
  options: (string | number | boolean)[];
  placeholder?: string;
  required?: boolean;
  size?: "small" | "large";
  validateProps?: IValidateFormsProps;
}

export const SelectInline: React.FC<ISelectInlineProps> = ({
  autoWidth,
  className,
  control,
  disabled,
  errors,
  label,
  name,
  placeholder,
  options,
  required,
  size: sizeDefault,
  validateProps
}) => {
  const size = sizeDefault ?? "large";

  const [optionsSearch, setOptionsSearch] =
    useState<(string | number | boolean)[]>(options);
  const [isOpen, setIsOpen] = useState<boolean>();
  const [isChargingList, setChargingList] = useState<boolean>();
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isChargingStyle = isChargingList ? "animate-pulse" : "";
  const sizeStyle = {
    small: {
      selectGroup: `h-6 ${autoWidth ? "w-full" : "w-40"}`,
      dropDown: "tag-h6",
      searchInput: "tag-h6 pl-2",
      options: "tag-h6"
    },
    large: {
      selectGroup: `h-8 ${autoWidth ? "w-full" : "w-52"}`,
      dropDown: "tag-h4",
      searchInput: "tag-p pl-2.5",
      options: "tag-p"
    }
  };

  const disabledStyle = disabled
    ? "bg-gray-2 cursor-not-allowed hover:bg-gray-2"
    : "bg-blue-0 hover:bg-blue80 cursor-pointer";

  const isOpenStyle = {
    expandIcon: isOpen ? "rotate-180" : "",
    dropDown: isOpen ? "block" : "hidden"
  };

  const searchItems = (
    searchTerm: string,
    options: (string | number | boolean)[]
  ): (string | number | boolean)[] => {
    const filterQueryIsEmpty = searchTerm === "" || searchTerm === undefined;
    if (!filterQueryIsEmpty) {
      const queryParts = searchTerm.split(/[ -/:=|{}()@]/g);
      const filteredItems = options.filter((option) => {
        return queryParts.every((part) =>
          option.toString().toLowerCase().includes(part.toLowerCase())
        );
      });

      return filteredItems;
    }

    return options;
  };

  return (
    <div className={`scrollbar-pattern flex flex-col ${className}`}>
      {label && <RequiredLabel size={size} label={label} required={required} />}

      <div
        className={`relative mt-0 flex flex-row px-0 ${sizeStyle[size].selectGroup}`}
      >
        <Controller
          control={control as Control}
          name={name}
          rules={{
            ...validateProps,
            required: required ? "Esse campo é obrigatório" : undefined
          }}
          render={({ field }) => {
            const handleClickOutside = (event: MouseEvent): void => {
              if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
              ) {
                setIsOpen(false);
              }
            };

            const handleInputChange = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => setSearchValue(event.target.value);

            const toggleDropdown = () => setIsOpen(!isOpen);

            useEffect(() => {
              if (searchValue !== "") {
                setOptionsSearch(searchItems(searchValue, options));
              } else {
                setOptionsSearch(options ?? []);
              }
            }, [searchValue, options]);

            useEffect(() => {
              if (field.value !== undefined) {
                setSearchValue("");
              }
            }, [field.value]);

            useEffect(() => {
              document.addEventListener("click", handleClickOutside);
              return () => {
                document.removeEventListener("click", handleClickOutside);
              };
            }, []);

            return (
              <div
                className={`bg-white pt-2 ${sizeStyle[size].selectGroup}`}
                ref={dropdownRef}
              >
                <div
                  className={`relative inline-block ${sizeStyle[size].selectGroup}`}
                >
                  <div
                    onClick={disabled ? undefined : toggleDropdown}
                    className={`flex h-10 items-center justify-center truncate rounded-full border-0 px-4 text-white transition-all delay-100 duration-500 hover:bg-blue-1 ${sizeStyle[size].selectGroup} ${disabledStyle}`}
                  >
                    <p
                      className={`w-60 truncate text-white ${sizeStyle[size].dropDown}`}
                    >
                      {field.value ?? placeholder ?? "Selecione uma opção"}
                    </p>

                    <svg
                      className={`ml-2.5 h-2.5 w-2.5 transform ${isOpenStyle.expandIcon}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>

                  <div
                    className={`absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-solid border-gray-3 bg-white p-2 shadow-md ${isOpenStyle.dropDown}`}
                  >
                    <input
                      type="text"
                      placeholder="Pesquisar.."
                      id="myInput"
                      className={`mb-2 w-full rounded border border-gray-3 p-2 ${sizeStyle[size].searchInput}`}
                      value={searchValue}
                      onChange={handleInputChange}
                      onKeyDown={() => setChargingList(true)}
                      onKeyUp={() =>
                        setTimeout(() => setChargingList(false), 750)
                      }
                    />
                    {(searchValue !== "" || searchValue !== undefined) &&
                    optionsSearch.length === 0 ? (
                      <p
                        className={`block cursor-default border-b border-blue-0/10 px-4 py-2 ${sizeStyle[size].options}`}
                      >
                        Sem opções listadas
                      </p>
                    ) : optionsSearch.length > 1000 ? (
                      <p
                        className={`block cursor-default border-b border-blue-0/10 px-4 py-2 ${sizeStyle[size].options} ${isChargingStyle}`}
                      >
                        Digite na busca para listar as opções...
                      </p>
                    ) : (
                      optionsSearch.map((option, index) => (
                        <p
                          onClick={() => {
                            field.onChange(option);
                            setIsOpen(!isOpen);
                          }}
                          key={index}
                          className={`block cursor-pointer border-b border-blue-0/10 px-4 py-2 transition-colors duration-150 hover:bg-gray-3 ${sizeStyle[size].options}`}
                        >
                          {option}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="mt-2">
        <ErrorMessageInput name={name} errors={errors} />
      </div>
    </div>
  );
};
