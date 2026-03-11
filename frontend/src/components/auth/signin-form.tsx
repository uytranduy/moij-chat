import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";
import { AxiosError } from "axios"



const signInFormSchema = z.object({
    username: z.string().min(1, "Vui lòng nhập tên đăng nhập!"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự!"),
})

type SignInFormData = z.infer<typeof signInFormSchema>;

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {

    const navigate = useNavigate()
    const { signIn } = useAuthStore()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting } } = useForm<SignInFormData>({
            resolver: zodResolver(signInFormSchema),
        });

    const onSubmit = async (data: SignInFormData) => {
        const { username, password } = data
        try {
            await signIn(username, password)
            toast.success("Đăng nhập thành công!")
            navigate("/")

        } catch (error: any) {
            if (error instanceof AxiosError) {
                setError("root", {
                    type: "server",
                    message: error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!"
                });
            }
            toast.error("Đăng nhập thất bại. Vui lòng thử lại!")
        }
    }
    return (
        <div
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <Card className="overflow-hidden p-0 border-border">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        className="p-6 md:p-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-6">
                            {/* Header */}
                            <div className="flex flex-col gap-2 items-center text-center">
                                <a href="/" className="mx-auto w-fit block text-center">
                                    <img src="logo.svg" alt="logo" />
                                </a>
                                <h1 className="text-2xl font-bold">
                                    Đăng nhập vào Moji
                                </h1>
                                <p className="text-muted-foreground text-balance">
                                    Chào mừng bạn trở lại, Hãy đăng nhập để tiếp tục!
                                </p>
                            </div>

                            {/* username */}
                            <div className="gap-3 flex flex-col">
                                <Label htmlFor="username" className="text-sm block">Tên đăng nhập</Label>
                                <Input id="username" type="text" placeholder="moji" {...register("username")} />
                                {/* error message */}
                                {errors.username && (
                                    <p className="text-xs text-red-600">
                                        {errors.username.message}
                                    </p>
                                )}

                            </div>

                            {/* password */}
                            <div className="gap-3 flex flex-col">
                                <Label htmlFor="password" className="text-sm block">Mật khẩu</Label>
                                <Input id="password" type="password" {...register("password")} />
                                {/* error message */}
                                {errors.password && (
                                    <p className="text-xs text-destructive">
                                        {errors.password.message}
                                    </p>
                                )}

                            </div>
                            {/* root error */}
                            {errors.root && (
                                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-2 rounded">
                                    {errors.root.message}
                                </div>
                            )}

                            {/* login button */}
                            <Button type="submit" className="w-full hover:bg-primary/90" disabled={isSubmitting}>
                                Đăng nhập
                            </Button>

                            <div className="text-center text-sm">
                                <p>
                                    Chưa có tài khoản?{" "}
                                    <a href="/signup" className="underline underline-offset-4 hover:text-primary">
                                        Đăng ký
                                    </a>
                                </p>
                            </div>
                        </div>
                    </form>
                    <div className="bg-muted relative hidden md:block">
                        <img
                            src="/placeholderSignUp.png"
                            alt="Image"
                            className="absolute top-1/2 -translate-y-1/2 object-cover"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-center text-sm text-balance px-6 text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4">
                Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
                <a href="#">Chính sách bảo mật</a> của chúng tôi.
            </div>
        </div>
    );
}