"use client";
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
import {
  credentialsSchema,
  CredentialsSchemaType,
} from "@/schemas/credentials-schema";
import { useAuth } from "@/hooks/useAuth";

export default function page() {
  const form = useForm<CredentialsSchemaType>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const { login } = useAuth();

  async function onSubmit(input: CredentialsSchemaType) {
    try {
      login(input.login, input.password);
    } catch (error) {
      toast("invalid credentials");
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4 py-12">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
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
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
