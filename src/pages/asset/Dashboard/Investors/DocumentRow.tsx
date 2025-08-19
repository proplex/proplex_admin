import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";
import { handleCopy } from "@/helpers/global";

interface DocumentRowProps {
  document: any;
  onSend: (docId: string) => void;
}

const DocumentRow = ({ document, onSend }: DocumentRowProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h1 className="font-semibold flex gap-2 items-center">
          {document.documentTemplateId.templateName}
        </h1>
        <p className="text-sm text-gray-500 flex gap-2 items-center">
          {document.documentTemplateId.provider} - {" "}
          {document.documentTemplateId.providerTemplateId} {" "}
          <Copy
            size={16}
            className="cursor-pointer"
            onClick={() => handleCopy(document.documentTemplateId.providerTemplateId)}
          />
        </p>
        <p className="text-sm text-gray-500 flex gap-2 items-center">
          {document.hasSent
            ? `Sent on ${new Date(document.sentAt).toLocaleDateString()}`
            : "Not Sent"}
        </p>
      </div>
      {document.hasSent ? (
        <a
          href={document.submissionDocumentURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Document
        </a>
      ) : (
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => onSend(document._id)}
        >
          Send
          <Send />
        </Button>
      )}
    </div>
  );
};

export default DocumentRow;
