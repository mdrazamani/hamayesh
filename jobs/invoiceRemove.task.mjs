import cron from "node-cron";
import moment from "moment";
import { getAll, deleteDoc } from "../app/services/billing/invoice.service.mjs";

function convertToCronFormat(dateString) {
    return moment(dateString).add(7, "days").format("m H D M d");
}

const invoiceRemover = async function () {
    const invoices = await getAll({ paymentStatus: "pending" });
    invoices?.data?.map((invoice) => {
        cron.schedule(convertToCronFormat(invoice.createdAt), async () => {
            await deleteDoc(invoice._id);
        });
    });
};

export { invoiceRemover };
