import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { canvasToFile } from "@/app/services/canvasToFile";

interface ModalCompIterface {
  openButtonTitle: string;
  actionButtonTitle: string;
  icon: any;
  title: string;
  indicator: number;
  parent: string;
}
import ButtonSpinner from "@/app/components/ReusableComponents/ButtonSpinner";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function ModalComponents(props: ModalCompIterface) {
  const [messageUi, setMessageUi] = useState<{
    message: string;
    fault: boolean;
  }>({
    message: "",
    fault: false,
  });
  const { openButtonTitle, actionButtonTitle, icon, title, indicator, parent } =
    props;
  const router = useRouter();

  const editorRef = useRef<AvatarEditor | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [groupName, setGroupName] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [scale, setScale] = useState<any>(0.6);
  const handleDrop = (dropped: any) => {
    setImage(dropped[0]);
  };

  const handleSubmit = async (event: any) => {
    if (!groupName.length) {
      return setMessageUi({
        message: "نام گروه وارد نشده است",
        fault: true,
      });
    }
    const formdata = new FormData();

    const canvas = editorRef.current?.getImageScaledToCanvas();
    const imagefile = await canvasToFile(canvas, image.name, image.type);
    formdata.append("Image", imagefile as any);
    formdata.append("groupName", groupName as any);
    formdata.append("parent", parent as any);

    formdata.append("indicator", JSON.stringify(indicator));

    formdata.append("user", JSON.stringify({ groupName } as any));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ROOTURL}/api/related_Groups/createGroup`,
      {
        method: "POST",
        body: formdata,
      }
    );
    const message = await response.json();
    console.log("message.allgroups : ", message.allgroups);
    if (response.ok) {
      setMessageUi({ message: message.message, fault: false });
      setTimeout(() => {
        router.refresh();
      }, 1000);
    }
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="cursor-pointer text-sm shadow-sm shadow-[#000000] bg-[#FFECC5]   
text-[#4E0114]
           mr-2  border-[#4E0114] border-2
         font-B_Traffic_Bold  px-2 flex justify-center items-center transition-all 
         delay-150 w-24 h-9 rounded-md "
      >
        <h1 className="px-2">{openButtonTitle}</h1>
        {icon}
      </div>
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent
          className="bg-[#4E0114] border-2 
           border-[#FFECC5] flex justify-center items-center text-[#FFECC5] 
            w-[400px] h-[300px] 
                 rounded-md shadow-md shadow-[#000000]"
        >
          {(onClose) => (
            <>
              <ModalBody>
                <div className="font-B_Traffic_Bold ml-4">{title}</div>

                <div className="mt-4">
                  <form action={handleSubmit}>
                    <input
                      name="groupName"
                      onChange={(e) => setGroupName(e.target.value)}
                      value={groupName || ""}
                      type="text"
                      placeholder="نام گروه"
                      className="bg-[#FFECC5] text-[#4E0114] placeholder-[#4E0114] text-right
                      font-B_Traffic_Bold px-2 text-base h-8 rounded-md"
                    />
                    <div className="w-full h-full relative ">
                      <h1
                        className="text-[#FFECC5] text-xs w-full text-center absolute top-2
         font-B_Traffic_Bold px-2"
                      >
                        {" "}
                        محل قرارگیری عکس
                      </h1>
                      <div
                        style={{ scale: 0.25 }}
                        className="absolute -bottom-[96px]  right-[66px]  scale-y-50 w-[190px] h-28 "
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
                      <div className="absolute   -rotate-90  h-3 w-24 left-[150px] top-[70px]">
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
                        className={`text-sm w-44 ${
                          messageUi.fault ? "text-[#c91845]" : "text-[#FFECC5]"
                        } absolute top-[124px] left-2 text-center
                           h-6 font-B_Traffic_Bold`}
                      >
                        {messageUi.message}
                      </div>
                      <ButtonSpinner
                        className="rounded-md absolute top-[153px] left-1 font-B_Traffic_Bold
                 bg-[#4E0114] text-[#FFECC5] border-1
                 border-[#FFECC5]  w-[190px]"
                        children={actionButtonTitle}
                      />
                    </div>
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
