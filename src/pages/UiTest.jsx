import {useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function UiTest() {
    const [openCount, setOpenCount] = useState(0);
    const [confirmCount, setConfirmCount] = useState(0);

    return (
        <div className="layout-page layout-frame px-5 py-6 text-foreground">
            <div className="mb-6 border-b border-border pb-4">
                <h1 className="font-display text-2xl text-primary">UI TEST</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    使用 shadcn/ui + Radix Dialog 的基础验证页面。
                </p>
            </div>

            <div className="card-base card-dark p-4">
                <p className="mb-4 text-xs text-muted-foreground">
                    打开次数：{openCount}，确认次数：{confirmCount}
                </p>

                <Dialog
                    onOpenChange={(nextOpen) => {
                        if (nextOpen) setOpenCount((prev) => prev + 1);
                    }}
                >
                    <DialogTrigger asChild>
                        <button className="btn-base btn-primary h-10 px-4">
                            打开 Dialog
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>睡眠记录确认</DialogTitle>
                            <DialogDescription>
                                你确定要将今晚睡眠数据同步到云端吗？
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <button className="btn-base btn-ghost h-9 px-3">取消</button>
                            </DialogClose>
                            <DialogClose asChild>
                                <button
                                    className="btn-base btn-primary h-9 px-3"
                                    onClick={() => setConfirmCount((prev) => prev + 1)}
                                >
                                    确认同步
                                </button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
