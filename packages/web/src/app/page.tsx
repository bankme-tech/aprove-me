import { PayableList } from "@/components/payable-list";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <PayableList payables={[]}/>
    </div>
  );
}
