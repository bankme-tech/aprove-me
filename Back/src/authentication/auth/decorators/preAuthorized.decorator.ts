import { SetMetadata, CustomDecorator } from "@nestjs/common";

export function PreAuthorized(): CustomDecorator {
    return SetMetadata("pre-authorized", true);
}
