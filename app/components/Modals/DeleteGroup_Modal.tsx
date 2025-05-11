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
  indicator: number;
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

import { Groups } from "@prisma/client";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";

export default function ModalDeleteGroup(props: ModalCompIterface) {
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
    indicator,
    setIndicator,
    outCss,
  } = props;
  const queryclient = useQueryClient();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formdata = new FormData(e.currentTarget);
                      formdata.append("groups", JSON.stringify(groups));
                      formdata.append("id", id as string);

                      formdata.append("name", name as string);
                      groupLevel === 1
                        ? setIndicator(1)
                        : setIndicator(groupLevel - 1);
                      formdata.append("groupLevel", JSON.stringify(groupLevel));
                      Query.mutate(formdata, {
                        onSuccess: (data: any) => {
                          queryclient.setQueryData(
                            ["groups"],
                            (oldData: Groups[]) => {
                              const newOldData = [...oldData];

                              const result = newOldData.filter((od) => {
                                return !data.includes(od.id);
                              });
                              console.log("result : ", result);
                              return result;
                            }
                          );
                        },
                      });
                    }}
                    className="flex justify-center h-full flex-wrap"
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
