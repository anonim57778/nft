import type { inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
import type { AppRouter } from "~/server/api/root";

export const FileSchema = z.object({
	fileName: z
		.string({
			required_error: "Необходимо указать имя файла",
			invalid_type_error: "Неверный тип имени файла",
		})
		.optional(),
	contentType: z
		.string({
			message: "Неверный тип файла",
		})
		.optional(),
	fileSize: z
		.number({
			required_error: "Необходимо указать размер файла",
			invalid_type_error: "Неверный тип размера файла",
		}).optional(),
	b64: z
		.string({
			required_error: "Необходимо указать base64 строку",
			invalid_type_error: "Неверный тип base64 строки",
		}).optional(),
});

export type ProcessedFile = z.infer<typeof FileSchema>;
export type S3File = inferProcedureOutput<AppRouter["file"]["get"]>;

export const EditFileSchema = FileSchema.extend({
	id: z.string().optional(),
	b64: z.string({}).optional(),
}).optional();
