"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import Button_Spinner from "../ReusableComponents/ButtonSpinner";
import { FaAddressBook, FaWpforms } from "react-icons/fa";
import {
  IoIosAdd,
  IoIosAddCircleOutline,
  IoMdAddCircleOutline,
} from "react-icons/io";
import { useState } from "react";
import DropDownComp from "@/app/components/ReusableComponents/dropDownComp";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { AiOutlineCheck } from "react-icons/ai";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import SortableItem from "./SortableItem";
import { BiAddToQueue, BiBookAdd } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

export default function CreateFormModal({ title }: { title: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputs, setAddInput] = useState<{ id: string; drops: string[] }[]>([]);
  const [openAdd, setOpenAdd] = useState<string>("");
  const [dropOpenHelp, setDropOpenHelp] = useState<string>("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 2 },
    })
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setAddInput((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        // console.log("active : ", active);
        // console.log("over : ", over);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const dragableItems = inputs.map((input) => (
    <SortableItem
      key={input.id}
      id={input.id}
      dropOpenHelp={dropOpenHelp}
      children={
        <div className={`flex justify-end items-center  -translate-x-16 h-9  `}>
          {openAdd === input.id || openAdd === `${input.id}_edit` ? (
            <form
              onSubmit={
                openAdd === input.id
                  ? (e) => {
                      e.preventDefault();
                      const formdata = new FormData(e.currentTarget);
                      const drop = formdata.get("drop") as string;

                      const copyOfInputs = [...inputs];
                      const newArr = copyOfInputs.map((input) => {
                        if (input.id === openAdd && drop?.length > 1) {
                          return { ...input, drops: [...input.drops, drop] };
                        }
                        return input;
                      });
                      setAddInput(newArr as any);
                      setOpenAdd("");
                    }
                  : (e) => {
                      e.preventDefault();
                      const formdata = new FormData(e.currentTarget);
                      const drop = formdata.get("drop") as string;

                      const copyOfInputs = [...inputs];
                      const newArr = copyOfInputs.map((copyInput) => {
                        if (input.id === copyInput.id) {
                          return { ...copyInput, id: drop };
                        }
                        return copyInput;
                      });
                      setAddInput(newArr as any);
                      setOpenAdd("");
                    }
              }
              className={`flex space-x-1  `}
            >
              <button type="submit" className=" h-7">
                <AiOutlineCheck
                  className="text-2xl border-b-1 border-[#09971a]
                text-green-600"
                />
              </button>
              <input
                type="text"
                name="drop"
                placeholder={
                  openAdd === `${input.id}_edit`
                    ? `تغییر نام ${input.id}`
                    : "افزودن زیرمجموعه"
                }
                className="
            text-[#FFECC5]
              placeholder-[#FFECC5] text-sm text-right px-2 placeholder-opacity-65
           cursor-pointer border-[#FFECC5] border-1
              font-B_Traffic  w-36 mb-2 rounded-md h-7 
        
                bg-[#4E0114]
            "
              />
            </form>
          ) : (
            <div
              className=""
              onClick={() =>
                setDropOpenHelp((i) => {
                  if (i === input.id) {
                    return "";
                  }
                  return input.id;
                })
              }
            >
              <DropDownComp
                inputs={inputs}
                setAddInput={setAddInput}
                setDropOpenHelp={setDropOpenHelp}
                dropOpenHelp={dropOpenHelp}
                title={input.id as string}
                drops={input.drops}
              />
            </div>
          )}
          <BiBookAdd
            onClick={() => {
              setOpenAdd((i) => {
                if (i === input.id) {
                  return "";
                }
                return input.id;
              });
              setDropOpenHelp("");
            }}
            className="text-[#FFECC5] transition-all duration-300 hover:text-3xl
             text-2xl mb-2 ml-1 cursor-pointer 
              
      "
          />
          <FaRegEdit
            onClick={() => {
              setOpenAdd((i) => {
                if (i === `${input.id}_edit`) {
                  return "";
                }
                return `${input.id}_edit`;
              });
              setDropOpenHelp("");
            }}
            className="text-[#FFECC5] transition-all duration-300 hover:text-3xl
             text-2xl mb-2 ml-1 cursor-pointer 
              
      "
          />
          <AiOutlineDelete
            onClick={() => {
              const copyInputs = [...inputs];

              const newArr = copyInputs.filter(
                (cInput) => cInput.id !== input.id
              );
              setAddInput(newArr);
            }}
            className="text-[#b72727] transition-all duration-300 
          hover:text-3xl text-2xl mb-2 ml-1 cursor-pointer "
          />
        </div>
      }
    />
  ));

  console.log("dragableItems : ", dragableItems);
  console.log("inputs : ", inputs);

  return (
    <>
      <Tooltip
        classNames={{
          content: "bg-[#4E0114] border-1 text-[#FFECC5]  border-[#e9be69]",
          arrow: "bg-[#4E0114] border-1 text-[#FFECC5]  border-[#e9be69]",
        }}
        placement="top-end"
        content="افزودن فرم مشخصات محصول برای این گروه"
        showArrow={true}
      >
        <div
          className="border-2 text-xl border-[#2e81da] hover:text-2xl 
          transition-all delay-150  h-8 w-9 rounded-md flex justify-center items-center"
        >
          <FaWpforms
            onClick={onOpen}
            className="text-[#2e81da]   cursor-pointer "
          />
        </div>
      </Tooltip>

      <Modal className="w-full " isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent
          className={`bg-[#4E0114] border-2
              border-[#FFECC5] flex justify-start text-[#FFECC5] 
               w-[350px] h-auto overflow-y-visible
                    rounded-md shadow-md shadow-[#000000]`}
        >
          {(onClose) => (
            <>
              <h1 className="w-full text-center mb-12 font-B_Traffic text-lg text-[#FFECC5] ">
                {" "}
                {` فرم مشخصات محصولات گروه  ${title} `}
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formdata = new FormData(e.currentTarget);
                  const productFuture = formdata.get("productFuture") as string;
                  if (productFuture.length) {
                    return setAddInput([
                      ...inputs,
                      { id: productFuture, drops: [] },
                    ]);
                  }
                }}
                className="w-full flex justify-center"
              >
                <div className="w-full flex justify-center space-x-5">
                  <input
                    name="productFuture"
                    type=" text"
                    placeholder="... افزودن "
                    className="w-44 rounded-md text-right  placeholder-[#FFECC5] placeholder:opacity-50
                      bg-[#4E0114] font-B_Traffic text-base px-2 text-[#FFECC5]  
                    border-1 border-[#FFECC5]"
                  />
                  <button type="submit">
                    <IoMdAddCircleOutline className="cursor-pointer text-3xl" />
                  </button>
                </div>
              </form>
              <h1
                className="w-full text-center border-t-1 mt-4 py-4 border-dashed  font-B_Traffic text-lg
                   text-[#FFECC5] border-[#FFECC5] "
              >
                {"ترتیب قرارگیری ویژگی ها سمت کاربر"}
              </h1>
              <section
                className=" w-full h-2/3 py-4 flex justify-center 
              "
              >
                <div className=" w-full  flex flex-wrap  justify-center">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                  >
                    <SortableContext
                      items={inputs}
                      strategy={verticalListSortingStrategy}
                    >
                      {dragableItems}
                    </SortableContext>
                  </DndContext>
                </div>
              </section>
              <form className="flex flex-wrap w-full   p-2">
                <div className=" w-full flex justify-center items-end  flex-wrap">
                  <Button_Spinner
                    children={"ثبت"}
                    className="w-24 bg-[#4E0114] font-B_Traffic text-lg text-[#FFECC5] 
                    border-1 border-[#FFECC5]"
                  />
                </div>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
