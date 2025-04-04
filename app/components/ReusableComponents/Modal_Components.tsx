import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ModalCompIterface {
  openButtonTitle: string;
  actionButtonTitle: string;
  icon: any;
  name?: string;
  title: string;
  groupLevel: number;
  parent: string;
  setIndicator?: any;
  outCss: string;
  Query: UseMutationResult<
    {
      message: string;
    },
    Error,
    FormData,
    unknown
  >;
  groups: Groups[];
  id?: string;
}
import ButtonSpinner from "@/app/components/ReusableComponents/ButtonSpinner";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Groups } from "@prisma/client";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { canvasToFile } from "@/app/services/canvasToFile";
export default function ModalComponents(props: ModalCompIterface) {
  const queryclient = useQueryClient();

  const {
    id,
    groups,
    Query,
    openButtonTitle,
    actionButtonTitle,
    icon,
    name,
    title,
    groupLevel,
    parent,
    setIndicator,
    outCss,
  } = props;

  const editorRef = useRef<AvatarEditor | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<any>("");
  const [scale, setScale] = useState<any>(0.6);
  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
  };

  return (
    <>
      <div
        onClick={onOpen}
        className={` ${
          openButtonTitle === "حذف"
            ? ""
            : ` cursor-pointer text-sm shadow-sm shadow-[#000000]
           bg-[#FFECC5]   
text-[#4E0114]
           mr-2  border-[#4E0114] border-2
         font-B_Traffic_Bold  px-2 flex
          justify-center items-center transition-all 
         delay-150 w-24 ${outCss}  rounded-md`
        }
         `}
      >
        <h1 className="px-2">
          {openButtonTitle === "حذف" ? "" : openButtonTitle}
        </h1>
        {icon}
      </div>
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent
          className={`bg-[#4E0114] border-2 overflow-hidden
           border-[#FFECC5] flex justify-center items-center text-[#FFECC5] 
            w-[400px] ${openButtonTitle === "حذف" ? "h-[250px]" : "h-[300px]"}  
                 rounded-md shadow-md shadow-[#000000]`}
        >
          {(onClose) => (
            <>
              <ModalBody>
                <div
                  className={`mt-4 ${
                    actionButtonTitle === "حذف" && "mt-4 h-full"
                  } `}
                >
                  <form
                    className="flex justify-center h-full flex-wrap"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const formdata = new FormData(e.currentTarget);
                      const canvas =
                        editorRef.current?.getImageScaledToCanvas();
                      const imagefile = await canvasToFile(
                        canvas,
                        image.name,
                        image.type
                      );
                      formdata.append("Image", imagefile as any);

                      formdata.append("parent", parent as any);

                      formdata.append("groupLevel", JSON.stringify(groupLevel));

                      Query.mutate(formdata, {
                        onSuccess: (data: any) => {
                          queryclient.setQueryData(
                            ["groups"],
                            (oldData: Groups[]) => {
                              const result = oldData.map((res) => {
                                if (res.groupLevel === groupLevel) {
                                  return { ...res, isLastItem: false };
                                }
                                return res;
                              });

                              return [...result, data];
                            }
                          );
                        },
                      });
                    }}
                  >
                    {actionButtonTitle === "حذف" ? (
                      <div className="w-full flex justify-center flex-wrap h-full">
                        <h1
                          className={`text-base w-full text-[#c91845]
                            "text-[#FFECC5] "
                            mt-4  text-center
                            h-6 font-B_Traffic_Bold`}
                        >
                          در صورت حذف تمام زیرگروه ها و محصولا ت آن ها هم حذف می
                          شوند
                        </h1>
                        <ButtonSpinner
                          className="rounded-md  font-B_Traffic_Bold
                          bg-[#4E0114] text-[#FFECC5] border-1
                          border-[#FFECC5]  w-[190px]"
                          children={actionButtonTitle}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex justify-center flex-wrap">
                        <div className="font-B_Traffic_Bold  -translate-y-2 w-full text-center">
                          {title}
                        </div>
                        <input
                          name="groupName"
                          type="text"
                          placeholder="نام گروه"
                          className="bg-[#FFECC5]  text-[#4E0114]
                           placeholder-[#4E0114] text-right w-[190px]
                          font-B_Traffic_Bold px-2 text-base h-8 rounded-md"
                        />
                        <h1
                          className="text-[#FFECC5] text-xs translate-y-4 w-full text-center  
         font-B_Traffic_Bold px-2"
                        >
                          {" "}
                          محل قرارگیری عکس
                        </h1>
                        <div
                          style={{ scale: 0.25 }}
                          className="-translate-y-28 scale-y-50 
                          h-28 "
                        >
                          <Dropzone onDrop={handleDrop} noClick noKeyboard>
                            {({ getRootProps, getInputProps }) => (
                              <div {...getRootProps()}>
                                <AvatarEditor
                                  className="border-[9px] border-[#FFECC5]  border-dashed"
                                  ref={editorRef}
                                  scale={scale}
                                  width={700}
                                  height={700}
                                  image={image}
                                  border={2}
                                />

                                <input {...getInputProps()} />
                              </div>
                            )}
                          </Dropzone>
                        </div>
                        <div className="h-3 w-24 -translate-y-1 ">
                          <input
                            style={{ accentColor: "#7e0e2a" }}
                            type="range"
                            className=" h-3 w-24  "
                            value={scale}
                            step={0.01}
                            min={0.6}
                            max={10}
                            onChange={(e) => setScale(e.target.value)}
                          />
                        </div>
                        <div
                          className={`text-sm w-full ${
                            Query.isError ? "text-[#c91845]" : "text-[#FFECC5]"
                          }  94px]  text-center
                           h-6 font-B_Traffic_Bold`}
                        >
                          {Query.data?.message || Query.error?.message}
                        </div>
                        <ButtonSpinner
                          className="rounded-md    font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5]  w-[190px]"
                          children={actionButtonTitle}
                        />
                      </div>
                    )}
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
