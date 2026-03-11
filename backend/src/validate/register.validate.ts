import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(1, "Vui lòng nhập họ tên của bạn!"),
    lastName: z.string().min(1, "Vui lòng nhập họ tên của bạn!"),
    username: z.string().min(1, "Vui lòng nhập tên đăng nhập!"),
    email: z.string().min(1, "Vui lòng nhập email!").email("Vui lòng nhập email hợp lệ!"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
    confirmPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp!",
    path: ["confirmPassword"],
})

export type RegisterInput = z.infer<typeof registerSchema>;