"use client ";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
export default function DropDownComp({
  title,
  drops,
  dropOpenHelp,
  setDropOpenHelp,
  setAddInput,
  inputs,
}: {
  title: string;
  setDropOpenHelp: Dispatch<SetStateAction<string>>;
  setAddInput: Dispatch<
    SetStateAction<
      {
        id: string;
        drops: string[];
      }[]
    >
  >;
  inputs: {
    id: string;
    drops: string[];
  }[];
  dropOpenHelp: string;
  drops: string[];
}) {
  const dropsRender = drops.map((drop) => {
    return (
      <div
        key={drop}
        className="bg-[#FFECC5]  flex  justify-center items-center w-32
         rounded-md h-8 border-1 border-[#2c0811]"
      >
        <div
          className="text-[#4E0114] cursor-pointer border-[#FFECC5] border-1
            font-B_Traffic_Bold w-32  rounded-md h-6 text-center px-2 
      
              bg-[#FFECC5]"
        >
          {drop}
        </div>
        <section className="flex justify-center items-center h-full w-12">
          <AiOutlineDelete
            onClick={() => {
              const copyInputs = [...inputs];

              const newArr = copyInputs.map((copyInput) => {
                if (copyInput.id === title) {
                  const filterDrops = copyInput.drops.filter(
                    (copyDrop) => copyDrop !== drop
                  );
                  return { ...copyInput, drops: filterDrops };
                }
                return copyInput;
              });
              setAddInput(newArr);
              setDropOpenHelp("");
            }}
            className="text-[#b72727]  transition-all duration-300 
                 hover:text-2xl text-xl   ml-1 cursor-pointer "
          />
        </section>
      </div>
    );
  });
  return (
    <div className="w-32 relative ">
      <div
        className="text-[#FFECC5] absolute -bottom-3
         cursor-pointer border-[#FFECC5] border-1
            font-B_Traffic_Bold  w-full  rounded-md h-7 
      
              bg-[#4E0114]"
      >
        <div className=" absolute  left-2 top-1">
          {dropOpenHelp === title ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <div className="absolute w-full text-center   ">{title}</div>
      </div>
      <div
        className={`${
          dropOpenHelp === title ? "block" : "hidden "
        }z-10 transition-all absolute top-4 duration-150  delay-300`}
      >
        {dropsRender}
      </div>
    </div>
  );
}
