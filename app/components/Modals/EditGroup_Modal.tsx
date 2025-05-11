"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Slider,
} from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { useRef, useState } from "react";
import { editingGroup } from "@/app/action/relatedGroups/editingGroup";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Button_Spinner from "../ReusableComponents/ButtonSpinner";
export default function EditingGroup_Modal({
  prevGroupName,
  id,
}: {
  prevGroupName: string;
  id: string;
}) {
  const queryClient = useQueryClient();

  const [sliderValue, setSliderValue] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Image, setImage] = useState<any>();
  const editor = useRef<any>() as any;
  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
  };

  const editMutataion = useMutation({
    mutationFn: editingGroup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  return (
    <>
      <div
        className="border-1 text-xl border-[#FFECC5] hover:text-2xl
       transition-all delay-150  h-8 w-9 rounded-md flex justify-center items-center"
      >
        <FaRegEdit
          onClick={onOpen}
          className="text-[#FFECC5]   cursor-pointer w-auto "
        />
      </div>

      <Modal className="w-full " isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent
          className={`bg-[#4E0114] border-2 overflow-hidden
           border-[#FFECC5] flex justify-center items-center text-[#FFECC5] 
            w-[400px] h-[450px]
                 rounded-md shadow-md shadow-[#000000]`}
        >
          {(onClose) => (
            <>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formdata = new FormData(e.currentTarget);
                  const canvasScaled: HTMLCanvasElement =
                    editor.current && editor.current.getImageScaledToCanvas();
                  const convertImageToFile = ({
                    type,
                    name,
                  }: {
                    type: string;
                    name: string;
                  }) => {
                    return new Promise((resolve, reject) => {
                      canvasScaled.toBlob((blob) => {
                        resolve(
                          new File([blob as Blob], name, {
                            type,
                          })
                        );
                      }, type);
                    });
                  };
                  const file = await convertImageToFile({
                    name: `${prevGroupName}.png`,
                    type: "image/png",
                  });
                  console.log("file : ", file);

                  formdata.append("canvasScaledFile", file as any);
                  formdata.append("id", id as string);
                  formdata.append("prevGroupName", prevGroupName as string);

                  editMutataion.mutate(formdata);
                }}
                className="flex flex-wrap w-full  space-y-3 p-2"
              >
                <h1
                  className="w-full text-center translate-y-72
                 font-B_Traffic text-xl "
                >{`ویرایش گروه ${prevGroupName}`}</h1>
                <div className="w-full flex justify-center items-center">
                  <input
                    name="groupName"
                    type="text"
                    placeholder="نام گروه"
                    className="bg-[#FFECC5]  text-[#4E0114]
                           placeholder-[#4E0114] text-right w-[190px]
                          font-B_Traffic_Bold px-2 translate-y-72 text-base h-8 rounded-md"
                  />
                </div>
                <h1 className="w-full text-center translate-y-72 font-B_Traffic text-base ">
                  محل افزودن عکس
                </h1>
                <div
                  style={{ scale: 0.25 }}
                  className=" flex justify-center -translate-y-8 flex-wrap items-center w-full "
                >
                  <div className="border-2 border-white">
                    <Dropzone onDrop={handleDrop} noClick noKeyboard>
                      {({ getRootProps, getInputProps }) => (
                        <div className="" {...getRootProps()}>
                          <AvatarEditor
                            className=""
                            //   onDrop={handleDrop}
                            ref={editor}
                            width={1100}
                            height={750}
                            border={1}
                            scale={sliderValue}
                            image={Image}
                          />
                          <input {...getInputProps()} />
                        </div>
                      )}
                    </Dropzone>
                  </div>
                </div>
                <div className="w-full -translate-y-72 flex justify-center">
                  <Slider
                    aria-label="#@"
                    aria-labelledby="#@"
                    className="w-36 "
                    size="sm"
                    defaultValue={1}
                    maxValue={5}
                    minValue={1}
                    step={0.01}
                    onChange={(e) => setSliderValue(e as number)}
                  />
                </div>
                <div className=" w-full flex justify-center  -translate-y-72 flex-wrap">
                  <div className=" w-full text-center h-7  text-red-500 font-B_Traffic">
                    {editMutataion.error?.message}
                  </div>
                  <Button_Spinner
                    children={"ویرایش"}
                    className="w-24 bg-[#4E0114] font-B_Traffic text-lg text-[#FFECC5] border-1 border-[#FFECC5]"
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
