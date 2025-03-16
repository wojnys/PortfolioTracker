import CryptoCsvTransactionForm from "@/components/forms/cryptoCsvTransactionForm";
import prisma from "@/lib/prisma";
import { Exchange } from "@prisma/client";

const Page = async () => {
    const exhanges: Exchange[] = await prisma.exchange.findMany();
    console.log(exhanges);
    return (
        <div>
            <CryptoCsvTransactionForm exchanges={exhanges} />
        </div>
    );
};

export default Page;
