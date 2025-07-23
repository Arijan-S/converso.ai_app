"use client";

import { useState } from "react";
import { deleteCompanion } from "@/lib/actions/companions.actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteCompanionButtonProps {
  companionId: string;
  companionName: string;
  onDelete?: () => void;
  className?: string;
}

const DeleteCompanionButton = ({
  companionId,
  companionName,
  onDelete,
  className,
}: DeleteCompanionButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCompanion(companionId);
      setShowConfirmation(false);
      onDelete?.();
    } catch (error) {
      console.error("Failed to delete companion:", error);
      alert("Failed to delete companion. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={className}>
      {!showConfirmation ? (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : `Delete "${companionName}"`}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeleteCompanionButton;
