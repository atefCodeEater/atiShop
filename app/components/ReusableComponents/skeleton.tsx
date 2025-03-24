import { Skeleton, Card } from "@nextui-org/react";

export default function Skeleton_comp({
  outCss,
  numOfRow,
  rowCss,
}: {
  outCss: string;
  numOfRow: number;
  rowCss: string;
}) {
  function createRow() {
    for (let i = 0; i <= numOfRow; i++) {
      return (
        <Skeleton className="rounded-lg h-12 bg-[#4E0114]">
          <div className={rowCss} />
        </Skeleton>
      );
    }
  }
  return (
    <Card className={outCss} radius="lg">
      <div className="space-y-3">{createRow()}</div>
    </Card>
  );
}
