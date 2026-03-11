import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import useAuthStore from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const signUpFormSchema = z.object({
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
type SignUpFormData = z.infer<typeof signUpFormSchema>;


export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore()
  const navigate = useNavigate()
  const { register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
      resolver: zodResolver(signUpFormSchema),
    });
  const onSubmit = async (data: SignUpFormData) => {
    const { firstName, lastName, username, email, password, confirmPassword } = data
    try {
      await signUp(lastName, firstName, username, email, password, confirmPassword)
      toast.success("Đăng ký thành công, bạn có thể đăng nhập ngay bây giờ!")
      navigate("/signin")
    } catch (error: any) {
      const apiErrors = error.response?.data?.errors

      if (apiErrors) {
        Object.entries(apiErrors).forEach(([field, message]) => {

          setError(field as keyof SignUpFormData, {
            type: "server",
            message: message as string
          })
        })
      }
      toast.error("Đăng ký thất bại. Vui lòng thử lại!")
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
                  Tạo tài khoản Moji
                </h1>
                <p className="text-muted-foreground text-balance">
                  Chào mừng bạn, Hãy đăng ký để bắt đầu!
                </p>
              </div>
              {/* full name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm block">Họ</Label>
                  <Input id="lastName" type="text" {...register("lastName")} />
                  {/* error message */}
                  {errors.lastName && (
                    <p className="text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm block">Tên</Label>
                  <Input id="firstName" type="text" {...register("firstName")} />
                  {/* error message */}
                  {errors.firstName && (
                    <p className="text-xs text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
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
              {/* email */}
              <div className="gap-3 flex flex-col">
                <Label htmlFor="email" className="text-sm block">Email</Label>
                <Input id="email" type="email" placeholder="mail@example.com" {...register("email")} />
                {/* error message */}
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
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
              {/* confirm password */}
              <div className="gap-3 flex flex-col">
                <Label htmlFor="confirmPassword" className="text-sm block">Xác nhận mật khẩu</Label>
                <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                {/* error message */}
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {/* register button */}
              <Button type="submit" className="w-full hover:bg-primary/90" disabled={isSubmitting}>
                Tạo tài khoản
              </Button>

              <div className="text-center text-sm">
                <p>
                  Đã có tài khoản?{" "}
                  <a href="/signin" className="underline underline-offset-4 hover:text-primary">
                    Đăng nhập
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