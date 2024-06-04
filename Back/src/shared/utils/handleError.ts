import { HttpException, HttpStatus } from "@nestjs/common";

export class HandleHttpError {
    public static next = (error: any): never => {
        const duplicatedKeyMessage = error?.message
            ?.toString()
            .includes("duplicate key value violates unique constraint");

        if (duplicatedKeyMessage) {
            throw new HttpException("HAS_CONFLICT", HttpStatus.CONFLICT);
        } else if (error && !error?.status?.toString().startsWith("4")) {
            throw new HttpException(JSON.stringify(error.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            throw new HttpException(error?.message, error?.status);
        }
    };
}
