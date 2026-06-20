import { createDocument } from "@/06-shared/api";
import { useNotifyError } from "@/06-shared/lib/useNotifyError";
import { PopupButton, PopupInput, PopupWindow } from "@/06-shared/ui/popups"
import { useState } from "react"


type props = {
  isOpen: boolean
  onSuccess: () => void
  onClose: () => void
}

export const CreateDocument = (
  {
    isOpen,
    onSuccess,
    onClose
  } : props
) => {
  const [documnetName, setDocumentName] = useState<string>("");
  const showError = useNotifyError()

  const onCreateDocument = async () => {
    try {
      await createDocument({
        name: documnetName,
        type: "document"
      });
      onSuccess();
    } catch (error) {
      showError(error)
    } finally {
      onClose()
    }
  };

  return (
    isOpen ? (
      <PopupWindow name="Создать документ" onClose={() => {onClose()}}>
        <PopupInput 
          name="Имя документа" 
          setInput={(data) => setDocumentName(data)}
          onEnter={onCreateDocument}
          autoFocus={true}
        />
        <PopupButton name="[Ok]" onClick={() => onCreateDocument()}/>
      </PopupWindow>
    ) : null
  )
}