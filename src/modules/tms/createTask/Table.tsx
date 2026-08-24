import { FC, ReactNode } from "react";
import { Card } from "react-bootstrap";

import { Dropdown, DropdownItem } from "@/components/myComponant/Dropdown";
import Icon from "@/components/myComponant/Icon";
import {
  ITableHeadColumn,
  Table,
} from "@/components/myComponant/TableFor/Table";
import { TableCell } from "@/components/myComponant/TableFor/TableCell";
import { TableRow } from "@/components/myComponant/TableFor/TableRow";
import { numEnToBn } from "@/components/myComponant/input/checkValidation";

const columns: ITableHeadColumn[] = [
  { title: "", width: 20 },
  { title: "ক্রমিক নং", width: 100 },
  { title: "টাস্কের নাম", width: 200 },
  { title: "অগ্রাধিকার", width: 200 },
  { title: "অবস্থা", width: 200 },
  { title: "শুরুর তারিখ", width: 200 },
  { title: "শেষের তারিখ ", width: 200 },

  { title: "অ্যাকশন", minWidth: 20, className: "d-flex justify-content-end" },
];
interface RoleTableProps {
  children?: ReactNode;
  tableData?: any[];
  title?: string;
  handleUpdate?: (data) => void;
  deleteUpdate?: (data) => void;
}
const RoleTable: FC<RoleTableProps> = ({
  tableData,
  children,
  handleUpdate,
  deleteUpdate,
}) => {
  if (!tableData?.length) return null;

  return (
    <Card>
      <Card.Header>
        <h5>টাস্ক তালিকা</h5>
      </Card.Header>
      <Card.Body className="p-0">
        <Table columns={columns}>
          {tableData?.map((item: any, i: number) => (
            <TableRow key={item?.id || i}>
              <TableCell text={numEnToBn(i + 1)} />

              <TableCell text={item?.name || "তথ্য নেই "} />
              <TableCell text={item?.priority || "তথ্য নেই "} />

              <TableCell text={item?.status || "তথ্য নেই "} />
              <TableCell
                text={
                  formatDateTime(item?.createdDate, "date", "bn") || "তথ্য নেই "
                }
              />
              <TableCell
                text={
                  formatDateTime(item?.dueDate, "date", "bn") || "তথ্য নেই "
                }
                subText={
                  formatDateTime(item?.dueDate, "time", "bn") || "তথ্য নেই "
                }
              />

              <TableCell className="p-0 m-0 ">
                <div className="d-flex justify-content-end mx-3">
                  <Dropdown
                    className="p-0 m-0"
                    btnContent={
                      <Icon
                        className="p-0 m-0 px-0 py-0"
                        icon="more_vert"
                        size={20}
                      />
                    }
                  >
                    <DropdownItem
                      onClick={() => {
                        handleUpdate(item);
                      }}
                    >
                      <Icon size={16} icon="edit" color="info" />
                      <h6 className="mb-0 ms-2" style={{ fontSize: 16 }}>
                        সম্পাদনা করুন
                      </h6>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        deleteUpdate(item);
                      }}
                    >
                      <Icon size={16} icon="delete" color="danger" />
                      <h6 className="mb-0 ms-2" style={{ fontSize: 16 }}>
                        ডিলিট করুন
                      </h6>
                    </DropdownItem>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        {children}
      </Card.Body>
    </Card>
  );
};

export default RoleTable;

export const formatDateTime = (
  value: string | null | undefined,
  type: "date" | "time" | "datetime" = "datetime",
  lang: "en" | "bn" = "en"
): string => {
  if (!value) return "";

  const [datePart, timePart] = value.split("T");

  const [year, month, day] = datePart.split("-");
  const time = timePart?.split(".")[0] || "";

  let result = "";

  if (type === "date") {
    result = `${day}-${month}-${year}`;
  }

  if (type === "time") {
    result = time;
  }

  if (type === "datetime") {
    result = `${day}-${month}-${year} ${time}`;
  }

  if (lang === "bn") {
    result = result.replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  }

  return result;
};
