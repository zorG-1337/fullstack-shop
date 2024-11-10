import { PropsWithChildren } from "react";
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "../AlertDialog";

interface ConfirmModalProps {
    handleClick: () => void
}

export function ConfirmModal({children, handleClick}: PropsWithChildren<ConfirmModalProps>) {
    return <AlertDialog>
    <AlertDialogTrigger>{children}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
        <AlertDialogDescription>
          Это действие нельзя будет отменить
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Закрыть</AlertDialogCancel>
        <AlertDialogAction className="bg-blue-500 hover:bg-blue-500/90" onClick={() => handleClick()}>Продолжить</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
}