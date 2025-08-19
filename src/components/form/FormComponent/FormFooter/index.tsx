import { Button } from "@/components/ui/button";

export function Formfooter({
  buttons,
}: {
  buttons: Array<{
    type: "submit" | "button";
    label: string;
    variant?:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | null
      | undefined;
    onClick?: () => void;
  }>;
}) {
  return (
    <div className='w-full bg-slate-50'>
      <div className='flex justify-end gap-4'>
        {buttons.map((button, index) => (
          <Button
            key={index}
            type={button.type}
            variant={button.variant || 'default'}
            className={button.type === 'submit' ? '' : ''}
            onClick={button.type === 'button' ? button.onClick : undefined} // Only bind onClick for non-submit buttons
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
