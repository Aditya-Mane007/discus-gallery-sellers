"use client";
import React, { useRef } from "react";
import ImageInput from "@/components/ImageInput";
import VariantInput from "@/components/VariantInput";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  images: z
    .array(z.instanceof(File))
    .min(1, {
      message: "At least 5 images are required.",
    })
    .max(5, {
      message: `Maximum of 5 images allowed.`,
    }),
  category: z.string().min(1, {
    message: "Please select catgory of product",
  }),
  // variants: z
  //   .array(
  //     z.object({
  //       quantity: z.string().min(1, { message: "String value is required" }),
  //       price: z.number().nonnegative(),
  //     })
  //   )
  //   .nonempty(),
});

function page() {
  const submitRef = useRef();
  console.log(submitRef);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      category: "",
      // variants: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="addProductForm w-full min-h-screen max-md:w-[100%]">
      <div className="h-auto max-md:h-auto ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-auto flex max-md:flex-col"
          >
            <div className="div2 w-[50%] h-auto max-md:w-full px-3">
              <ImageInput form={form} />
            </div>
            <div className="div3 w-[50%] max-md:w-full px-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name of product" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter description of product"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="Flakes">Flakes</SelectItem>
                            <SelectItem value="Pellets">Pellets</SelectItem>
                            <SelectItem value="Frozen">Frozen</SelectItem>
                            <SelectItem value="Live">Live</SelectItem>
                            <SelectItem value="Dried">Dried</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button ref={submitRef} type="submit" className="hidden">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {/* <div className="div4 w-full px-3">
        <VariantInput formData={form} />
      </div> */}
      <Button
        className="div5 mx-3 w-auto max-md:w-full h-12 mt-0 max-md:mt-8 bg-[#E4E4E7] dark:bg-[#27272A]"
        onClick={() => submitRef.current?.click()}
      >
        Add Product
      </Button>
    </div>
  );
}

export default page;
