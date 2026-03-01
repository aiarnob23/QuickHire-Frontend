import { AddJobFormDialog } from "../adminLayout/AddJobDialogForm";
import Modal from "./modal";



export default function Modals() {
    return (
        <>
            <Modal
                modalId="modal"
                openId="add-job"
                closeModals={["tab"]}
                className="sm:w-[45dvw]">
                <AddJobFormDialog />
            </Modal>
        </>
    )
}