"use client";
import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function JoinForm() {

  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    useEmail : z.boolean()
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:"",
      useEmail: false
    }
  });
  
  const onSubmit = async(values: z.infer<typeof formSchema>) =>{
    try {
      await axios.post(`/api/join`, values);
      toast.success("Successfully Joined as Instructor");
      router.refresh()
    } catch {
      toast.error("Something went wrong");
    }
  }

  const { isSubmitting, isValid } = form.formState;
  return (
    <>
      <div className="w-[35vw] mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Name
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="useEmail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className=" space-y-1 leading-none">
                    <FormDescription>
                      Check this box to use your current account
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting || !form.watch("useEmail")}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
