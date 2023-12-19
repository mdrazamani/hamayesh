import cron from "node-cron";
import moment from "moment";
import {
    getAll,
    deleteDoc,
} from "../app/services/billing/transaction.service.mjs";

function convertToCronFormat(dateString) {
    return moment(dateString).add(15, "minute").format("m H D M d");
}

const transactionRemover = async function () {
    const transactions = await getAll({ status: "pending" });
    transactions?.data?.map((transaction) => {
        cron.schedule(convertToCronFormat(transaction.createdAt), async () => {
            await deleteDoc(transaction._id);
        });
    });
};

export { transactionRemover };
