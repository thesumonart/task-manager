import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

const EditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  editingText,
  setEditingText,
  handleCancelEdit,
  saveEdit,
  isEditingTextNull,
}) => {
  return (
    <AlertDialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Task</AlertDialogTitle>
          <AlertDialogDescription>
            Edit the task details below:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Textarea
          className="resize-none"
          type="textarea"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          placeholder="Edit task description"
        />
        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer"
            onClick={handleCancelEdit}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isEditingTextNull}
            className="cursor-pointer disabled:bg-gray-600 disabled:text-gray-200"
            onClick={() => {
              if (!isEditingTextNull) {
                saveEdit();
              }
            }}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default EditModal;
