import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DocumentRow from "./DocumentRow";
import EmptyState from "./EmptyState";

interface InvestorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documents: any[];
  handleSend: (docId: string) => void;
}

const InvestorDialog = ({ isOpen, onClose, documents, handleSend }: InvestorDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Available Documents</DialogTitle>
          <DialogDescription>
            Here you can find all the documents related to this order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {documents?.length > 0 ? (
            documents.map((doc) => (
              <DocumentRow key={doc._id} document={doc} onSend={() => handleSend(doc._id)} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorDialog;
