import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-3 flex gap-4 items-center justify-between">
        <Input
          type="text"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full flex-3"
        />
        <Button type="submit" className="w-full flex-1">
          Create
        </Button>
      </div>


    </form>
  );
};

export default CategoryForm;
