import { AddJobFormDialog } from "../adminLayout/AddJobDialogForm";
import AdminLogInFormDialog from "../adminLayout/AdminLogInFormDialog";
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

            <Modal
                modalId="modal"
                openId="admin-login"
                closeModals={["tab"]}
                className="sm:w-[45dw]">
                <AdminLogInFormDialog />
            </Modal>
        </>
    )
}