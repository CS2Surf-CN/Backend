export type CustomErr = { errCode: number; msg: string };

export class MyTRPCError extends Error {
    status = 404;
    code: number;
    message: string;
    meta = 'myCustom';

    constructor({ errCode, msg }: { errCode: number; msg: string }) {
        super(msg);
        this.code = errCode;
        this.message = msg;
    }
}