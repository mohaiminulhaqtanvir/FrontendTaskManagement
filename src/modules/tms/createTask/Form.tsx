import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

import Drawer from "@/components/myComponant/Drawer/Drawer";
import { Autocomplete } from "@/components/myComponant/Select";
import Separator from "@/components/myComponant/Separator/Separator";
import Input from "@/components/myComponant/input/input";
import TextArea from "@/components/myComponant/input/textArea";

interface IRoleForm {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  updateData?: any;
  listData?: any;
}

const RoleForm = ({
  isOpen,
  onClose,
  updateData,
  onSubmit,
  listData,
}: IRoleForm) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();
const defaultValues = {
  name: "",
  title: "",
  type: "",
  // তোমার form field অনুযায়ী দাও
};
  useEffect(() => {
    if (isOpen && updateData) {
    reset({ ...updateData})   
    } else{reset(defaultValues)};
  }, [isOpen, updateData, reset]);

  console.log(updateData);

  return (
    <Drawer title="Form" size="sm" isOpen={isOpen} onClose={() => onClose()}>
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
                options={[{ id: "1", name: 'HIGH' }, { id: "2", name: 'LOW' }]}
          // isMulti
          label="প্রায়োরিটি"
          placeholder="প্রায়োরিটি বাছাই করুন"
          getOptionLabel={(op) => op?.name}
          getOptionValue={(op) => op?.id}
          name="roles"
          noMargin
          control={control}
                onChange={(e) => {console.log(e);
                 setValue('priority', e?.name) }}
          // isRequired="প্যারেন্ট বাছাই করুন"
          // isError={!!errors?.parent}
          // errorMessage={errors?.parent?.message as string}
        />
   <Input
   type="date"
          label="টাস্কের মেয়াদ শেষ হওয়ার তারিখ"
          placeholder="টাস্কের মেয়াদ শেষ হওয়ার তারিখ লিখুন"
          registerProperty={register("name", {
            required: "টাস্কের মেয়াদ শেষ হওয়ার তারিখ লিখুন",
          })}
          isRequired
          isError={!!errors.name}
          errorMessage={errors.name?.message as string}
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
export default RoleForm;
