import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import DateInput from "@/components/myComponant/DateInput";
import Drawer from "@/components/myComponant/Drawer/Drawer";
import { Autocomplete } from "@/components/myComponant/Select";
import Separator from "@/components/myComponant/Separator/Separator";
import Input from "@/components/myComponant/input/input";
import TextArea from "@/components/myComponant/input/textArea";

interface ITaskCreateForm {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  updateData?: any;
  listData?: any;
}

const TaskCreateForm = ({
  isOpen,
  onClose,
  updateData,
  onSubmit,
  listData,
}: ITaskCreateForm) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const defaultValues = {
    name: "",
    title: "",
    type: "",
    dueDate: "",
    description: "",
  };
  useEffect(() => {
    if (isOpen && updateData) {
      reset({ ...updateData });
    } else {
      reset(defaultValues);
    }
  }, [isOpen, updateData, reset]);

  return (
    <Drawer
      title="টাস্ক তৈরি"
      size="sm"
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="টাস্ক এর নাম "
          placeholder="টাস্ক এর নাম  লিখুন"
          registerProperty={register("name", {
            required: "টাস্ক এর নাম  লিখুন",
          })}
          isRequired
          isError={!!errors.name}
          errorMessage={errors.name?.message as string}
        />

        <Autocomplete
          filterProps={["name", "id"]}
          options={[
            { id: "1", name: "HIGH" },
            { id: "2", name: "LOW" },
          ]}
          // isMulti
          label="প্রায়োরিটি"
          placeholder="প্রায়োরিটি বাছাই করুন"
          getOptionLabel={(op) => op?.name}
          getOptionValue={(op) => op?.id}
          name="roles"
          noMargin
          control={control}
          onChange={(e) => {
            console.log(e);
            setValue("priority", e?.name);
          }}
          // isRequired="প্যারেন্ট বাছাই করুন"
          // isError={!!errors?.parent}
          // errorMessage={errors?.parent?.message as string}
        />
        {/* <Input
          type="date"
          label="টাস্কের মেয়াদ শেষ হওয়ার তারিখ"
          placeholder="টাস্কের মেয়াদ শেষ হওয়ার তারিখ লিখুন"
          registerProperty={register("dueDate", {
            required: "টাস্কের মেয়াদ শেষ হওয়ার তারিখ লিখুন",
          })}
          isRequired
          isError={!!errors.dueDate}
          errorMessage={errors.dueDate?.message as string}
        /> */}

        <DateInput
          name="dueDate"
          value={watch("dueDate")}
          label="শেষ তারিখ"
          isRequired
          registerProperty={register("dueDate", {
            required: "শেষ তারিখ আবশ্যক",
          })}
        />
        <TextArea
          label="বর্ণনা"
          {...register("description")}
          placeholder="Description"
          rows={2}
          isError={!!errors.description}
        />
        <div className="text-end mt-4">
          <Separator />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Drawer>
  );
};
export default TaskCreateForm;
