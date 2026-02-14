import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
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

            <Card className="p-4 bg-card">
                <p className="mb-4 text-xs text-muted-foreground">
                    打开次数：{openCount}，确认次数：{confirmCount}
                </p>

                <Dialog
                    onOpenChange={(nextOpen) => {
                        if (nextOpen) setOpenCount((prev) => prev + 1);
                    }}
                >
                    <DialogTrigger asChild>
                        <Button className="h-10 px-4">
                            打开 Dialog
                        </Button>
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
                                <Button variant="ghost" className="h-9 px-3">取消</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    className="h-9 px-3"
                                    onClick={() => setConfirmCount((prev) => prev + 1)}
                                >
                                    确认同步
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Card>
        </div>
    );
}
