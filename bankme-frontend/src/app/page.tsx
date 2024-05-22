"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { register } from "@/services/auth";
import {
  credentialsSchema,
  CredentialsSchemaType,
} from "@/schemas/credentials-schema";
import { AxiosError } from "axios";

export default function page() {
  const form = useForm<CredentialsSchemaType>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(input: CredentialsSchemaType) {
    try {
      await register({ login: input.login, password: input.password });
      router.push("/auth");
      toast("account created successfully");
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 409) {
        toast("Login Already Registered");
        return;
      }
      toast("Unexpected error");
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4 py-12">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Bankme</CardTitle>
          <CardDescription>Register new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login</FormLabel>
                    <FormControl>
                      <Input type="string" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
